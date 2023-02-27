import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { envFilePathConfiguration } from './Configs/EnvFilePathConfig';
import { nestEnvConfiguration } from './Configs/NestEnvConfig';
import { ApplicationModule } from './Modules/ApplicationModule';
import { DBConfigInterface } from './Interfaces/DbConfigInterface';
import { QueryFailedErrorFilter } from './Helpers/Middlewares/QueryFailedErrorFilter';
import { PerformanceMiddleware } from './Helpers/Middlewares/PerformanceMiddleware';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [envFilePathConfiguration()],
            load: [nestEnvConfiguration],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => Object.assign(configService.get<DBConfigInterface>('DATABASE')),
        }),
        ApplicationModule,
    ],
    providers: [{ provide: APP_FILTER, useClass: QueryFailedErrorFilter }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        if (process.env.USERS_CCU_ENV === 'local' || process.env.USERS_CCU_ENV === 'dev') {
            consumer.apply(PerformanceMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
        }
    }
}
