import * as logger from 'better-console-log-plus';
import EnumEnv from './EnumEnv';

export const envFilePathConfiguration = (): string => {
    logger.info(`Entorno - ${process.env.USERS_CCU_ENV}`);
    let envFilePath;
    switch (process.env.USERS_CCU_ENV) {
        case EnumEnv.LOCAL:
            envFilePath = '.env.local';
            break;
        case EnumEnv.DEV:
            envFilePath = '.env.dev';
            break;
        case EnumEnv.PRODUCTION:
            envFilePath = '.env';
            break;
        default:
            envFilePath = '.env';
    }
    logger.info(`envFilePath: ${envFilePath}`);
    return envFilePath;
};
