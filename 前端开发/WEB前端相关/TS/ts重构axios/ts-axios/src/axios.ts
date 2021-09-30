import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types';
import xhr from './xhr';
import { buildUrl } from './helpers/url';
import { transformRequest, transformResponse } from './helpers/data';
import { processHeaders } from './helpers/headers';

function axios(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config);
    return xhr(config).then((res) => {
        return transformResponseData(res);
    });
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config);
    config.headers = transformHeaders(config);  // 需要先处理 headers，因为下面的 transformRequestData 会将 data 对象转成字符串，这会影响处理 headers 的操作。
    config.data = transformRequestData(config);
}

// 转换 url 参数。get 请求传 params
function transformUrl(config: AxiosRequestConfig): string {
    const { url, params } = config;
    return buildUrl(url, params);
}

// 转换 data 参数。其它类型请求传 data
function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data);
}

// 转换 headers 参数
function transformHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config;
    return processHeaders(headers, data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transformResponse(res.data);
    return res;
}

export default axios;
