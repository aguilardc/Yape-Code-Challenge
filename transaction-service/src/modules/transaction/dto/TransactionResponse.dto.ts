import { Transaction } from '../entities/transaction.entity';
import { TransactionStatus } from '../enums/transaction-status.enum';

export class TransactionResponseDto {
    transactionExternalId: string;
    transactionType: { name: string };
    transactionStatus: { name: string };
    value: number;
    createdAt: Date;

    constructor(entity: Transaction) {
        this.transactionExternalId = entity.transactionExternalId;
        this.transactionType = { name: 'Transferencia' }; // hardcodeado o mapeado si hay tabla real
        this.transactionStatus = { name: entity.transactionStatus };
        this.value = Number(entity.value); // por si es decimal
        this.createdAt = entity.createdAt;
    }
}
