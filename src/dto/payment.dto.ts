import { SportCenterInfoDto } from './sportCenter.dto';
import { ApiProperty } from '@nestjs/swagger';
import * as uuid from 'uuid/v4';
import { UserProfileDto } from './user.dto';
import { BookingDto } from './book.dto';
import { DtoMapper, MapFrom } from './../base/BaseDtoMapper';
import { BankCode } from './../constants/payment.constants';

export class RequestPaymentMomoATM {
  @ApiProperty({ minimum: 10000, maximum: 50000000 })
  amount: number;

  @ApiProperty({ enum: BankCode })
  bankCode: BankCode;

  @ApiProperty()
  returnUrl: string;

  @ApiProperty({ default: uuid() })
  orderId: string;
}

export class RequestPaymentMomoAIO {
  @ApiProperty({ minimum: 10000, maximum: 50000000 })
  amount: number;

  @ApiProperty()
  returnUrl: string;

  @ApiProperty({ default: uuid() })
  orderId: string;
}

export class PaymentDto extends DtoMapper {
  @MapFrom()
  id: number;

  @MapFrom()
  userId: number;

  @MapFrom()
  sportCenterId: number;

  @MapFrom()
  amount: number;

  @MapFrom()
  currency: string;

  @MapFrom()
  orderId: string;

  @MapFrom()
  transactionId: string;
}

export class PaymentInfoDto extends DtoMapper {
  @MapFrom()
  id: number;

  @MapFrom()
  userId: number;

  @MapFrom()
  sportCenterId: number;

  @MapFrom()
  amount: number;

  @MapFrom()
  currency: string;

  @MapFrom()
  orderId: string;

  @MapFrom()
  transactionId: string;

  @MapFrom()
  createdAt: Date;

  @MapFrom('bookings', BookingDto, true)
  bookings: BookingDto[];

  @MapFrom('user', UserProfileDto)
  user: UserProfileDto;

  @MapFrom('sportCenter', SportCenterInfoDto)
  sportCenter: SportCenterInfoDto;
}

export class PaymentBookDataDto extends DtoMapper {
  @MapFrom()
  id: number;

  @MapFrom()
  amount: number;

  @MapFrom()
  orderId: string;
}
