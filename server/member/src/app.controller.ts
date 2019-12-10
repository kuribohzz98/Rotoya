import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TestWorker } from './worker/TestWorker';
import { MessagePattern } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly testWorker: TestWorker
  ) {}

  @Get()
  getHello() {
    // return this.appService.getHello();
    const worker = new TestWorker();
    return worker.finalData().then(data => {
        // console.log(data);
        return data;
    })
    // return this.testWorker.finalData().then(data => {
    //   return data;
    // });
  }

  @MessagePattern('test')
  accumulate(data: number[]) {
    const worker = new TestWorker();
    return worker.finalData().then(data => {
        // console.log(data);
        return data;
    })
  }
}
