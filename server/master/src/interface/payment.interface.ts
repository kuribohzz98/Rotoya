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

export class RequestMomoAtm extends BaseBodyMomo {
    @ApiProperty()
    bankCode: string;

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

    @ApiProperty({enum: RequestType, default: RequestType.MomoATM})
    requestType: RequestType = RequestType.MomoATM;

    @ApiProperty()
    extraData: string = "";
}

export class ResponseSideMomoAfterFirstRequest extends BaseBodySideMomo {
    @ApiProperty({enum: RequestType, default: RequestType.MomoATM})
    requestType: RequestType = RequestType.MomoATM;

    @ApiProperty()
    payUrl: string;
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