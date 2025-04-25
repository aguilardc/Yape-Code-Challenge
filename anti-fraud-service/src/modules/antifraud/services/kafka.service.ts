import {Kafka} from "kafkajs";
import {Injectable} from "@nestjs/common";

@Injectable()
export class KafkaService {
    private readonly kafka = new Kafka({brokers: ['kafka:29092']});
    private readonly consumer = this.kafka.consumer({groupId: 'antifraud-group'});
    private readonly producer = this.kafka.producer();

    async consume(topic: string, callback: (data: any) => void) {
        await this.consumer.connect();
        await this.consumer.subscribe({topic});
        await this.consumer.run({
            eachMessage: async ({message}) => {
                callback(JSON.parse(message.value?.toString() ?? ''));
            },
        });
    }

    async emit(topic: string, payload: any) {
        await this.producer.connect();
        await this.producer.send({
            topic,
            messages: [{value: JSON.stringify(payload)}],
        });
    }
}
