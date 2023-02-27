import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLogger } from '../Helpers/Middlewares/CustomLogger';
import { importAllFromRequireContext } from '../Helpers/Utils/RequireContext';

@Module({
    imports: [
        TypeOrmModule.forFeature(importAllFromRequireContext(require.context('../Models/Entities/', true, /Entity\.ts$/))),
        JwtModule.register({}),
    ],
    providers: [
        ...importAllFromRequireContext(require.context('../Services/', true)),
        ...importAllFromRequireContext(require.context('../Daos/', true)),
        ...importAllFromRequireContext(require.context('../WebServices/', true)),
        CustomLogger,
    ],
    controllers: importAllFromRequireContext(require.context('../Controllers/', true)),
    exports: [TypeOrmModule, CustomLogger],
})
export class ApplicationModule {}
