import { OrdersRepository } from "@/modules/orders/repository/order.repository";

export function makeOrdersRepository() {
    return new OrdersRepository()
}   