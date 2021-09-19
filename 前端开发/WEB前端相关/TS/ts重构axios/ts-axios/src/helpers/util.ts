const oToString = Object.prototype.toString;

export function isDate(v: any): v is Date {  // 返回值使用类型谓词，可以让编译器知道类型，从而更方便的提示
    return oToString.call(v) === '[object Date]';
}
// 这里判断的是函数、对象、数组等
export function isObject(v: any): v is Object {
    return v !== null && typeof v === 'object';
}
// 这里才是判断是否为普通对象
export function isPlainObject(v: any): v is Object {
    return oToString.call(v) === '[object Object]';
}
