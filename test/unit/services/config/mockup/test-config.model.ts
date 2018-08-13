export class TestConfigModel {

    private name: string = "";

    private description: string = "";

    public getDescription(): string {
        return this.description;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setDescription(description: string) {
        this.description = description;
    }
}
