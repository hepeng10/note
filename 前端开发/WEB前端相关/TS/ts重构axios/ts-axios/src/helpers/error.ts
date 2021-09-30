import { AxiosRequestConfig, AxiosResponse } from '../types';

export class AxiosError extends Error {
    isAxiosError: boolean;
    config: AxiosRequestConfig;
    code?: string | null;
    request?: any;
    response?: AxiosResponse;

    constructor(
        message: string,
        config: AxiosRequestConfig,
        code?: string | null,
        request?: any,
        response?: AxiosResponse
    ) {
        super(message);
        this.isAxiosError = true;
        this.config = config;
        this.code = code;
        this.request = request;
        this.response = response;
        // 修复 TS 的坑：TS 在继承一些内置类的时候，会出现调用不到成员属性和方法的情况，这里手动设置一下原型可以解决。
        Object.setPrototypeOf(this, AxiosError.prototype);
    }
}

export function createError(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
) {
    return new AxiosError(message, config, code, request, response);
}
