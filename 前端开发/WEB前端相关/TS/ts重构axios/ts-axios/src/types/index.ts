// 用于定义类型的公共文件

export type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' | 'options' | 'OPTIONS' | 'put' | 'PUT' | 'patch' | 'PATCH';

export interface AxiosRequestConfig {
    url: string;
    method?: Method;
    data?: any;  // body 参数
    params?: any;  // url 参数
}
