import { DataSource } from 'typeorm';

import * as Dotenv from 'dotenv';
import * as path from 'path';
import * as logger from 'better-console-log-plus';
import { envModelTransformer } from './src/Configs/NestEnvConfig';
import { envFilePathConfiguration } from './src/Configs/EnvFilePathConfig';
import { EnvConfigInterface } from 'src/Interfaces/DbConfigInterface';

let envs: EnvConfigInterface;

if (process.env.USERS_MS_AUTH === 'local') {
    const envData = Dotenv.config({
        path: `${path.join(process.env.PWD)}/${envFilePathConfiguration()}`,
    }).parsed;
    logger.info(`TYPEORM ENVIRONMENT: ${process.env.USERS_MS_AUTH}\nDATABASE CONNECTION: ${process.env.DATABASE_HOST}`);
    envs = envModelTransformer(envData);
} else {
    logger.info(`TYPEORM ENVIRONMENT: ${process.env.USERS_MS_AUTH}\nDATABASE CONNECTION: ${process.env.DATABASE_HOST}`);
    envs = envModelTransformer(process.env);
}

export const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    schema: 'core',
    type: envs.DATABASE.type,
    host: envs.DATABASE.host,
    port: envs.DATABASE.port,
    username: envs.DATABASE.username,
    password: envs.DATABASE.password,
    database: envs.DATABASE.database,
    logging: false,
    synchronize: envs.DATABASE.synchronize,
    migrations: ['src/Migrations/**/*.{ts,js}'],
    entities: ['src/Models/Entities/**/*.{ts,js}'],
});

async function initializeDatabase() {
    try {
        // Crear el esquema "core" si no existe
        const tempDataSource = new DataSource({
            type: envs.DATABASE.type,
            host: envs.DATABASE.host,
            port: envs.DATABASE.port,
            username: envs.DATABASE.username,
            password: envs.DATABASE.password,
            database: envs.DATABASE.database,
            logging: false,
        });

        await tempDataSource.initialize();
        await tempDataSource.query(`CREATE SCHEMA IF NOT EXISTS "core";`);
        await tempDataSource.destroy();

        // Verificar si la conexión ya está inicializada
        if (!connectionSource.isInitialized) {
            // Inicializar la conexión principal
            await connectionSource.initialize();
            logger.info('Connection to database established');
        } else {
            logger.info('Connection to database already established');
        }
    } catch (error) {
        logger.error('TypeORM connection error: ', error);
    }
}

initializeDatabase();
