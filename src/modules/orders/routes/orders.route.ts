import fastify from "fastify";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { PlaceOrderDto } from "@/modules/orders/dto/place-order.dto";
import { makePlaceOrder } from "@/modules/orders/factories/makePlaceOrder";

const router = fastify();

const namespace = "/v1/orders";

export const ordersRouter = () => {
    router.post<{ Body: PlaceOrderDto }>(
        `${namespace}/place-order`,
        async (request: FastifyRequest, reply: FastifyReply) => {
            const data = request.body as PlaceOrderDto;
            const placeOrder = makePlaceOrder();
            const orderId = await placeOrder.execute(data);
            reply.send({ orderId });
        },
    );
};
