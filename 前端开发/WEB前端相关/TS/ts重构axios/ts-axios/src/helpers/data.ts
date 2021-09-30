import { isPlainObject } from './util';

export function transformRequest(data: any): any {
    if (isPlainObject(data)) {  // 普通对象转换成 JSON 字符串
        return JSON.stringify(data);
    }
    return data;
}

export function transformResponse(data: any): any {
    if (typeof data === 'string') {
        try {  // 字符串类型尝试转换为 JSON 对象
            data = JSON.parse(data);
        } catch (e) {
            // do nothing
        }
    }
    return data;
}
