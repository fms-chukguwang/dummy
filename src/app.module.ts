import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { typeOrmModuleOptions } from './configs/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from './member/member.module';

@Module({
  imports: [ConfigModule.forRoot(
    {isGlobal: true}
  ),
  TypeOrmModule.forRootAsync(typeOrmModuleOptions),
  MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
