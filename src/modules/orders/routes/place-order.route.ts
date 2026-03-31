import fastify from "fastify";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { PlaceOrderDto } from "@/modules/orders/dto/place-order.dto";
import { PlaceOrder } from "@/modules/orders/useCases/PlaceOrder";

const router = fastify();

export const placeOrderRouter = () =>
    router.post<{ Body: PlaceOrderDto }>(
        "/place-order",
        async (request: FastifyRequest, reply: FastifyReply) => {
            const data = request.body as PlaceOrderDto;
            const orderId = await new PlaceOrder().execute(data);
            reply.send({ orderId });
        },
    );
