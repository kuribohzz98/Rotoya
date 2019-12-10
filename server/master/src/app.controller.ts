import { RpcService } from './service/rpc.service';
import { Controller, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rpcService: RpcService
    // private readonly roleRepository: RoleRepository
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/a')
  async getA() {
    // return await this.roleRepository.getByOptions({id: 1});
    return 'a'
  }

  @Get('test')
  async test(@Response() res) {
    this.rpcService.sendTest().subscribe(data => {
      console.log('____+++__', data);
      res.json({data});
    })
  }
}
