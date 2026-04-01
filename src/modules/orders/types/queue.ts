export interface IQueue {
    sendMessage(message: Record<string, unknown>): Promise<void>;
}