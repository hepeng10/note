import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/error';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { url, method = 'get', data = null, headers, responseType, timeout } = config;

        const request = new XMLHttpRequest();

        // 设置返回类型，一般有 text/json/blob/arraybuffer 等，默认为 text
        if (responseType) {
            request.responseType = responseType;
        }

        if (timeout) {
            request.timeout = timeout;  // 给 request 添加 timeout 属性，XHR 请求会在超时时自动触发 ontimeout 方法
        }

        // url 进行类型断言
        request.open(method.toUpperCase(), url!, true);

        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return;
            }

            // 网络错误 或 超时错误 status 为0
            if (request.status === 0) {
                return;
            }

            // readyState 为4时，响应内容解析完成，获取返回数据
            const responseHeaders = parseHeaders(request.getAllResponseHeaders());

            // responseType 为 text 时，request.response 和 request.responseText 值是一样的；而别的类型都取 request.response，所以只需要取 response 就行了。
            // const responseData = responseType !== 'text' ? request.response : request.responseText;
            const responseData = request.response;

            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            handleResponse(response);
        }

        // 网络错误
        request.onerror = function () {
            reject(createError('Network Error', config, null, request));  // 网络错误拿不到 response 所以不用传
        }

        // 超时错误
        request.ontimeout = function () {
            reject(createError(`Timeout of ${timeout} ms`, config, 'ECONNABORTED', request));  // 超时也拿不到 response 所以不传。网络中断一般用 ECONNABORTED 表示
        }

        // 添加 header 参数
        Object.keys(headers).forEach(name => {
            request.setRequestHeader(name, headers[name]);
        });
        request.send(data);

        // response.status 在 200-300 之间的才是正常响应。
        // chrome 网络请求里的 General 里的 status code 为304时，response header 里的 http/1.1 为200，xhr 对象中的 status 也为200，所以当304时 status 也是200，可以正常执行。
        // 要判断是否为304则需要在正常请求的响应头里添加一些标识符之类的来辅助判断，如时间戳。。。
        function handleResponse(res: AxiosResponse): void {
            if (res.status >= 200 && res.status < 300) {
                resolve(res);
            } else {
                reject(createError(`Request failed with status code ${res.status}`, config, null, request, res));
            }
        }
    });
}
