import { PlaceOrder } from "@/modules/orders/useCases/PlaceOrder";
import { ordersContainer } from "@/modules/orders/di/container";


export function makePlaceOrder() {
    return new PlaceOrder(
        ordersContainer
    );
}
