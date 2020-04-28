import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestCoOperateService } from './../service/request-co-oprerate.service';
import { RequestCoOperateRepository } from './../repository/request-co-operate.repository';
import { RequestCoOperateController } from './../controller/request-co-operate.controller';
import { EmailService } from './../service/email.service';
import { AuthModule } from './../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestCoOperateRepository]),
        AuthModule
    ],
    providers: [
        RequestCoOperateService,
        EmailService
    ],
    controllers: [RequestCoOperateController],
    exports: [RequestCoOperateService]
})
export class RequestCoOperateModule { }
