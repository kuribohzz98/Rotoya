import { ObjectLiteral } from 'typeorm';
import * as crypto from 'crypto';
import { Logger } from '@nestjs/common';
import { Signature, BankCode } from './../../constants/payment.constants';

function getSignatureEncode(data: string, secretKey: string) {
    const logger = new Logger('helper:utils:payments.ts');
    logger.log("--------------------RAW SIGNATURE----------------");
    logger.log(data);
    const signature = crypto.createHmac('sha256', secretKey).update(data).digest('hex');
    return signature;
}

export function getSignature(data: ObjectLiteral, secretKey: string, skip?: string[]): string {
    const dataTemp = Object.keys(data)
        .sort((a, b) => Signature[a] - Signature[b])
        .filter(key => !skip || !skip.length || !skip.includes(key))
        .map(key => `${key}=${data[key]}`);
    return getSignatureEncode(dataTemp.join('&'), secretKey);
}

export function checkKeySignature(data: ObjectLiteral) {
    Object.keys(data).map(key => {
        if (!Signature[key]) throw new Error(`${key} is not found in Signature enum`);
    })
}

export function checkBankCode(bankCode: string) {
    const code = Object.keys(BankCode).find(key => BankCode[key] == bankCode);
    if (code) return true;
    return false;
}

export function hashSHA256(data) {
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    return hash;
}