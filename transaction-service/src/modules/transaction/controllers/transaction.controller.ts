import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {TransactionService} from "../services/transaction.service";
import {CreateTransactionDto} from "../dto/CreateTransaction.dto";
import {GetTransactionDto} from "../dto/GetTransaction.dto";
import {TransactionResponseDto} from "../dto/TransactionResponse.dto";

@Controller('transactions')
export class TransactionController {
    constructor(private readonly service: TransactionService) {
    }

    @Post()
    create(@Body() dto: CreateTransactionDto) {
        return this.service.create(dto);
    }

    @Get(':id')
    async get(@Param() params: GetTransactionDto): Promise<TransactionResponseDto> {
        const transaction = await this.service.getOne(params.id);
        return new TransactionResponseDto(transaction);
    }
}
