package user

import (
	"context"

	v1 "goFrameScaffold/api/user/v1"
	"goFrameScaffold/internal/dao"
)

func (c *ControllerV1) Delete(ctx context.Context, req *v1.DeleteReq) (res *v1.DeleteRes, err error) {
	// note: 使用WherePri方法根据主键删除记录，Delete方法删除数据
	_, err = dao.User.Ctx(ctx).WherePri(req.Id).Delete()
	return
}
