import {Injectable} from "@nestjs/common";
import {Kafka, Producer} from "kafkajs";

@Injectable()
export class KafkaService {
    private readonly producer: Producer;

    constructor() {
        const kafka = new Kafka({brokers: ['kafka:29092']});
        this.producer = kafka.producer();
        this.producer.connect().then(r => console.log('Connected to Kafka'));
    }

    async emit(topic: string, message: any) {
        await this.producer.send({
            topic,
            messages: [{value: JSON.stringify(message)}],
        });
    }
}
