import { SQSGateway } from "@/modules/orders/gateways/sqs.gateway";

export function makeSQSGateway() {
    return new SQSGateway();
}