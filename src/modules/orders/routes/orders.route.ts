import fastify from "fastify";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { PlaceOrderDto } from "@/modules/orders/dto/place-order.dto";
import { PlaceOrder } from "@/modules/orders/useCases/PlaceOrder";
import { OrdersRepository } from "@/modules/orders/repository/order.repository";
import { SQSGateway } from "@/modules/orders/gateways/sqs.gateway";
import { SESGateway } from "@/modules/orders/gateways/ses.gateway";

const router = fastify();

const namespace = "/v1/orders";

export const ordersRouter = () => {
    router.post<{ Body: PlaceOrderDto }>(
        `${namespace}/place-order`,
        async (request: FastifyRequest, reply: FastifyReply) => {
            const data = request.body as PlaceOrderDto;
            const ordersRepository = new OrdersRepository();
            const sqsGateway = new SQSGateway();
            const sesGateway = new SESGateway();
            const placeOrder = new PlaceOrder(
                ordersRepository,
                sqsGateway,
                sesGateway,
            );
            const orderId = await placeOrder.execute(data);
            reply.send({ orderId });
        },
    );
};
