package user

import (
	"context"

	v1 "goFrameScaffold/api/user/v1"
	"goFrameScaffold/internal/dao"
	"goFrameScaffold/internal/model/do"
)

func (c *ControllerV1) Update(ctx context.Context, req *v1.UpdateReq) (res *v1.UpdateRes, err error) {
	// note: 使用WherePri方法根据主键更新记录，Data方法更新数据，Update方法执行更新操作
	_, err = dao.User.Ctx(ctx).WherePri(req.Id).Data(do.User{
		Name:   req.Name,
		Age:    req.Age,
		Status: req.Status,
	}).Update()
	return
}
