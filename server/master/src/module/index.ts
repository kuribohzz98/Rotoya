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
    ImageModule
]

export default Modules;