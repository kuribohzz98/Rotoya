import * as fs from 'fs';
import * as uuidv4 from 'uuid/v4';
import * as QRCode from 'qrcode/lib';

export function saveImageBase64(dir: string, dataImage: string) {
    try {
        let base64Data = dataImage.replace(/^data:image\/png;base64,/, "");
        const fileName = uuidv4() + '.png';
        fs.writeFileSync(dir + fileName, base64Data, 'base64');
        return fileName;
    } catch (e) {
        throw new Error(`saveImage error: ${e}`);
    }
}

export function createQrCode(data, callback: (err: any, data: string) => any) {
    QRCode.toDataURL(data, callback);
}

export async function createQrCodeAndSave(
    dir: string,
    data
): Promise<{ dataBase64: string, fileName: string }> {
    return new Promise((resolve, reject) => {
        createQrCode(data, (err, dataBase64) => {
            const fileName = saveImageBase64(dir, dataBase64);
            resolve({ dataBase64, fileName });
        })
    })
}

export function readFileImg(dir: string) {
    try {
        const img = fs.readFileSync(dir);
        return img.toString('base64');
    } catch (e) {
        console.log(`readFileImg error: ${e}`);
        return;
    }
}

export function createFolder(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}