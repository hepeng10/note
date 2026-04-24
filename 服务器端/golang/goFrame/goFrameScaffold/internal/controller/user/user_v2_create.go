package user

import (
	"context"

	"github.com/gogf/gf/v2/errors/gcode"
	"github.com/gogf/gf/v2/errors/gerror"

	"goFrameScaffold/api/user/v2"
)

func (c *ControllerV2) Create(ctx context.Context, req *v2.CreateReq) (res *v2.CreateRes, err error) {
	return nil, gerror.NewCode(gcode.CodeNotImplemented)
}
