import { TypePositionMapAndDistance } from './../../interface/type.interface';
import { BaseWorker } from './../../base/BaseWorker';
import { TypeFilePathChild } from './../../base/BaseWorker';

export class MapWorker extends BaseWorker<TypePositionMapAndDistance> {
    filePathChild(): TypeFilePathChild {
        const data = {} as TypeFilePathChild;
        data.__dirname = __dirname;
        data.__path = __filename;
        return data;
    }
}