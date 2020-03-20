import { BankCode } from './../constants/payment.constants';
import { ApiProperty } from '@nestjs/swagger';
import * as uuid from 'uuid/v4';

export class RequestPaymentMomoAtm {
    @ApiProperty({minimum: 10000, maximum: 50000000})
    amount: number;

    @ApiProperty({enum: BankCode})
    bankCode: BankCode;

    @ApiProperty()
    returnUrl: string;

    @ApiProperty({default: uuid()})
    orderId: string;
}