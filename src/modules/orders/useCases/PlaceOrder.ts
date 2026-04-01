import { Order } from "@/modules/orders/entities/Order";
import type { PlaceOrderDto } from "@/modules/orders/dto/place-order.dto";
import type { IOrdersRepository } from "../types";
import type { IEmailGateway, IQueueGateway } from "../interfaces";


const placeOrderDto: PlaceOrderDto = {
    customerEmail: "",
    amount: 100,
};


export class PlaceOrder {
    constructor(
        private readonly ordersRepository: IOrdersRepository,
        private readonly queueGateway: IQueueGateway,
        private readonly emailGateway: IEmailGateway,
    ) {}
    async execute(data: PlaceOrderDto = placeOrderDto) {
        const order = new Order(data.customerEmail, data.amount);
        await this.ordersRepository.create(order);
        await this.queueGateway.publishMessage({ orderId: order.id });
        await this.emailGateway.sendEmail(
            data.customerEmail,
            "Order Confirmation",
            `Your order has been placed successfully. Your order ID is ${order.id}.`,
        );

        return { orderId: order.id };
    }
}
