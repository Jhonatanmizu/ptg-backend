import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import type { IQueueGateway } from "@/modules/orders/interfaces";

export class SQSGateway  implements IQueueGateway{
    private client: SQSClient;
    private queueUrl: string;

    constructor() {
        this.client = new SQSClient({
            region: "sa-east-1",
        });
        this.queueUrl = "";
    }

    async publishMessage(message: Record<string, unknown>): Promise<void> {
        await this.client.send(
            new SendMessageCommand({
                QueueUrl: this.queueUrl,
                MessageBody: JSON.stringify(message),
            }),
        );
    }

    async consumeMessages(queueName: string, onMessage: (message: Record<string, unknown>) => Promise<void>): Promise<void> {       
        // Implement message consumption logic here 
    }

    async ackMessage(message: Record<string, unknown>): Promise<void> {
        // Implement message acknowledgment logic here
    }

    async nackMessage(message: Record<string, unknown>, requeue?: boolean): Promise<void> {
        // Implement message negative acknowledgment logic here
    }
}
