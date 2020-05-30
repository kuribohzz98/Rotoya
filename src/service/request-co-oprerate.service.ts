import { Injectable } from "@nestjs/common";
import { UpdateResult } from "typeorm";
import { RequestCoOperateRepository } from './../repository/request-co-operate.repository';
import { BaseService } from './../base/BaseService';
import { RequestCoOperateAttribute } from './../interface/attribute.interface';
import { RequestCoOperate } from '../entity/RequestCoOperate.entity';
import { ECoOperateStatus } from "../entity/db.type";
import { EmailService } from './email.service';
import { AuthService } from './../auth/auth.service';
import { UserCreateDto, UserInfo } from './../dto/user.dto';
import { RandomPassword } from "../helper/utils/common";
import { RoleCode } from "../constants/auth.constants";

@Injectable()
export class RequestCoOperateService
    extends BaseService<RequestCoOperateRepository, RequestCoOperate, RequestCoOperateAttribute> {

    constructor(
        private readonly sequestCoOperateRepository: RequestCoOperateRepository,
        private readonly emailService: EmailService,
        private readonly authService: AuthService
    ) {
        super(sequestCoOperateRepository)
    }

    mapEntityToDto(entity: RequestCoOperate): RequestCoOperate {
        return entity;
    }

    async update(id: number, opts: RequestCoOperateAttribute): Promise<UpdateResult> {
        if (opts.status == ECoOperateStatus.APPROVED) {
            const userCreateDto = new UserCreateDto();
            userCreateDto.username = opts.phone;
            userCreateDto.password = RandomPassword();
            const userInfo = new UserInfo(opts);
            userInfo.address = (opts.address ? opts.address + ', ' : '') + opts.commune + ', ' + opts.district + ', ' + opts.city;
            userCreateDto.userInfo = userInfo;
            userCreateDto.roles = [RoleCode.PROVIDER];
            const userCreated = this.authService.signUp(userCreateDto);
            const mail = this.emailService.sendMail([userCreateDto.userInfo.email],
                'Rotoya Thông báo xác nhận cộng tác',
                `Yêu cầu xác nhận cộng tác của bạn đã được xác nhận. Chúng tôi rất vui khi được làm việc với các bạn.\n
                Tên đăng nhập: ${userCreateDto.username}\n
                Mật Khẩu: ${userCreateDto.password}`
            );
            await Promise.all([userCreated, mail]);
        }
        if (opts.status == ECoOperateStatus.REJECTED) {
            await this.emailService.sendMail([opts.email],
                'Rotoya Thông báo từ chối cộng tác',
                opts.note || `Chúng tôi rất lấy làm tiếc khi phải từ chối yêu cầu của bạn. Mong một ngày không xa có thể được cộng tác với bạn thật sự.`
            );
        }
        return this.sequestCoOperateRepository.update({ id }, opts);
    }

} 