import { SortType } from './../constants/model.constants';
import { OptionsPaging } from './repository.interface';
import { RequestType } from './../constants/payment.constants';
import { ApiProperty } from '@nestjs/swagger';

class BaseBodyMomo {
  @ApiProperty()
  partnerCode: string;

  @ApiProperty()
  accessKey: string;

  @ApiProperty()
  requestId: string;

  @ApiProperty()
  signature: string;
}

class BaseBodySideMomo extends BaseBodyMomo {
  errorCode: number;
  message: string;
  localMessage: string;
}

class BaseRequestMomo extends BaseBodyMomo {
  @ApiProperty()
  amount: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  orderInfo: string;

  @ApiProperty()
  returnUrl: string;

  @ApiProperty()
  notifyUrl: string;

  @ApiProperty()
  requestType: string;

  @ApiProperty()
  extraData: string = '';
}

export class RequestMomoATM extends BaseRequestMomo {
  @ApiProperty()
  bankCode: string;

  @ApiProperty({ enum: RequestType, default: RequestType.MomoATM })
  requestType: RequestType = RequestType.MomoATM;
}

export class RequestMomoAIO extends BaseRequestMomo {
  @ApiProperty({ enum: RequestType, default: RequestType.MomoAIO })
  requestType: RequestType = RequestType.MomoAIO;
}

export class ResponseSideMomoAfterFirstRequestATM extends BaseBodySideMomo {
  @ApiProperty({ enum: RequestType, default: RequestType.MomoATM })
  requestType: RequestType = RequestType.MomoATM;

  @ApiProperty()
  payUrl: string;
}

export class ResponseSideMomoAfterFirstRequestAIO extends BaseBodySideMomo {
  @ApiProperty({ enum: RequestType, default: RequestType.MomoAIO })
  requestType: RequestType = RequestType.MomoAIO;

  @ApiProperty()
  payUrl: string;

  @ApiProperty()
  qrCodeUrl: string;

  @ApiProperty()
  deeplink: string;

  @ApiProperty()
  deeplinkWebInApp: string;
}

export class NotifyUrlBodySideMomo extends BaseBodySideMomo {
  amount: string;
  orderId: string;
  orderInfo: string;
  orderType: string;
  transId: string;
  payType: string;
  responseTime: string;
  extraData: string;
}

export class NotifyUrlSideServer extends BaseBodyMomo {
  @ApiProperty()
  orderId: string;

  @ApiProperty()
  errorCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  responseTime: string;

  @ApiProperty()
  extraData: string;
}

export class OptionsQueryPayment implements OptionsPaging {
  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  sort: string;

  @ApiProperty({ required: false })
  sortType: SortType;

  @ApiProperty({ required: false })
  count: boolean;

  @ApiProperty({ required: false })
  userId?: number;

  @ApiProperty({ required: false })
  sportCenterId?: number;

  @ApiProperty({ required: false })
  orderId?: number;
}
