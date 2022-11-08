/**
 * 简单实现了一下 subscribe 和 dispatch
 * 注册监听事件规范：
 * 1. 注册的事件名规则   模块名_事件名  module1_add  / module1_delete  
 * 2. 注册事件，统一在组件的  getInitialState  方法里面注册【该方法只在实例化的时候，调用一次】
 */
window.EventEmitter = {
    _events: {},
    dispatch: function(eventName, data) {
        if (!this._events[eventName]) { // 没有监听事件
            console.info(`EventEmitter.dispatch(${eventName}) ,But Not subscribe ${eventName}`)
            return;
        }
        for (var i = 0; i < this._events[eventName].length; i++) {
            console.info(`EventEmitter.dispatch(${eventName})`)
            this._events[eventName][i](data);
        }
    },
    subscribe: function(eventName, callback) {
        // 创建一个新事件数组

        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }
        this._events[eventName].push(callback);
        console.info(`EventEmitter.subscribe(${eventName})`)
    },
    remove: function(eventName) {
        if (this._events[eventName]) {
            delete this._events[eventName];
            console.info(`EventEmitter.remove(${eventName})`)
        }
    },
    hasEvent: function(eventName) {
        var flag = false;
        if (this._events[eventName])
            flag = true;
        return flag;
    }
};

console.log('import event.js')