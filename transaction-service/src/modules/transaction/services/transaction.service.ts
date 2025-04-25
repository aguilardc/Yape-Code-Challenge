import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateTransactionDto} from "../dto/CreateTransaction.dto";
import {KafkaService} from "./kafka.service";
import {Transaction} from "../entities/transaction.entity";
import {TransactionStatus} from "../enums/transaction-status.enum";

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly repo: Repository<Transaction>,
        private readonly kafka: KafkaService,
    ) {
    }

    async create(dto: CreateTransactionDto): Promise<Transaction> {

        if (!dto.transferTypeId) {
            throw new BadRequestException('El campo transferTypeId es obligatorio');
        }
        const transaction = this.repo.create({...dto, transactionStatus: TransactionStatus.PENDING});
        await this.repo.save(transaction);
        await this.kafka.emit('transaction_created', {
            transactionExternalId: transaction.transactionExternalId,
            value: transaction.value,
        });
        return transaction;
    }

    async updateStatus(id: string, status: TransactionStatus): Promise<void> {

        console.log(`[UPDATE] tx: ${id} => ${status}`);

        if (!Object.values(TransactionStatus).includes(status as TransactionStatus)) {
            throw new Error(`Estado inválido recibido: ${status}`);
        }

        await this.repo.update(
            {transactionExternalId: id},
            {transactionStatus: status as TransactionStatus}
        );
    }

    async getOne(id: string) {
        const transaction = await this.repo.findOneBy({transactionExternalId: id});
        if (!transaction) throw new NotFoundException('Transaction not found')
        return transaction;
    }
}
