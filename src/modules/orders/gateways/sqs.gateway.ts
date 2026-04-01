import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import type { IQueue } from "@/modules/orders/types";

export class SQSGateway  implements IQueue{
    private client: SQSClient;
    private queueUrl: string;

    constructor() {
        this.client = new SQSClient({
            region: "sa-east-1",
        });
        this.queueUrl = "";
    }

    async sendMessage(message: Record<string, unknown>): Promise<void> {
        await this.client.send(
            new SendMessageCommand({
                QueueUrl: this.queueUrl,
                MessageBody: JSON.stringify(message),
            }),
        );
    }
}
