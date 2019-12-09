// import { RoleRepository } from './repository/role.repository';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly roleRepository: RoleRepository
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/a')
  async getA() {
    // return await this.roleRepository.getByOptions({id: 1});
    return 'a'
  }
}
