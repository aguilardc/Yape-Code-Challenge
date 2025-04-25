import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Kafka} from "kafkajs";
import {TransactionService} from "./modules/transaction/services/transaction.service";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    await app.listen(process.env.PORT ?? 3000);
    const kafka = new Kafka({brokers: ['kafka:29092']});
    const consumer = kafka.consumer({groupId: 'transaction-group'});

    await consumer.connect();
    await consumer.subscribe({topic: 'transaction_validated'});

    await consumer.run({
        eachMessage: async ({message}) => {
            try {
                const value = message.value?.toString() ?? '{}';
                const {transactionExternalId, transactionStatus} = JSON.parse(value);

                if (!transactionExternalId || !transactionStatus) {
                    console.warn('[WARN] Evento incompleto recibido:', value);
                    return;
                }

                const transactionService = app.get(TransactionService);
                await transactionService.updateStatus(transactionExternalId, transactionStatus);
            } catch (error) {
                console.error('[ERROR] Fallo al procesar mensaje Kafka:', error);
            }
        },
    });

}

bootstrap();
