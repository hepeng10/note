import { AxiosRequestConfig } from './types';
import xhr from './xhr';
import { buildUrl } from './helpers/url';
import { transformRequest } from './helpers/data';

function axios(config: AxiosRequestConfig): void {
    processConfig(config);
    xhr(config);
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config);
    config.data = transformRequestData(config);
}

// 转换 url
function transformUrl(config: AxiosRequestConfig): string {
    const { url, params } = config;
    return buildUrl(url, params);
}

function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data);
}

export default axios;
