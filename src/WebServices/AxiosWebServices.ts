/* eslint-disable class-methods-use-this */
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import HttpCustomException from '../Exceptions/HttpCustomException';
import axios from '../Helpers/Utils/InterceptedAxios';

export abstract class AxiosWebServices {
    async get<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
        try {
            const response: AxiosResponse<R> = await axios.get<R>(url, config);
            return response.data;
        } catch (error) {
            throw this._handleError(error);
        }
    }

    async post<R = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<R> {
        try {
            const response: AxiosResponse<R> = await axios.post<R>(url, data, config);
            return response.data;
        } catch (error) {
            throw this._handleError(error);
        }
    }

    protected _handleError(error: any): void {
        if (error.response) {
            throw HttpCustomException.createHttpCustomExceptionFromError(error);
        }
        throw error;
    }

    protected buildDefaultConfig(): AxiosRequestConfig {
        const headers = this.getDefaultHeaders();
        return this.buildAxiosRequestConfig(headers);
    }

    protected getDefaultHeaders(): { [key: string]: string } {
        return {
            'Content-Type': 'application/json',
        };
    }

    protected buildAxiosRequestConfig(headers: any = null): AxiosRequestConfig {
        const config: AxiosRequestConfig = {
            headers,
        };
        return config;
    }
}
