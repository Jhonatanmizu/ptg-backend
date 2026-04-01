export interface IQueueGateway {
    publishMessage(message: Record<string, unknown>): Promise<void>;         
    consumeMessages(queueName: string, onMessage: (message: Record<string, unknown>) => Promise<void>): Promise<void>;  
    ackMessage(message: Record<string, unknown>): Promise<void>;
    nackMessage(message: Record<string, unknown>, requeue?: boolean): Promise<void>;
}