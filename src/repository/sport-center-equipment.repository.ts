import { EntityRepository } from "typeorm";
import { SportCenterEquipment } from './../entity/SportCenterEquipment.entity';
import { SportCenterEquipmentAttribute } from './../interface/attribute.interface';
import { BaseRepository } from './../base/BaseRepository';

@EntityRepository(SportCenterEquipment)
export class SportCenterEquipmentRepository extends BaseRepository<SportCenterEquipment, SportCenterEquipmentAttribute>  {
    
    getBySportIdAndSportCenterId(sportId: number, sportCenterId: number): Promise<SportCenterEquipment[]> {
        const sce = this.models.sport_center_equipment;
        const se = this.models.sport_equipment;
        return this.createQueryBuilder(sce)
            .leftJoinAndSelect(`${sce}.sportEquipment`, se)
            .where(`${sce}.sportCenterId = :sportCenterId`, { sportCenterId })
            .andWhere(`${se}.sportId = :sportId`, { sportId })
            .andWhere(`${sce}.isDelete IS NULL`)
            .getMany()
    }
}