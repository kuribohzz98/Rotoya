import { RpcService } from './service/rpc.service';
import { Controller, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';
import * as QRCode from 'qrcode/lib';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) // private readonly roleRepository: RoleRepository
  {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/a')
  async getA() {
    // return await this.roleRepository.getByOptions({id: 1});
    QRCode.toDataURL(
      'kdbfkjhdsafijhdasojfhjkldbnasbdmnavbdmhaskjhaskldhkjlash',
      function(err, url) {
        console.log(url);
      },
    );
    return 'a';
  }
}
