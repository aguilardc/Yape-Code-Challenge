import { IsUUID } from 'class-validator';

export class GetTransactionDto {
    @IsUUID('4', { message: 'El id debe ser un UUID válido' })
    id: string;
}
