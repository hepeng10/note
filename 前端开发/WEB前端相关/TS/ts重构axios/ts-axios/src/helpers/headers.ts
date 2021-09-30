import { isPlainObject } from './util';

// 对 headers 参数的字段名进行规范化
function normalizeHeaderName(headers: any, normalizedName: string):void {
    if (!headers) {
        return;
    }
    Object.keys(headers).map(name => {
        // 用户传的 headers 中的字段名与我们期望规范化的名字都大写后相同，则将其字段名转换为规范化的名字。
        // 如用户传的 content-type，我们期望的是 Content-Type，则转为我们的 Content-Type
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name];
            delete headers[name];
        }
    });
}

// 处理 headers 参数
export function processHeaders(headers: any, data: any): any {
    normalizeHeaderName(headers, 'Content-Type');

    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {  // 没传 content-type 则默认为 application/json
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }

    return headers;
}


// 解析响应的 header
export function parseHeaders(headers: string): any {
    let parsed = Object.create(null);
    if (!headers) {
        return parsed;
    }
    // 对返回的 headers 字符串使用回车符进行分割
    headers.split('\r\n').forEach(line => {
        let [key, val] = line.split(':');
        key = key.trim().toLowerCase();
        if (!key) {  // key 为空字符串直接跳过
            return;
        }
        if (val) {  // 有 val 去除两边的空格
            val = val.trim();
        }
        parsed[key] = val;  // 有 key，但是 val 可能为空字符串
    });
    return parsed
}
