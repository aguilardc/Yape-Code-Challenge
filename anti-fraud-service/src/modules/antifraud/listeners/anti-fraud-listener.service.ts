import {Injectable, OnModuleInit} from "@nestjs/common";
import {KafkaService} from "../services/kafka.service";

@Injectable()
export class AntiFraudListenerService implements OnModuleInit {
    constructor(private readonly kafkaService: KafkaService) {}

    async onModuleInit() {
        await this.kafkaService.consume('transaction_created', async (message) => {
            const { transactionExternalId, value } = message;
            const status = value > 1000 ? 'rejected' : 'approved';

            await this.kafkaService.emit('transaction_validated', {
                transactionExternalId,
                transactionStatus: status,
            });

            console.log(`[ANTIFRAUD] Tx ${transactionExternalId} => ${status}`);
        });
    }
}