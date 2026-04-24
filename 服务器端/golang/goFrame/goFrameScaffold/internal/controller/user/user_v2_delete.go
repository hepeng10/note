package user

import (
	"context"

	"github.com/gogf/gf/v2/errors/gcode"
	"github.com/gogf/gf/v2/errors/gerror"

	"goFrameScaffold/api/user/v2"
)

func (c *ControllerV2) Delete(ctx context.Context, req *v2.DeleteReq) (res *v2.DeleteRes, err error) {
	return nil, gerror.NewCode(gcode.CodeNotImplemented)
}
