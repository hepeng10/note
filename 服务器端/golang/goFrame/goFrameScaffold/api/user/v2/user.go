package v2

import (
	"goFrameScaffold/internal/model/entity"

	"github.com/gogf/gf/v2/frame/g"
)

// note: 定义请求和响应的struct
type CreateReq struct {
	// 这些元数据信息都是遵循的OpenAPIv3的定义
	g.Meta `path:"/user/create" method:"post" tags:"User" summary:"Create user"`
	Name   string `v:"required|length:3,10" dc:"user name"`
	Age    uint   `v:"required|between:18,200" dc:"user age"`
}
type CreateRes struct {
	Id int64 `json:"id" dc:"user id"`
}

type DeleteReq struct {
	g.Meta `path:"/user/del" method:"post" tags:"User" summary:"Delete user"`
	Id     int64 `v:"required" dc:"user id"`
}
type DeleteRes struct{}

// Status marks user status.
type Status int

const (
	StatusOK       Status = 0 // User is OK.
	StatusDisabled Status = 1 // User is disabled.
)

type UpdateReq struct {
	g.Meta `path:"/user/update" method:"post" tags:"User" summary:"Update user"`
	Id     int64   `v:"required" dc:"user id"`
	Name   *string `v:"length:3,10" dc:"user name"`
	Age    *uint   `v:"between:18,200" dc:"user age"`
	// 接口参数我们使用了指针来接收，目的是避免类型默认值对我们修改接口的影响。举个例子，假如Status不定义为指针，那么它就会有默认值0的影响，那么在处理逻辑中，很难判断到底调用端有没有传递该参数，是否要真正修改数值为0。但我们使用指针后，当用户没有传递该参数时，该参数的默认值就是nil，处理逻辑便很好做判断。
	Status *Status `v:"in:0,1" dc:"user status"`
}
type UpdateRes struct{}

type GetOneReq struct {
	g.Meta `path:"/user/query" method:"get" tags:"User" summary:"Get one user"`
	Id     int64 `v:"required" dc:"user id"`
}
type GetOneRes struct {
	// *entity.User结构体，该结构是前面我们通过make dao命令生成的entity，该数据结构与数据表字段一一对应。
	*entity.User `dc:"user"`
}

type GetListReq struct {
	g.Meta `path:"/user/list" method:"get" tags:"User" summary:"Get users"`
	Age    *uint   `v:"between:18,200" dc:"user age"`
	Status *Status `v:"in:0,1" dc:"user status"`
}
type GetListRes struct {
	List []*entity.User `json:"list" dc:"user list"`
}
