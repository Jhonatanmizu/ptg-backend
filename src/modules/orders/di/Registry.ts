type Constructor<T> = new (...args: any[]) => T;

export interface IContainer{
    register<T>(token:string,service: Constructor<T>): void;
    resolve<T >(token:string): T;
}

export class  Registry {
    private readonly services: Map<string, Constructor<any>>;

    private constructor() {
        this.services = new Map();
    }

    private static instance: Registry;

    static getInstance(): Registry {   
        if (!this.instance) {
            this.instance = new Registry();
        }
        return this.instance        ;
    }
    

    register<T>(token:string, service: Constructor<T>): void {
        if(this.services.has(token)) {
            throw new Error(`Service ${token} is already registered`);
        }

        this.services.set(token, service);
    }

    resolve<T >(token:string): T {
        const registeredService = this.services.get(token);
        if (!registeredService) {
            throw new Error(`Service ${token} not found in registry`);
        }
        return new registeredService();
    }
}
const registry = Registry.getInstance();

export default registry;