import type { Order } from "@/modules/orders/entities/Order";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import type { IOrdersRepository } from "@/modules/orders/types/order";

export class OrdersRepository implements IOrdersRepository {
    private readonly ddbClient: DynamoDBDocumentClient;
    constructor() {
        this.ddbClient = DynamoDBDocumentClient.from(
            new DynamoDBClient({
                region: "sa-east-1",
            }),
        );
    }
    async create(order: Order): Promise<void> {
        const putItemCommand = new PutCommand({
            TableName: "Orders",
            Item: {
                id: order.id,
                email: order.email,
                amount: order.amount,
            },
        });

        await this.ddbClient.send(putItemCommand);
    }
}
