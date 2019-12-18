import { BaseWorkerChild } from '../base/BaseWorkerChild';
import { toRadian } from 'src/helper/fomular';

class TestWorkerChild extends BaseWorkerChild {
  init () {
    this.dataExit(toRadian(16));
  }

}

export default new TestWorkerChild();