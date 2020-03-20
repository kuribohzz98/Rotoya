export enum Signature {
    partnerCode,
    accessKey,
    requestId,
    bankCode,
    amount,
    orderId,
    transId,
    errorCode,
    message,
    responseTime,
    orderInfo,
    returnUrl,
    notifyUrl,
    extraData,
    requestType
}

export enum RequestType {
    MomoATM = 'payWithMoMoATM'
}

export enum BankCode {
    VIB = 'VIB',
    AB = 'ABB',
    Sacom = 'STB',
    Maritime = 'MSB',
    Navi = 'NVB',
    Vietin = 'CTG',
    DongA = 'DAB',
    HD = 'HDB',
    VietA = 'VAB',
    VP = 'VPB',
    ACB = 'ACB',
    BaoViet = 'BVB',
    KienLong = 'KLB',
    Vietcom = 'VCB',
    MB = 'MB',
    GP = 'GPB',
    Exim = 'EIB',
    Ocean = 'OJB',
    BacA = 'NASB',
    Oricom = 'OCB',
    LienVietPost = 'LPB',
    TP = 'TPB',
    Sea = 'SEAB',
    Agri = 'VARB',
    BIDV = 'BIDV',
    SHB = 'SHB',
    SCB = 'SCB',
    Techcom = 'TCB'
}