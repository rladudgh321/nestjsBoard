import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly configService: ConfigService
    ) {}


  @Get()
  getHello(
    @Ip() ip: string
  ): string {
    console.log(ip);
    const ENVIRONMENT = this.configService.get('ENVIRONMENT')
    console.log(ENVIRONMENT);
    return this.appService.getHello();
  }
}
