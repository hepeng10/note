package user

import (
	"context"

	"github.com/gogf/gf/v2/errors/gcode"
	"github.com/gogf/gf/v2/errors/gerror"

	"goFrameScaffold/api/user/v3"
)

func (c *ControllerV3) Create(ctx context.Context, req *v3.CreateReq) (res *v3.CreateRes, err error) {
	return nil, gerror.NewCode(gcode.CodeNotImplemented)
}
