import {Injectable} from "@nestjs/common";
import {KafkaService} from "./kafka.service";

@Injectable()
export class AntifraudService {
    constructor(private readonly kafka: KafkaService) {
        kafka.consume('transaction_created', this.handleEvent.bind(this));
    }

    async handleEvent(data: any) {
        const {transactionExternalId, value} = data;
        const status = value > 1000 ? 'rejected' : 'approved';

        await this.kafka.emit('transaction_validated', {
            transactionExternalId,
            transactionStatus: status,
        });
    }
}
