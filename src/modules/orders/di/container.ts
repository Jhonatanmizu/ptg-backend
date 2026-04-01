import { SESGateway } from "@/modules/orders/gateways/ses.gateway";
import { SQSGateway } from "@/modules/orders/gateways/sqs.gateway";
import { OrdersRepository } from "@/modules/orders/repository/order.repository";
import { Registry } from "@/modules/orders/di//Registry";


export const ordersContainer = Registry.getInstance();

ordersContainer.register("OrdersRepository", OrdersRepository)
ordersContainer.register("QueueGateway", SQSGateway)
ordersContainer.register("EmailGateway", SESGateway)