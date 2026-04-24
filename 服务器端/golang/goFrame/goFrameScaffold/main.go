package main

import (
	_ "goFrameScaffold/internal/logic"

	"errors"
	_ "goFrameScaffold/internal/packed"

	// 数据库驱动从社区安装：https://github.com/gogf/gf/tree/master/contrib/drivers
	_ "github.com/gogf/gf/contrib/drivers/mysql/v2"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gctx"

	"goFrameScaffold/internal/cmd"
)

// connDb 检查数据库连接是否正常
func connDb() error {
	err := g.DB().PingMaster()
	if err != nil {
		return errors.New("连接到数据库失败")
	}
	return nil
}

func main() {
	var err error

	// 检查数据库是否能连接
	err = connDb()
	if err != nil {
		panic(err)
	}

	cmd.Main.Run(gctx.GetInitCtx())
}
