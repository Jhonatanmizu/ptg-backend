import type { PlaceOrderDto } from "@/modules/orders/dto/place-order.dto";
import { Order } from "@/modules/orders/entities/Order";
import { DynamoOrdersRepository } from "../repository/dynamo.repository";
import { SQSGateway } from "@/modules/orders/gateways/sqs.gateway";
import { SESGateway } from "@/modules/orders/gateways/ses.gateway";

const placeOrderDto: PlaceOrderDto = {
    customerEmail: "",
    amount: 100,
};

export class PlaceOrder {
    async execute(data: PlaceOrderDto = placeOrderDto) {
        const order = new Order(data.customerEmail, data.amount);
        const dynamoOrdersRepository = new DynamoOrdersRepository();
        await dynamoOrdersRepository.create(order);

        const sqsGateway = new SQSGateway();
        await sqsGateway.sendMessage({ orderId: order.id });

        const sesGateway = new SESGateway();
        await sesGateway.sendEmail(
            data.customerEmail,
            "Order Confirmation",
            `Your order has been placed successfully. Your order ID is ${order.id}.`,
        );

        return { orderId: order.id };
    }
}
