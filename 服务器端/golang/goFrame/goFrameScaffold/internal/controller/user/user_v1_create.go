package user

import (
	"context"

	v1 "goFrameScaffold/api/user/v1"
	"goFrameScaffold/internal/service"
)

func (c *ControllerV1) Create(ctx context.Context, req *v1.CreateReq) (res *v1.CreateRes, err error) {
	// 调用 service 层的 AddUser 方法添加用户
	res, err = service.User().AddUser(ctx, req.Name, req.Age)
	if err != nil {
		return nil, err
	}
	return
}
