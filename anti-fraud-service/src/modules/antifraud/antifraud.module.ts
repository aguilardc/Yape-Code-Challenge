import {Module} from '@nestjs/common';
import {KafkaService} from "./services/kafka.service";
import {AntiFraudListenerService} from "./listeners/anti-fraud-listener.service";

@Module({
    providers: [KafkaService, AntiFraudListenerService],
})
export class AntifraudModule {
}
