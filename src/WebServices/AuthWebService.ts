import { AxiosWebServices } from './AxiosWebServices';

export class AuthWebService extends AxiosWebServices {
    // Configurar a caso de uso.
    async login(email: string, password: string): Promise<any> {
        const url = `${process.env.URL_CORE}`;
        const body = {
            email,
            password,
        };
        const headers = this.buildDefaultConfig();
        const config = this.buildAxiosRequestConfig({ ...headers });
        const response = await this.post(url, body, config);
        return response;
    }
}
