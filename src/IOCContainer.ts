class IoCContainer {
    private services: Record<string, any> = {};

    register(name: string, service: any): void {
        this.services[name] = service;
    }

    resolve<T>(name: string): T {
        return this.services[name];
    }
}

const container = new IoCContainer();

export default container;
