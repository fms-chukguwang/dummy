import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Member } from '../member/entities/member.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        namingStrategy: new SnakeNamingStrategy(),
        type: 'mysql',
        host: 'fms.cd2wlfd8lgtx.ap-northeast-2.rds.amazonaws.com',
        port: 3306,
        username: 'admin',
        password: '00000000',
        database: 'dummy4',
        synchronize: true,

       // autoLoadEntities: true,
       entities: [Member],
        logging: true,
    }),
};
