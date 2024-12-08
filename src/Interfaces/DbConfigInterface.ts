export interface DBConfigInterface {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    autoLoadEntities: boolean;
    type: string;
}

export interface EnvConfigInterface {
    DATABASE: any;
    APP_NAME?: any;
    PORT?: number;
    RABBITMQ?: {
        uri: any;
        connectionInitOptions: { wait: any };
        exchanges: { name: any; type: any }[];
        uriOptions: { heartbeat: any };
    };
}
