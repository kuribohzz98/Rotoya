import { BaseWorkerChild } from '../base/BaseWorkerChild';

class TestWorkerChild extends BaseWorkerChild {
  init () {
    this.dataExit('__hihi___');
  }

}

export default new TestWorkerChild();