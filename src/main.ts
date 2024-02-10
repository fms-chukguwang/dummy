import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    //   {
    //   logger: winstonLogger,
    // }
  );

  const appInstance = app.getHttpAdapter().getInstance();
  // .env 파일을 현재 환경에 로드
  dotenv.config();
  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT');

  await app.listen(3002);
}
bootstrap();
