package user

import (
	"context"

	"github.com/gogf/gf/v2/errors/gcode"
	"github.com/gogf/gf/v2/errors/gerror"

	"goFrameScaffold/api/user/v3"
)

func (c *ControllerV3) Update(ctx context.Context, req *v3.UpdateReq) (res *v3.UpdateRes, err error) {
	return nil, gerror.NewCode(gcode.CodeNotImplemented)
}
