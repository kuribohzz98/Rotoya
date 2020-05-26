import { BaseWorkerChild } from '../base/BaseWorkerChild';
import { toRadian } from './../helper/utils/fomular';

class TestWorkerChild extends BaseWorkerChild {
  init () {
    this.dataExit(toRadian(16));
  }

}

export default new TestWorkerChild();