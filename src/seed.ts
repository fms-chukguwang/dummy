import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';


import { Member } from './member/entities/member.entity';
import { MemberModule } from './member/member.module';

import { MemberSeed } from './seed/member.seed';


seeder({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'fms.cd2wlfd8lgtx.ap-northeast-2.rds.amazonaws.com',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: 'admin',
      password: '00000000',
      database: 'dummy4',
      //  autoLoadEntities: true,
      entities: [Member],
      synchronize: process.env.DB_SYNC === 'true',
    }),

    TypeOrmModule.forFeature([Member]),
  ],
}).run([MemberSeed]);
