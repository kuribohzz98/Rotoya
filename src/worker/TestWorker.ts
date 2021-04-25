import { TypeFilePathChild } from './../base/BaseWorker';
import { BaseWorker } from '../base/BaseWorker';

export class TestWorker extends BaseWorker {
  filePathChild(): TypeFilePathChild {
    const data = {} as TypeFilePathChild;
    data.__dirname = __dirname;
    data.__path = __filename;
    return data;
  }
}
