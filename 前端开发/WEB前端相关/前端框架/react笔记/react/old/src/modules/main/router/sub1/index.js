// 权限审批
module.exports = {
    path: 'sub1',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components'))
        },'sub1')
    }
}
