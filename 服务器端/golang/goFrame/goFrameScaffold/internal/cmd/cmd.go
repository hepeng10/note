package cmd

import (
	"context"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
	"github.com/gogf/gf/v2/os/gcmd"

	"goFrameScaffold/internal/controller/hello"
	"goFrameScaffold/internal/controller/user"
)

var (
	Main = gcmd.Command{
		Name:  "main",
		Usage: "main",
		Brief: "start http server",
		Func: func(ctx context.Context, parser *gcmd.Parser) (err error) {
			s := g.Server()
			// note: 路由注册
			// s.BindHandler("/hello", func(req *ghttp.Request) {
			// 	req.Response.Writeln("Hello GF")
			// })

			// note: 路由分组
			// /api/user
			// // /api/product
			// s.Group("/api", func(group *ghttp.RouterGroup) {
			// 	group.Middleware(ghttp.MiddlewareHandlerResponse)
			// 	s.Group("/user", func(group1 *ghttp.RouterGroup) {
			// 		group1.Bind(
			// 			user.NewV1(),
			// 		)
			// 	})
			// 	s.Group("/product", func(group1 *ghttp.RouterGroup) {
			// 		group1.Bind(
			// 			hello.NewV1(),
			// 		)
			// 	})
			// })

			// note: 实际上我们可以在 api 中定义 path 时就可以通过 path 来进行分组，而不用上面那种分组方式
			s.Group("/api/v1", func(group *ghttp.RouterGroup) {
				group.Middleware(ghttp.MiddlewareHandlerResponse)
				group.Bind(
					hello.NewV1(),
					user.NewV1(),
				)
			})
			s.Group("/api/v2", func(group *ghttp.RouterGroup) {
				group.Middleware(ghttp.MiddlewareHandlerResponse)
				group.Bind(
					// api/user/v2 目录中编写接口定义后，通过 gf gen ctrl 命令自动生成
					// 此函数对应的文件是能手动修改的，自动生成时会往文件末尾追加代码，而不会覆盖手动修改的代码
					user.NewV2(),
				)
			})

			s.Run()
			return nil
		},
	}
)
