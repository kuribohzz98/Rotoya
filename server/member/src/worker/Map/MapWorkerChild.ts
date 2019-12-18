import { TypePositionMapAndDistance, TypePointFourDirection } from './../../interface/type.interface';
import { BaseWorkerChild } from './../../base/BaseWorkerChild';
import {
    destinationPointGivenDistanceAndBearingFromStartPoint,
    toRadian
} from 'src/helper/fomular';

class MapWorkerChild extends BaseWorkerChild<TypePositionMapAndDistance> {
    init() {
        const data = {} as TypePointFourDirection;
        data.pointNorth = destinationPointGivenDistanceAndBearingFromStartPoint(this.WorkerData.data, 0);
        data.pointEast = destinationPointGivenDistanceAndBearingFromStartPoint(this.WorkerData.data, toRadian(90));
        data.pointSouth = destinationPointGivenDistanceAndBearingFromStartPoint(this.WorkerData.data, toRadian(180));
        data.pointWest = destinationPointGivenDistanceAndBearingFromStartPoint(this.WorkerData.data, toRadian(270));
        this.dataExit(data);
    }

}

export default new MapWorkerChild();