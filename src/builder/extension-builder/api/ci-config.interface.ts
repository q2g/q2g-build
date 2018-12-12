export interface ICiConfig {
    qrs?: IConfigQrs | boolean;
    desktop?: IConfigDesktop | boolean;
}

interface IConfigDesktop {
    path: string;
}

interface IConfigQrs {
    serverName: string;
    authentification?: IQrsAuthentification;
}

interface IQrsAuthentification {
    certPath: string;
    username: string;
    userdirectory: string;
}
