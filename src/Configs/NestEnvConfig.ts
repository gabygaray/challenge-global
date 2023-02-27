export const envModelTransformer = (envs: any) => ({
    APP_NAME: envs.APP_NAME,
    PORT: parseInt(envs.PORT, 10) || 3333,
    DATABASE: {
        host: envs.DATABASE_HOST,
        port: Number(envs.DATABASE_PORT),
        username: envs.DATABASE_USER,
        password: envs.DATABASE_PASSWORD,
        database: envs.DATABASE_DB,
        type: envs.DATABASE_TYPE,
        synchronize: false,
        autoLoadEntities: envs.DATABASE_AUTO_LOAD_ENTITIES,
        keepConnectionAlive: true,
    },
    RABBITMQ: {
        uri: envs.RABBITMQ_URI,
        connectionInitOptions: {
            wait: envs.RABBITMQ_CONNECTION_WAIT,
        },
        exchanges: [
            {
                name: envs.RABBITMQ_EXCHANGE,
                type: envs.RABBITMQ_EXCHANGE_TYPE,
            },
        ],
        uriOptions: {
            heartbeat: envs.RABBITMQ_HEARTBEAT,
        },
    },
});

export const nestEnvConfiguration = () => envModelTransformer(process.env);
