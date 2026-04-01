import z from "zod";

export const placeOrderBodySchema = z.object({
    customerEmail: z.email(),
    amount: z.number().positive(),
});