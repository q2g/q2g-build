import { readFileSync } from "fs";
import { request, RequestOptions} from "https";
import { resolve } from "path";
import { stringify } from "querystring";

export class QrsService {

    public static get instance(): QrsService {
        return QrsService.qrsInstance;
    }

    private static qrsInstance: QrsService = new QrsService();

    private certRoot: string;

    private reqOptions: RequestOptions;

    private host = "localhost";

    public constructor() {
        if (QrsService.qrsInstance) {
            throw new Error("could not create instance of QrsService, use QrsServcice.instance instead");
        }
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        QrsService.qrsInstance = this;
    }

    public set certificateRoot(path: string) {
        this.certRoot = path;
    }

    /**
     * fetch extension by name, return empty array if no extensions found
     * @todo check for qrs typings
     *
     * @param {string} name
     * @returns {Promise<any>}
     * @memberof QrsService
     */
    public fetchExtension(name: string): Promise<any[]> {

        return new Promise((finalize, reject) => {

            const params = {
                filter: `name eq '${name}'`,
                xrfkey: "abcdefghijklmnop",
            };

            const options = {
                ...this.requestOptions,
                ...{
                    method: "GET",
                    path: `/qrs/extension?${stringify(params)}`,
                },
            };

            request(options, (res) => {
                res.on("data", (chunk: string) => {
                    if (res.statusCode !== 200) {
                        reject("error");
                    }
                    const extensions: any[] = JSON.parse(chunk);
                    finalize(extensions);
                });

                res.on("error", () => {
                    reject();
                });
            })
            .end();
        });
    }

    /**
     * import extension to qrs
     *
     * @param {string} name
     * @param {Buffer} file
     * @returns {Promise<boolean>}
     * @memberof QrsService
     */
    public importExtension(name: string, file: Buffer): Promise<void> {

        return new Promise((finalize, reject) => {

            const params = {
                privileges: true,
                pwd: "",
                xrfkey: "abcdefghijklmnop",
            };

            const options = {
                ...this.requestOptions,
                ...{
                    headers: {
                        ...this.requestOptions.headers,
                        "Content-Length": file.length,
                        "Content-Type"  : "application/vnd.qlik.sense.app",
                    },
                    method: "POST",
                    path: `/qrs/extension/upload?${stringify(params)}`,
                },
            };

            const req = request(options, (res) => {
                res.on("data", (chunk: string) => {
                    if (res.statusCode !== 201) {
                        reject("status code not 201");
                    }
                    finalize();
                });

                res.on("error", (err) => {
                    process.stderr.write(err.message);
                });
            });

            req.write(file);
            req.end();
        });
    }

    public updateExtension(name: string, file: Buffer): Promise<void> {

        return new Promise((finalize, reject) => {

            const params = {
                externalPath: `${name}.js`,
                overwrite: true,
                xrfkey: "abcdefghijklmnop",
            };

            const options = {
                ...this.requestOptions,
                ...{
                    headers: {
                        ...this.requestOptions.headers,
                        "Content-Length": file.length,
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                    method: "POST",
                    path: `/qrs/extension/${name}/uploadfile?${stringify(params)}`,
                },
            };

            const req = request(options, (res) => {
                res.on("data", (chunk: string) => {
                    if (res.statusCode !== 201) {
                        reject("status code not 201");
                    }
                    finalize();
                });

                res.on("error", (err) => {
                    reject(err.message);
                });
            });

            req.write(file);
            req.end();
        });
    }

    /**
     * if request options not exists, create them
     *
     * @readonly
     * @private
     * @type {RequestOptions}
     * @memberof QrsService
     */
    private get requestOptions(): RequestOptions {
        if (!this.reqOptions) {
            this.reqOptions = this.createRequestOptions();
        }
        return this.reqOptions;
    }

    /**
     * create request options object
     *
     * @private
     * @returns {RequestOptions}
     * @memberof QrsService
     */
    private createRequestOptions(): RequestOptions {

        const ca   = readFileSync(resolve(this.certRoot, "root.pem"));
        const cert = readFileSync(resolve(this.certRoot, "client.pem"));
        const key  = readFileSync(resolve(this.certRoot, "client_key.pem"));

        // not empty
        return {
            ca,
            cert,
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded",
                "X-Qlik-User"  : "UserDirectory= Internal; UserId= sa_repository",
                "x-qlik-xrfkey": "abcdefghijklmnop",
            },
            hostname: this.host,
            key,
            method: "GET",
            port: "4242",
        };
    }
}
