import type { Order } from "@/modules/orders/entities/Order";

export interface IOrdersRepository {
    create(order: Order): Promise<void>;
}
