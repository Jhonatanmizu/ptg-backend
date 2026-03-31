export type PlaceOrderDto = {
    customerId: string;
    items: {
        productId: string;
        quantity: number;
        amount: number;
    }[];
    customerEmail: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};
