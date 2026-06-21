package user

import (
	"context"

	v1 "goFrameScaffold/api/user/v1"
	"goFrameScaffold/internal/dao"
	"goFrameScaffold/internal/model/do"
	"goFrameScaffold/internal/service"
)

type sUser struct {
}

func init() {
	service.RegisterUser(&sUser{})
}

// 添加用户
func (u *sUser) AddUser(ctx context.Context, name string, age uint) (res *v1.CreateRes, err error) {
	// note: 通过 dao 组件操作 user 表
	// 使用do转换模型对象输入我们的数据。do转换模型会自动过滤nil数据，并在底层自动转换为对应的数据表字段类型
	insertId, err := dao.User.Ctx(ctx).Data(do.User{
		Name:   name,
		Status: v1.StatusOK,
		Age:    age,
		// 通过InsertAndGetId方法将Data的参数写入数据库，并返回新创建的记录主键id
	}).InsertAndGetId()
	if err != nil {
		return nil, err
	}
	res = &v1.CreateRes{
		Id: insertId,
	}
	return
}
