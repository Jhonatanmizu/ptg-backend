import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import type { IEmailGateway } from "../interfaces";
import { Injectable } from "@/modules/orders/di/Injectable";

@Injectable()
export class SESGateway implements IEmailGateway {
    private client: SESClient;
    private source: string;

    constructor() {
        this.client = new SESClient({
            region: "sa-east-1",
        });
        this.source = "MizuTech <noreply@jhonatanmizu.com>";
    }

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        await this.client.send(
            new SendEmailCommand({
                Destination: {
                    ToAddresses: [to],
                },
                Message: {
                    Subject: {
                        Data: subject,
                    },
                    Body: {
                        Html: {
                            Data: body,
                        },
                    },
                },
                Source: this.source,
            }),
        );
    }
}
