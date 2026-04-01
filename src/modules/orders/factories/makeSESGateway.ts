import { SESGateway } from "@/modules/orders/gateways/ses.gateway";

export function makeSESGateway() {      
    return new SESGateway();
}