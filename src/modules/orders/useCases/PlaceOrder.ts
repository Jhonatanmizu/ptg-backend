import { Order } from "@/modules/orders/entities/Order";
import type { PlaceOrderDto } from "@/modules/orders/dto/place-order.dto";

import type { IContainer } from '@/modules/orders/di/Registry';
import { IEmailGateway, IQueueGateway } from "@/modules/orders/interfaces";
import { IOrdersRepository } from "@/modules/orders/types";


const placeOrderDto: PlaceOrderDto = {
    customerEmail: "",
    amount: 100,
};


export class PlaceOrder {
    constructor(
        private readonly ordersContainer:IContainer
    ) {}
    async execute(data: PlaceOrderDto = placeOrderDto) {
        const order = new Order(data.customerEmail, data.amount);

        const skipExternalIntegrations =
            process.env["SKIP_EXTERNAL_INTEGRATIONS"] === "true" ||
            (process.env["NODE_ENV"] ?? "development") !== "production";

        if (skipExternalIntegrations) {
            return { orderId: order.id };
        }

        await this.ordersContainer.resolve<IOrdersRepository>("OrdersRepository").create(order);
        await this.ordersContainer.resolve<IQueueGateway>("QueueGateway").publishMessage({ orderId: order.id });
        await this.ordersContainer.resolve<IEmailGateway>("EmailGateway").sendEmail(
            data.customerEmail,
            "Order Confirmation",
            `Your order has been placed successfully. Your order ID is ${order.id}.`,
        );

        return { orderId: order.id };
    }
}
