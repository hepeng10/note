module.exports = {
    path: 'main',
    //子路由
    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./router/sub1'),
            ])
        },'main')
    }
}
