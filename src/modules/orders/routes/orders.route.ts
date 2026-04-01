import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { PlaceOrder } from "@/modules/orders/useCases/PlaceOrder";
import { placeOrderBodySchema } from "@/modules/orders/schema/order.schema";
import { Registry } from "@/modules/orders/di/Registry";
import { OrdersRepository } from "@/modules/orders/repository/order.repository";
import { SQSGateway } from "@/modules/orders/gateways/sqs.gateway";
import { SESGateway } from "@/modules/orders/gateways/ses.gateway";

const prefix = "/api/orders/v1";

const ordersContainer = Registry.getInstance()

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
            const placeOrder = new PlaceOrder(
                ordersContainer.resolve(OrdersRepository.name),
                ordersContainer.resolve(SQSGateway.name),
                ordersContainer.resolve(SESGateway.name ),
            );
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
