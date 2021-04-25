import * as fs from 'fs';
import * as QRCode from 'qrcode/lib';

export function saveImageBase64(
  dir: string,
  fileName: string,
  dataImage: string,
) {
  try {
    let base64Data = dataImage.replace(/^data:image\/png;base64,/, '');
    const name = fileName + '.png';
    fs.writeFileSync(dir + name, base64Data, 'base64');
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
  fileName: string,
  data,
): Promise<{ dataBase64: string; fileName: string }> {
  return new Promise((resolve, reject) => {
    createQrCode(data, (err, dataBase64) => {
      const name = saveImageBase64(dir, fileName, dataBase64);
      resolve({ dataBase64, fileName: name });
    });
  });
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
