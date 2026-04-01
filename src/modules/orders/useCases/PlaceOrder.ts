import { Order } from "@/modules/orders/entities/Order";
import type { PlaceOrderDto } from "@/modules/orders/dto/place-order.dto";
import type { IOrdersRepository, IEmailService,IQueue } from "@/modules/orders/types";


const placeOrderDto: PlaceOrderDto = {
    customerEmail: "",
    amount: 100,
};


export class PlaceOrder {
    constructor(
        private readonly ordersRepository: IOrdersRepository,
        private readonly queue: IQueue,
        private readonly emailService: IEmailService,
    ) {}
    async execute(data: PlaceOrderDto = placeOrderDto) {
        const order = new Order(data.customerEmail, data.amount);
        await this.ordersRepository.create(order);
        await this.queue.sendMessage({ orderId: order.id });
        await this.emailService.sendEmail(
            data.customerEmail,
            "Order Confirmation",
            `Your order has been placed successfully. Your order ID is ${order.id}.`,
        );

        return { orderId: order.id };
    }
}
