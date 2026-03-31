import { randomUUID } from "crypto";

export class Order {
    public readonly id: string;

    constructor(
        public readonly email: string,
        public readonly amount: number,
    ) {
        const orderId = randomUUID();
        this.id = orderId;
    }
}
