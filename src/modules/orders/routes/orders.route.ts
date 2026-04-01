import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { PlaceOrder } from "@/modules/orders/useCases/PlaceOrder";
import { ordersContainer } from "@/modules/orders/di/container";
import { placeOrderBodySchema } from "@/modules/orders/schema/order.schema";

const prefix = "/api/orders/v1";


export const ordersRouter: FastifyPluginAsync = async (app) => {
    app.post(
        `${prefix}/place-order`,
        {
            schema: {
                body: placeOrderBodySchema,
            },
        },
        async (request, reply) => {
            const data = request.body as z.infer<typeof placeOrderBodySchema>;
            const placeOrder = new PlaceOrder(ordersContainer);
            const { orderId } = await placeOrder.execute(data);
            reply.code(201).send({ orderId });
        },
    );

    app.get(
        `${prefix}`,
        async (_request, reply) => {
            reply.send({ status: "ok" });
        },
    );
};
