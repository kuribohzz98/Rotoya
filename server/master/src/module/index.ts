import { EmailModule } from './email.module';
import { RequestCoOperateModule } from './request-co-operate.module';
import { SportGroundModule } from './sport-ground.module';
import { SportGroundTimeSlotModule } from './sport-ground-time-slot.module';
import { SportCenterModule } from './sport-center.module';
import { ImageModule } from './image.module';
import { BookingModule } from './booking.module';
import { MapModule } from './map.module';
import { PaymentModule } from './payment.module';
import { RpcModule } from './prc.module';
import { SportModule } from './sport.module';
import { UserModule } from './user.module';

const Modules = [
    UserModule,
    SportModule,
    RpcModule,
    PaymentModule,
    MapModule,
    BookingModule,
    ImageModule,
    SportCenterModule,
    SportGroundModule,
    SportGroundTimeSlotModule,
    RequestCoOperateModule,
    EmailModule
];

export default Modules;