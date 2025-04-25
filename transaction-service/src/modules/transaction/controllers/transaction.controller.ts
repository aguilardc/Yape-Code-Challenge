import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {TransactionService} from "../services/transaction.service";
import {CreateTransactionDto} from "../dto/CreateTransaction.dto";
import {GetTransactionDto} from "../dto/GetTransaction.dto";

@Controller('transactions')
export class TransactionController {
    constructor(private readonly service: TransactionService) {
    }

    @Post()
    create(@Body() dto: CreateTransactionDto) {
        return this.service.create(dto);
    }

    @Get(':id')
    get(@Param() params: GetTransactionDto) {
        return this.service.getOne(params.id);
    }
}
