package user

import (
	"context"

	v1 "goFrameScaffold/api/user/v1"
	"goFrameScaffold/internal/dao"
	"goFrameScaffold/internal/model/do"
)

func (c *ControllerV1) GetList(ctx context.Context, req *v1.GetListReq) (res *v1.GetListRes, err error) {
	res = &v1.GetListRes{}
	// note: Scan方法，该方法可以将查询到的多条数据表记录智能地映射到结构体对象res.List
	err = dao.User.Ctx(ctx).Where(do.User{
		Age:    req.Age,
		Status: req.Status,
	}).Scan(&res.List)
	return
}
