import type { PlaceOrderDto } from "@/modules/orders/dto/place-order.dto.ts";

const placeOrderDto: PlaceOrderDto = {
    customerId: "",
    items: [
        {
            productId: "",
            quantity: 0,
            amount: Math.ceil(Math.random() * 1000),
        },
    ],
    customerEmail: "jhonatanmizu@gmail.com",
    customerName: "Jhonatan Mizu",
    total: 0,
    status: "",
    createdAt: new Date(),
    updatedAt: new Date(),
};

export class PlaceOrder {
    execute(data: PlaceOrderDto = placeOrderDto) {
        // Place order logic here
    }
}
