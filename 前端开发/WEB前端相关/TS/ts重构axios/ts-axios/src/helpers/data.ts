import { isPlainObject } from './util';

export function transformRequest(data: any): any {
    if (isPlainObject(data)) {  // 普通对象转换成 JSON 字符串
        return JSON.stringify(data);
    }
    return data;
}
