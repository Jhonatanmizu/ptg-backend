import { PlaceOrder } from "../useCases/PlaceOrder";
import { makeOrdersRepository } from "./makeOrdersRepository";
import { makeSESGateway } from "./makeSESGateway";
import { makeSQSGateway } from "./makeSQSGateway";

export function makePlaceOrder() {
    const ordersRepository = makeOrdersRepository();
    const sqsGateway = makeSQSGateway();
    const sesGateway = makeSESGateway();
    return new PlaceOrder(
        ordersRepository,
        sqsGateway,
        sesGateway,
    );
}
