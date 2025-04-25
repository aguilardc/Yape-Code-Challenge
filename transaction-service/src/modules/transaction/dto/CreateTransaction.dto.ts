import {IsInt, IsNumber, IsPositive, IsString, Min} from "class-validator";

export class CreateTransactionDto {
    @IsString()
    accountExternalIdDebit: string;

    @IsString()
    accountExternalIdCredit: string;

    @IsInt({message: 'transferTypeId debe ser un número entero'})
    @Min(1, {message: 'transferTypeId debe ser mayor que 0'})
    @IsPositive()
    transferTypeId: number;

    @IsNumber({}, {message: 'value debe ser un número'})
    @Min(0.01, {message: 'value debe ser mayor a 0'})
    @IsPositive()
    value: number;
}
