import { isDate, isObject } from "./util";

function encode(v: string): string {
    return encodeURIComponent(v)
        .replace(/%40/g, '@')  // 将以下符号转回来
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}

export function buildUrl(url: string, params?: any): string {
    if (!params) return url;

    const parts: string[] = [];  // url 参数数组。示例:['name=aaa ', 'hobby[]=xx,yy,zz']
    Object.keys(params).forEach(k => {
        const v = params[k];
        if (v === null || v === undefined) {  // 参数值为 null 则不加入到参数中
            return;
        }

        let values = [];  // 值可能是数组或非数组，先统一为数组
        if (Array.isArray(v)) {  // 值是数组
            values = v;
            k += '[]';  // 数组参数的 key 是类似 ?name[]=xxx 的格式
        } else {  // 不是数组，则先统一为数组，如 key=values
            values = [v];
        }

        values.forEach(v => {
            if (isDate(v)) {
                v = v.toISOString();  // isDate 使用了类型谓词，这里才有代码提示
            } else if (isObject(v)) {
                v = JSON.stringify(v);
            }
            parts.push(`${encode(k)}=${encode(v)}`);
        })
    })
    const serializedParams = parts.join('&');
    if (serializedParams) {
        const hashIndex = url.indexOf('#');
        if (hashIndex) {  // 丢弃 hash 内容
            url = url.slice(0, hashIndex);
        }
        if (url.indexOf('?') === -1) {  // url 中没有 ? 则添加 ?
            url += '?' + serializedParams;
        } else {  // url 中有 ? 说明自带参数，添加 &
            url += '&' + serializedParams;
        }
    }
    return url;
}
