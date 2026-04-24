package user

import (
	"context"

	"github.com/gogf/gf/v2/errors/gcode"
	"github.com/gogf/gf/v2/errors/gerror"

	"goFrameScaffold/api/user/v3"
)

func (c *ControllerV3) GetOne(ctx context.Context, req *v3.GetOneReq) (res *v3.GetOneRes, err error) {
	return nil, gerror.NewCode(gcode.CodeNotImplemented)
}
