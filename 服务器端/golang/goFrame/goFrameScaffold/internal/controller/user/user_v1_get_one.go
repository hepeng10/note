package user

import (
	"context"

	v1 "goFrameScaffold/api/user/v1"
	"goFrameScaffold/internal/dao"
)

func (c *ControllerV1) GetOne(ctx context.Context, req *v1.GetOneReq) (res *v1.GetOneRes, err error) {
	res = &v1.GetOneRes{}
	// note: Scan方法，该方法可以将查询到的单条数据表记录智能地映射到结构体对象res上
	err = dao.User.Ctx(ctx).WherePri(req.Id).Scan(&res.User)
	return
}
