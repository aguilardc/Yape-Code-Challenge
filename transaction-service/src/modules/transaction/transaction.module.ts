import {Module} from '@nestjs/common';
import {TransactionController} from './controllers/transaction.controller';
import {TransactionService} from './services/transaction.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Transaction} from "./entities/transaction.entity";
import {KafkaService} from "./services/kafka.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction])
    ],
    providers: [TransactionService, KafkaService],
    controllers: [TransactionController],
})
export class TransactionModule {
}
