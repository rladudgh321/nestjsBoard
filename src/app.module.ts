import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import ConfigModule from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [
    ConfigModule(), //다이나믹 모듈이기 때문에 함수형식으로 호출 되어야 함
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'fastcampus',
      password:'111111',
      database:'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:false,
      logging: true, // 데이터베이스에 실행되는 쿼리들을 확인 할 수 있다
    }),
    BoardModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
