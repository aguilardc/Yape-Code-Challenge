import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {TransactionStatus} from "../enums/transaction-status.enum";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    transactionExternalId: string;

    @Column()
    accountExternalIdDebit: string;

    @Column()
    accountExternalIdCredit: string;

    @Column()
    transferTypeId: number;

    @Column('decimal')
    value: number;

    @Column({type: 'enum', enum: TransactionStatus, default: TransactionStatus.PENDING})
    transactionStatus: TransactionStatus;

    @CreateDateColumn()
    createdAt: Date;
}