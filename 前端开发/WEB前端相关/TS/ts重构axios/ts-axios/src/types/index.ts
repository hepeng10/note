// 用于定义类型的公共文件

export type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' | 'options' | 'OPTIONS' | 'put' | 'PUT' | 'patch' | 'PATCH';

export interface AxiosRequestConfig {
    url: string;
    method?: Method;
    data?: any;  // body 参数
    params?: any;  // url 参数
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
}

export interface AxiosResponse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request: any;
}

export interface AxiosPromise extends Promise<AxiosResponse>{

}

export interface AxiosError extends Error{
    isAxiosError: boolean;
    config: AxiosRequestConfig;
    code?: string | null;
    request?: any;
    response: AxiosResponse;
}
