帐号信息：
微信号：gh_5c95016a5e20
appID：wx63b9b3552595302d
appsecret：d822b155c98a85699f88180d286fe50d

接口配置：
URL：http://nm.abbs.com.cn/weixin.php
Token“abbs

JS接口安全域名:这个域名下的就能调用微信开放的JS接口
域名：http://nm.abbs.com.cn

OpenID：用户向公众号发信息时接收到的，可以通过OpenID获取用户基本信息；每个用户对每个公众号有唯一的OpenID
UnionID：同一个微信开放平台帐号下的多个公众号、移动应用、网站等，用户的UnionID是相同的；UnionID通过OpenID获取
access_token：access_token是公众号的全局唯一票据，公众号调用各接口时都需使用access_token。通过传入appId和appsecret获取，地址：https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx63b9b3552595302d&secret=d822b155c98a85699f88180d286fe50d；正常情况下返回{"access_token":"vXQZZplfW6XndV6GT_SqUfehv5V2V8pAlbxhpXVmExV1Qlj8g0K0NzDSWGHDYL8LfjZSNrUGTNtrE2N2ZFOYF-sshZYxIRtlybxnEKLgc3A","expires_in":7200}这样的JSON格式



**验证消息真实性：
每次开发者接收用户消息的时候，微信都会带上三个参数（signature、timestamp、nonce）访问开发者设置的URL，开发者依然通过对签名的效验判断此条消息的真实性。效验方式与首次提交验证申请一致。 



**接受消息：

*接收普通消息：
当用户向公众号发送消息的时候，微信服务器会将内容的XML数据发送到开发者填写的URL上

文本消息：
 <xml>
 <ToUserName><![CDATA[toUser]]></ToUserName> 开发者微信号 
 <FromUserName><![CDATA[fromUser]]></FromUserName>  发送方帐号（一个OpenID） 
 <CreateTime>1348831860</CreateTime> 消息创建时间 （整型） 
 <MsgType><![CDATA[text]]></MsgType> 消息类型，text 
 <Content><![CDATA[this is a test]]></Content> 文本消息内容 
 <MsgId>1234567890123456</MsgId> 消息id，64位整型 
 </xml>

图片消息：
 <xml>
 <ToUserName><![CDATA[toUser]]></ToUserName>
 <FromUserName><![CDATA[fromUser]]></FromUserName>
 <CreateTime>1348831860</CreateTime>
 <MsgType><![CDATA[image]]></MsgType> 消息类型，image 
 <PicUrl><![CDATA[this is a url]]></PicUrl> 图片链接 
 <MediaId><![CDATA[media_id]]></MediaId> 图片消息媒体id，可以调用多媒体文件下载接口拉取数据。 
 <MsgId>1234567890123456</MsgId>
 </xml>

地理位置消息：
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[fromUser]]></FromUserName>
<CreateTime>1351776360</CreateTime>
<MsgType><![CDATA[location]]></MsgType> 消息类型，location 
<Location_X>23.134521</Location_X> 地理位置维度 
<Location_Y>113.358803</Location_Y> 地理位置经度 
<Scale>20</Scale> 地图缩放大小 
<Label><![CDATA[位置信息]]></Label> 地理位置信息 
<MsgId>1234567890123456</MsgId>
</xml> 

语音消息：略
视频消息：略
小视频消息：略

*关注/取消关注事件：
用户在关注与取消关注公众号时，微信会把这个事件推送到开发者填写的URL。方便开发者给用户下发欢迎消息或者做帐号的解绑。
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[FromUser]]></FromUserName>
<CreateTime>123456789</CreateTime>
<MsgType><![CDATA[event]]></MsgType> 消息类型，event 
<Event><![CDATA[subscribe]]></Event> 事件类型，subscribe(订阅)、unsubscribe(取消订阅) 
</xml>

*扫描带参数二维码事件：
两种情况：
1、用户未关注此公众号，点击关注后发送XML为
<xml><ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[FromUser]]></FromUserName>
<CreateTime>123456789</CreateTime>
<MsgType><![CDATA[event]]></MsgType> 消息类型，event 
<Event><![CDATA[subscribe]]></Event> 事件类型，subscribe 
<EventKey><![CDATA[qrscene_123123]]></EventKey> 事件KEY值，qrscene_为前缀，后面为二维码的参数值 
<Ticket><![CDATA[TICKET]]></Ticket> 二维码的ticket，可用来换取二维码图片 
</xml>
2、用户已关注此公众号发送XML为
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[FromUser]]></FromUserName>
<CreateTime>123456789</CreateTime>
<MsgType><![CDATA[event]]></MsgType>    消息类型，event 
<Event><![CDATA[SCAN]]></Event>     事件类型，SCAN 
<EventKey><![CDATA[SCENE_VALUE]]></EventKey> 事件KEY值，是一个32位无符号整数，即创建二维码时的二维码scene_id 
<Ticket><![CDATA[TICKET]]></Ticket> 二维码的ticket，可用来换取二维码图片
</xml>

*上报地理位置事件：
用户同意上报地理位置后，每次进入公众号会话时，都会在进入时上报地理位置，或在进入会话后每5秒上报一次地理位置，公众号可以在公众平台网站中修改以上设置。上报地理位置时，微信会将上报地理位置事件推送到开发者填写的URL。 
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[fromUser]]></FromUserName>
<CreateTime>123456789</CreateTime>
<MsgType><![CDATA[event]]></MsgType>    消息类型，event 
<Event><![CDATA[LOCATION]]></Event> 事件类型，LOCATION 
<Latitude>23.137466</Latitude> 地理位置纬度 
<Longitude>113.352425</Longitude> 地理位置经度 
<Precision>119.385040</Precision> 地理位置精度 
</xml>

*自定义菜单事件：
用户点击自定义菜单后，微信会把点击事件推送给开发者，请注意，点击菜单弹出子菜单，不会产生上报。
点击菜单拉取消息时的事件推送：
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[FromUser]]></FromUserName>
<CreateTime>123456789</CreateTime>
<MsgType><![CDATA[event]]></MsgType> 消息类型，event 
<Event><![CDATA[CLICK]]></Event> 事件类型，CLICK 
<EventKey><![CDATA[EVENTKEY]]></EventKey> 事件KEY值，与自定义菜单接口中KEY值对应 
</xml>
点击菜单跳转链接时的事件推送：
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[FromUser]]></FromUserName>
<CreateTime>123456789</CreateTime>
<MsgType><![CDATA[event]]></MsgType> 消息类型，event 
<Event><![CDATA[VIEW]]></Event>     事件类型，VIEW 
<EventKey><![CDATA[www.qq.com]]></EventKey> 事件KEY值，设置的跳转URL 
</xml>



**用户管理：

*用户分组管理：

创建分组：
http请求方式: POST（请使用https协议）
https://api.weixin.qq.com/cgi-bin/groups/create?access_token=ACCESS_TOKEN
POST数据格式：json
POST数据例子：{"group":{"name":"test"}}
注：跨域需要使用jquery的AJAX请求，并将类型指定为JSONP
成功返回：
{
    "group": {
        "id": 107,   //分组id，由微信分配 
        "name": "test"
    }
}

查询所有分组：
http请求方式: GET（请使用https协议）
https://api.weixin.qq.com/cgi-bin/groups/get?access_token=ACCESS_TOKEN
成功返回：
{
    "groups": [  //公众平台分组信息列表 
        {
            "id": 0,   //分组id，由微信分配 
            "name": "未分组",   //分组名字，UTF8编码 
            "count": 725  //分组内用户数量 
        }, 
        {
            "id": 1, 
            "name": "黑名单", 
            "count": 36
        }
        {
            "id": 104, 
            "name": "华东媒", 
            "count": 4
        }
    ]
}

查询用户所在分组：
通过用户的OpenID查询其所在的GroupID。
http请求方式: POST（请使用https协议）
https://api.weixin.qq.com/cgi-bin/groups/getid?access_token=ACCESS_TOKEN
POST数据格式：json
POST数据例子：{"openid":"od8XIjsmk6QdVTETa9jLtGWA6KBc"}
成功返回：
{
    "groupid": 102
}

修改分组名：
http请求方式: POST（请使用https协议）
https://api.weixin.qq.com/cgi-bin/groups/update?access_token=ACCESS_TOKEN
POST数据格式：json
POST数据例子：{"group":{"id":108,"name":"test2_modify2"}}
成功返回：
{"errcode": 0, "errmsg": "ok"}

移动用户分组：
http请求方式: POST（请使用https协议）
https://api.weixin.qq.com/cgi-bin/groups/members/update?access_token=ACCESS_TOKEN
POST数据格式：json
POST数据例子：{"openid":"oDF3iYx0ro3_7jD4HFRDfrjdCM58","to_groupid":108}
成功返回：
{"errcode": 0, "errmsg": "ok"}

批量移动用户分组：
http请求方式: POST（请使用https协议）
https://api.weixin.qq.com/cgi-bin/groups/members/batchupdate?access_token=ACCESS_TOKEN
POST数据格式：json
POST数据例子：{"openid_list":["oDF3iYx0ro3_7jD4HFRDfrjdCM58","oDF3iY9FGSSRHom3B-0w5j4jlEyY"],"to_groupid":108}
成功返回：
{"errcode": 0, "errmsg": "ok"}

*获取用户基本信息(UnionID机制)：
请注意，如果开发者有在多个公众号，或在公众号、移动应用之间统一用户帐号的需求，需要前往微信开放平台绑定公众号后，才可利用UnionID机制来满足上述需求。
http请求方式: GET
https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID
成功返回：
{
    "subscribe": 1,   //用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。 
    "openid": "o6_bmjrPTlm6_2sgVt7hMZOPfL2M",   //用户的标识，对当前公众号唯一 
    "nickname": "Band",   //用户的昵称 
    "sex": 1,   //用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 
    "language": "zh_CN",   //用户的语言，简体中文为zh_CN 
    "city": "广州",   //用户所在城市 
    "province": "广东",   //用户所在省份 
    "country": "中国",   //用户所在国家 
    "headimgurl":    "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",   //用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。 
   "subscribe_time": 1382694957,   //用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间
   "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"  //只有在开发者将公众号绑定到微信开放平台帐号后，才会出现该字段
}

*获取用户列表：
http请求方式: GET（请使用https协议）
https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
next_openid：第一个拉取的OPENID，不填默认从头开始拉取，应该是分页之类的会用到
成功返回：
{
    "total":2,  //关注该公众账号的总用户数 
    "count":2,  //拉取的OPENID个数，最大值为10000 
    "data":{"openid":["","OPENID1","OPENID2"]},  //列表数据，OPENID的列表 
    "next_openid":"NEXT_OPENID"  //拉取列表的后一个用户的OPENID；关注者列表已返回完时，则为空
}

*获取用户地理位置：
开通了上报地理位置接口的公众号，用户在关注后进入公众号会话时，会弹框让用户确认是否允许公众号使用其地理位置。弹框只在关注后出现一次，用户以后可以在公众号详情页面进行操作。用户同意上报地理位置后，每次进入公众号会话时，都会在进入时上报地理位置，上报地理位置以推送XML数据包到开发者填写的URL来实现。 
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[fromUser]]></FromUserName>  发送方帐号（一个OpenID） 
<CreateTime>123456789</CreateTime>  消息创建时间 （整型） 
<MsgType><![CDATA[event]]></MsgType>    消息类型，event 
<Event><![CDATA[LOCATION]]></Event>  事件类型，LOCATION 
<Latitude>23.137466</Latitude>  地理位置纬度 
<Longitude>113.352425</Longitude>  地理位置经度 
<Precision>119.385040</Precision>  地理位置精度 
</xml>



**自定义菜单管理：

*自定义菜单创建接口：
目前自定义菜单最多包括3个一级菜单，每个一级菜单最多包含5个二级菜单。一级菜单最多4个汉字，二级菜单最多7个汉字，多出来的部分将会以“...”代替。添加自定义菜单24小时后用户才能看到，可通过取消关注再关注立即生效
自定义菜单接口可实现多种类型按钮，如下：
1、click：点击推事件
用户点击click类型按钮后，微信服务器会通过消息接口推送消息类型为event 的结构给开发者（参考消息接口指南），并且带上按钮中开发者填写的key值，开发者可以通过自定义的key值与用户进行交互；
2、view：跳转URL
用户点击view类型按钮后，微信客户端将会打开开发者在按钮中填写的网页URL，可与网页授权获取用户基本信息接口结合，获得用户基本信息。
3、scancode_push：扫码推事件
用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后显示扫描结果（如果是URL，将进入URL），且会将扫码的结果传给开发者，开发者可以下发消息。
4、scancode_waitmsg：扫码推事件且弹出“消息接收中”提示框
用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后，将扫码的结果传给开发者，同时收起扫一扫工具，然后弹出“消息接收中”提示框，随后可能会收到开发者下发的消息。
5、pic_sysphoto：弹出系统拍照发图
用户点击按钮后，微信客户端将调起系统相机，完成拍照操作后，会将拍摄的相片发送给开发者，并推送事件给开发者，同时收起系统相机，随后可能会收到开发者下发的消息。
6、pic_photo_or_album：弹出拍照或者相册发图
用户点击按钮后，微信客户端将弹出选择器供用户选择“拍照”或者“从手机相册选择”。用户选择后即走其他两种流程。
7、pic_weixin：弹出微信相册发图器
用户点击按钮后，微信客户端将调起微信相册，完成选择操作后，将选择的相片发送给开发者的服务器，并推送事件给开发者，同时收起相册，随后可能会收到开发者下发的消息。
8、location_select：弹出地理位置选择器
用户点击按钮后，微信客户端将调起地理位置选择工具，完成选择操作后，将选择的地理位置发送给开发者的服务器，同时收起位置选择工具，随后可能会收到开发者下发的消息。
接口调用请求说明：
http请求方式：POST（请使用https协议） https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
click和view的请求示例：
 {
     "button":[  //一级菜单数组，个数应为1~3个 
     {  
          "type":"click",  //菜单的响应动作类型 
          "name":"今日歌曲",  //菜单标题，不超过16个字节，子菜单不超过40个字节 
          "key":"V1001_TODAY_MUSIC"  //菜单KEY值，用于消息接口推送，不超过128字节 (click类型必须)
      },
      {
           "name":"菜单",
           "sub_button":[  //二级菜单数组，个数应为1~5个 
           {    
               "type":"view",
               "name":"搜索",
               "url":"http://www.soso.com/"  //网页链接，用户点击菜单可打开链接，不超过256字节 
            },
            {
               "type":"view",
               "name":"视频",
               "url":"http://v.qq.com/"
            },
            {
               "type":"click",
               "name":"赞一下我们",
               "key":"V1001_GOOD"
            }]
       }]
 }
 其他新增按钮类型的请求示例：
 {
    "button": [
        {
            "name": "扫码", 
            "sub_button": [
                {
                    "type": "scancode_waitmsg", 
                    "name": "扫码带提示", 
                    "key": "rselfmenu_0_0", 
                    "sub_button": [ ]
                }, 
                {
                    "type": "scancode_push", 
                    "name": "扫码推事件", 
                    "key": "rselfmenu_0_1", 
                    "sub_button": [ ]
                }
            ]
        }, 
        {
            "name": "发图", 
            "sub_button": [
                {
                    "type": "pic_sysphoto", 
                    "name": "系统拍照发图", 
                    "key": "rselfmenu_1_0", 
                   "sub_button": [ ]
                 }, 
                {
                    "type": "pic_photo_or_album", 
                    "name": "拍照或者相册发图", 
                    "key": "rselfmenu_1_1", 
                    "sub_button": [ ]
                }, 
                {
                    "type": "pic_weixin", 
                    "name": "微信相册发图", 
                    "key": "rselfmenu_1_2", 
                    "sub_button": [ ]
                }
            ]
        }, 
        {
            "name": "发送位置", 
            "type": "location_select", 
            "key": "rselfmenu_2_0"
        }
    ]
}
成功返回：
{"errcode":0,"errmsg":"ok"}

*自定义菜单查询接口：
http请求方式：GET
https://api.weixin.qq.com/cgi-bin/menu/get?access_token=ACCESS_TOKEN
对应创建接口，正确的Json返回结果:
{"menu":{"button":[{"type":"click","name":"今日歌曲","key":"V1001_TODAY_MUSIC","sub_button":[]},{"type":"click","name":"歌手简介","key":"V1001_TODAY_SINGER","sub_button":[]},{"name":"菜单","sub_button":[{"type":"view","name":"搜索","url":"http://www.soso.com/","sub_button":[]},{"type":"view","name":"视频","url":"http://v.qq.com/","sub_button":[]},{"type":"click","name":"赞一下我们","key":"V1001_GOOD","sub_button":[]}]}]}}

*自定义菜单删除接口：
会一次性删除所有自定义菜单。
http请求方式：GET
https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=ACCESS_TOKEN
成功返回:
{"errcode":0,"errmsg":"ok"}

*自定义菜单事件推送：
点击菜单拉取消息时的事件推送：
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[FromUser]]></FromUserName>
<CreateTime>123456789</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[CLICK]]></Event>  事件类型，CLICK 
<EventKey><![CDATA[EVENTKEY]]></EventKey>  事件KEY值，与自定义菜单接口中KEY值对应 
</xml>

点击菜单跳转链接时的事件推送：
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[FromUser]]></FromUserName>
<CreateTime>123456789</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[VIEW]]></Event>  事件类型，VIEW 
<EventKey><![CDATA[www.qq.com]]></EventKey>  事件KEY值，设置的跳转URL 
</xml>

scancode_push：扫码推事件的事件推送：
<xml><ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>
<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>
<CreateTime>1408090502</CreateTime>
<MsgType><![CDATA[event]]></MsgType>  消息类型，event 
<Event><![CDATA[scancode_push]]></Event>  事件类型，scancode_push 
<EventKey><![CDATA[6]]></EventKey>  事件KEY值，由开发者在创建菜单时设定 
<ScanCodeInfo>  扫描信息 
    <ScanType><![CDATA[qrcode]]></ScanType>  扫描类型，一般是qrcode 
    <ScanResult><![CDATA[1]]></ScanResult>  扫描结果，即二维码对应的字符串信息 
</ScanCodeInfo>
</xml>

scancode_waitmsg：扫码推事件且弹出“消息接收中”提示框的事件推送：
<xml><ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>
<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>
<CreateTime>1408090606</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[scancode_waitmsg]]></Event>  事件类型，scancode_waitmsg 
<EventKey><![CDATA[6]]></EventKey>
<ScanCodeInfo>
    <ScanType><![CDATA[qrcode]]></ScanType>
    <ScanResult><![CDATA[2]]></ScanResult>
</ScanCodeInfo>
</xml>

pic_sysphoto：弹出系统拍照发图的事件推送：
<xml><ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>
<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>
<CreateTime>1408090651</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[pic_sysphoto]]></Event>  事件类型，pic_sysphoto 
<EventKey><![CDATA[6]]></EventKey>  事件KEY值，由开发者在创建菜单时设定 
<SendPicsInfo>  发送的图片信息 
    <Count>1</Count>  发送的图片数量 
    <PicList>  图片列表 
        <item>
            <PicMd5Sum><![CDATA[1b5f7c23b5bf75682a53e7b6d163e185]]></PicMd5Sum>  图片的MD5值，可用于验证接收到图片
        </item>
    </PicList>
</SendPicsInfo>
</xml>

pic_photo_or_album：弹出拍照或者相册发图的事件推送：
<xml><ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>
<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>
<CreateTime>1408090816</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[pic_photo_or_album]]></Event>  事件类型，pic_photo_or_album 
<EventKey><![CDATA[6]]></EventKey>
<SendPicsInfo>
<Count>1</Count>
<PicList>
<item>
<PicMd5Sum><![CDATA[5a75aaca956d97be686719218f275c6b]]></PicMd5Sum>
</item>
</PicList>
</SendPicsInfo>
</xml>

pic_weixin：弹出微信相册发图器的事件推送：
<xml><ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>
<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>
<CreateTime>1408090816</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[pic_weixin]]></Event>  事件类型，pic_weixin 
<EventKey><![CDATA[6]]></EventKey>
<SendPicsInfo>
<Count>1</Count>
<PicList>
<item>
<PicMd5Sum><![CDATA[5a75aaca956d97be686719218f275c6b]]></PicMd5Sum>
</item>
</PicList>
</SendPicsInfo>
</xml>

location_select：弹出地理位置选择器的事件推送：
<xml><ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>
<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>
<CreateTime>1408091189</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[location_select]]></Event>  事件类型，location_select 
<EventKey><![CDATA[6]]></EventKey>  事件KEY值，由开发者在创建菜单时设定 
<SendLocationInfo>      发送的位置信息 
<Location_X><![CDATA[23]]></Location_X>  X坐标信息 
<Location_Y><![CDATA[113]]></Location_Y>  Y坐标信息 
<Scale><![CDATA[15]]></Scale>  精度，可理解为精度或者比例尺、越精细的话 scale越高 
<Label><![CDATA[ 广州市海珠区客村艺苑路 106号]]></Label>  地理位置的字符串信息 
<Poiname><![CDATA[]]></Poiname>  朋友圈POI的名字，可能为空 
</SendLocationInfo>
</xml>



**发送消息：

*被动回复用户消息：
对于每一个POST请求，开发者在响应包（Get）中返回特定XML结构，对该消息进行响应（现支持回复文本、图片、图文、语音、视频、音乐）。请注意，回复图片等多媒体消息时需要预先上传多媒体文件到微信服务器，只支持认证服务号。 
如果接收到的消息无法处理，则需要回复空字符串或success；如果未回复任何内容或回复的数据异常，微信则会向用户发送“该公众号暂时无法提供服务，请稍后再试”

回复文本消息：
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[fromUser]]></FromUserName>
<CreateTime>12345678</CreateTime>
<MsgType><![CDATA[text]]></MsgType> 消息类型，text
<Content><![CDATA[你好]]></Content> 回复的消息内容（换行：在content中能够换行，微信客户端就支持换行显示） 
</xml>

回复图片消息：
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[fromUser]]></FromUserName>
<CreateTime>12345678</CreateTime>
<MsgType><![CDATA[image]]></MsgType> 消息类型：image 
<Image>
<MediaId><![CDATA[media_id]]></MediaId>     通过上传多媒体文件，得到的id。
</Image>
</xml>

回复图文消息：
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[fromUser]]></FromUserName>
<CreateTime>12345678</CreateTime>
<MsgType><![CDATA[news]]></MsgType> 消息类型：news
<ArticleCount>2</ArticleCount> 图文消息个数，限制为10条以内 
<Articles> 多条图文消息信息，默认第一个item为大图；注意，如果图文数超过10，则将会无响应 
<item>
<Title><![CDATA[title1]]></Title>  图文消息标题 
<Description><![CDATA[description1]]></Description>     图文消息描述 
<PicUrl><![CDATA[picurl]]></PicUrl> 图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200 
<Url><![CDATA[url]]></Url> 点击图文消息跳转链接 
</item>
<item>
<Title><![CDATA[title]]></Title>
<Description><![CDATA[description]]></Description>
<PicUrl><![CDATA[picurl]]></PicUrl>
<Url><![CDATA[url]]></Url>
</item>
</Articles>
</xml> 

*客服接口：暂略
当用户主动发消息给公众号的时候，微信将会把消息数据推送给开发者，开发者在48小时内可以调用客服消息接口，通过POST一个JSON数据包来发送消息给普通用户，在48小时内不限制发送次数。此接口主要用于客服等有人工消息处理环节的功能，方便开发者为用户提供更加优质的服务。

*高级群发接口：
可以针对不同的分组进行群发不同的内容

上传图文消息素材【订阅号与服务号认证后均可用】：
通过HTTP的POST方式提交到：https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=ACCESS_TOKEN
内容JSON：
{
   "articles": [  //图文消息，一个图文消息支持1到10条图文
         {
            "thumb_media_id":"qI6_Ze_6PtV7svjolgs-rN6stStuHIjs9_DidOHaj0Q-mwvBelOXCFZiq2OsIU-p",  //图文消息缩略图的media_id，可以在基础支持-上传多媒体文件接口中获得 
            "author":"xxx",  //图文消息的作者 （非必须）
             "title":"Happy Day",  //图文消息的标题 
             "content_source_url":"www.qq.com",  //在图文消息页面点击“阅读原文”后的页面 （非必须）
             "content":"content",  //图文消息页面的内容，支持HTML标签 
             "digest":"digest",  //图文消息的描述 （非必须）
             "show_cover_pic":"1"  //是否显示封面，1为显示，0为不显示 （非必须）
         },
         {
            "thumb_media_id":"qI6_Ze_6PtV7svjolgs-rN6stStuHIjs9_DidOHaj0Q-mwvBelOXCFZiq2OsIU-p",
            "author":"xxx",
             "title":"Happy Day",
             "content_source_url":"www.qq.com",
             "content":"content",
             "digest":"digest",
             "show_cover_pic":"0"
         }
   ]
}
提交成功返回：（错误时微信会返回错误码等信息，请根据错误码查询错误信息）
{
   "type":"news",
   "media_id":"CsEf3ldqkAYJAU6EJeIkStVDSvffUJ54vqbThMgplD-VJXXof6ctX5fI6-aYyUiQ",
   "created_at":1391857799
}

根据分组进行群发【订阅号与服务号认证后均可用】：
通过HTTP的POST方式提交到：https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN
图文消息：
{
   "filter":{  //用于设定图文消息的接收者 
      "is_to_all":false  //用于设定是否向全部用户发送，值为true或false。当为false时可设定group_id
      "group_id":"2"  //群发到的分组的group_id，参加用户管理中用户分组接口（非必须）
   },
   "mpnews":{  //用于设定即将发送的图文消息 
      "media_id":"123dsdajkasd231jhksad"  //用于群发的消息的media_id 
   },
    "msgtype":"mpnews"  //群发的消息类型，图文消息mpnews，文本消息text，语音voice，音乐music，图片image，视频video
}
文本：
{
   "filter":{
      "is_to_all":false
      "group_id":"2"
   },
   "text":{
      "content":"CONTENT"
   },
    "msgtype":"text"
}
图片：
{
   "filter":{
      "is_to_all":false
      "group_id":"2"
   },
   "image":{
      "media_id":"123dsdajkasd231jhksad"
   },
    "msgtype":"image"
}
其它：略
提交成功返回：（错误时微信会返回错误码等信息，请根据错误码查询错误信息）
{
   "errcode":0,
   "errmsg":"send job submission success",
   "msg_id":34182
}

根据OpenID列表群发【订阅号不可用，服务号认证后可用】：
通过HTTP的POST方式提交到：https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=ACCESS_TOKEN
图文消息：
{
   "touser":[  //填写图文消息的接收者，一串OpenID列表，OpenID最少个，最多10000个 
    "OPENID1",  //用户的OpenID
    "OPENID2"
   ],
   "mpnews":{  //用于设定即将发送的图文消息
      "media_id":"123dsdajkasd231jhksad"  //用于群发的图文消息的media_id 
   },
    "msgtype":"mpnews"  //群发的消息类型
}
文本：
{
   "touser":[
    "OPENID1",
    "OPENID2"
   ],
    "msgtype": "text",
    "text": { "content": "hello from boxer."}
}
其它：略
提交成功返回：（错误时微信会返回错误码等信息，请根据错误码查询错误信息）
{
   "errcode":0,
   "errmsg":"send job submission success",
   "msg_id":34182
}

删除群发【订阅号与服务号认证后均可用】：
通过HTTP的POST方式提交到：https://api.weixin.qq.com/cgi-bin/message/mass/delete?access_token=ACCESS_TOKEN
{
   "msg_id":30124  //发送出去的消息ID 
}
提交成功返回：（错误时微信会返回错误码等信息，请根据错误码查询错误信息）
{
   "errcode":0,
   "errmsg":"ok"
}

预览接口【订阅号与服务号认证后均可用】：
通过HTTP的POST方式提交到：https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=ACCESS_TOKEN
图文消息：
{
   "touser":"OPENID",  //接收消息用户对应该公众号的openid 
   "mpnews":{              
            "media_id":"123dsdajkasd231jhksad"     //用于群发的消息的media_id
             },
   "msgtype":"mpnews"  //群发的消息类型
}
文本：
{     
    "touser":"OPENID",
    "text":{           
           "content":"CONTENT"        //发送文本消息时文本的内容
           },     
    "msgtype":"text"
}
其它：略
提交成功返回：（错误时微信会返回错误码等信息，请根据错误码查询错误信息）
{
   "errcode":0,
   "errmsg":"send job submission success",
   "msg_id":34182
}

查询群发消息发送状态【订阅号与服务号认证后均可用】:
通过HTTP的POST方式提交到：https://api.weixin.qq.com/cgi-bin/message/mass/get?access_token=ACCESS_TOKEN
{
   "msg_id": "201053012"  //群发消息后返回的消息id 
}
提交成功返回：（错误时微信会返回错误码等信息，请根据错误码查询错误信息）
{
    "msg_id":201053012,
    "msg_status":"SEND_SUCCESS"
}

事件推送群发结果：
若群发任务提交成功，则在群发任务结束时，会向开发者在公众平台填写的开发者URL（callback URL）推送事件。
<xml>
<ToUserName><![CDATA[gh_3e8adccde292]]></ToUserName>
<FromUserName><![CDATA[oR5Gjjl_eiZoUpGozMo7dbBJ362A]]></FromUserName>
<CreateTime>1394524295</CreateTime>
<MsgType><![CDATA[event]]></MsgType>  消息类型，此处为event 
<Event><![CDATA[MASSSENDJOBFINISH]]></Event>  事件信息，此处为MASSSENDJOBFINISH 
<MsgID>1988</MsgID>  群发的消息ID 
<Status><![CDATA[sendsuccess]]></Status>  群发的结构，为“send success”或“send fail”或“err(num)”。但send success时，也有可能因用户拒收公众号的消息、系统错误等原因造成少量用户接收失败
<TotalCount>100</TotalCount>  group_id下粉丝数；或者openid_list中的粉丝数 
<FilterCount>80</FilterCount>  过滤（过滤是指特定地区、性别的过滤、用户设置拒收的过滤，用户接收已超4条的过滤）后，准备发送的粉丝数，原则上，FilterCount = SentCount + ErrorCount 
<SentCount>75</SentCount>  发送成功的粉丝数 
<ErrorCount>5</ErrorCount>  发送失败的粉丝数 
</xml>

*模板消息接口：暂略
模板消息仅用于公众号向用户发送重要的服务通知，只能用于符合其要求的服务场景中，如信用卡刷卡通知，商品购买成功通知等。不支持广告等营销类消息以及其它所有可能对用户造成骚扰的消息。 



**素材管理：暂略
图片大小不超过2M，支持bmp/png/jpeg/jpg/gif格式，语音大小不超过5M，长度不超过60秒，支持mp3/wma/wav/amr格式

*新增临时素材：
对于临时素材，每个素材（media_id）会在开发者上传或粉丝发送到微信服务器3天后自动删除
http请求方式: POST/FORM，需使用https提交到https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE
ACCESS_TOKEN为获取到的access_token，type分别有image、voice、video和thumb（主要用于视频与音乐格式的缩略图）
<form action="https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE" method="POST" enctype="multipart/form-data">
    <input type="file" required="true" data-type="file" method="POST" name="media">
</form>
成功返回：
{"type":"TYPE","media_id":"MEDIA_ID","created_at":123456789}

*获取临时素材:
http请求方式: GET,https调用:https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID

*新增永久素材：
永久素材的数量是有上限的，请谨慎新增。图文消息素材和图片素材的上限为5000，其他类型为1000

*新增永久图文素材：
http请求方式: POST：https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=ACCESS_TOKEN
{
  "articles": [{
       "title": TITLE,
       "thumb_media_id": THUMB_MEDIA_ID,  //图文消息的封面图片素材id（必须是永久mediaID） 
       "author": AUTHOR,
       "digest": DIGEST,  //图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空 
       "show_cover_pic": SHOW_COVER_PIC(0 / 1),  //是否显示封面，0为false，即不显示，1为true，即显示
       "content": CONTENT,  //图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS 
       "content_source_url": CONTENT_SOURCE_URL  //图文消息的原文地址，即点击“阅读原文”后的URL 
    },
    //若新增的是多图文素材，则此处应还有几段articles结构
 ]
}
返回：
{
   "media_id":MEDIA_ID
}



**帐号管理：

*生成带参数的二维码：
获取带参数的二维码的过程包括两步，首先创建二维码ticket，然后凭借ticket到指定URL换取二维码。 

创建二维码ticket：
每次创建二维码ticket需要提供一个开发者自行设定的参数（scene_id）
临时二维码请求说明：
http请求方式: POST
URL: https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=TOKEN
POST数据格式：json
POST数据例子：
{
"expire_seconds": 1800,  //该二维码有效时间，以秒为单位。 最大不超过1800
"action_name": "QR_SCENE",  //二维码类型，QR_SCENE临时,QR_LIMIT_SCENE永久,QR_LIMIT_STR_SCENE永久的字符串参数值
"action_info": {  //二维码详细信息 
    "scene": {
        "scene_id": 123  //场景值ID，临时二维码时为32位非0整型，永久二维码时最大值为100000（目前参数只支持1-100000）
        }
    }
}
永久二维码请求说明：
http请求方式: POST
URL: https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=TOKEN
POST数据格式：json
POST数据例子：{"action_name": "QR_LIMIT_SCENE", "action_info": {"scene": {"scene_id": 123}}}
或者也可以使用以下POST数据创建字符串形式的二维码参数：{"action_name": "QR_LIMIT_STR_SCENE", "action_info": {"scene": {"scene_str": "123"}}}  //scene_str场景值ID（字符串形式的ID），字符串类型，长度限制为1到64，仅永久二维码支持此字段
正确的Json返回结果：
{
"ticket":"gQH47joAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2taZ2Z3TVRtNzJXV1Brb3ZhYmJJAAIEZ23sUwMEmm3sUw==",  //获取的二维码ticket，凭借此ticket可以在有效时间内换取二维码
"expire_seconds":60,  //二维码的有效时间，以秒为单位。最大不超过1800
"url":"http:\/\/weixin.qq.com\/q\/kZgfwMTm72WWPkovabbI"  //二维码图片解析后的地址，开发者可根据该地址自行生成需要的二维码图片
}

通过ticket换取二维码：
HTTP GET请求（请使用https协议）
https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=TICKET  //TICKET记得进行UrlEncode
成功返回：
ticket正确情况下，http 返回码是200，是一张图片，可以直接展示或者下载

*长链接转短链接接口：
http请求方式: POST
https://api.weixin.qq.com/cgi-bin/shorturl?access_token=ACCESS_TOKEN
参数说明：
action ： 此处填long2short，代表长链接转短链接 
long_url ： 需要转换的长链接，支持http://、https://、weixin://wxpay 格式的url 
成功返回：
{"errcode":0,"errmsg":"ok","short_url":"http:\/\/w.url.cn\/s\/AvCo6Ih"}




<script>
*****JS-SDK**********************************************************************
一、绑定域名：在公众平台绑定好需要使用JSSDK的域名，此域名下的各个子页面才能使用JSSDK
二、引入JS文件：http://res.wx.qq.com/open/js/jweixin-1.0.0.js
三、通过config接口注入权限验证配置
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
四、通过ready接口处理成功验证
wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
五、通过error接口处理失败验证
wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});

基础接口：
判断当前客户端版本是否支持指定JS接口：
wx.checkJsApi({
  jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  success: function(res) {
      // 以键值对的形式返回，可用的api值true，不可用为false
      // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
});

分享接口：
获取“分享到朋友圈”按钮点击状态及自定义分享内容接口：
wx.onMenuShareAppMessage({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});

获取“分享给朋友”按钮点击状态及自定义分享内容接口：
wx.onMenuShareAppMessage({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});

获取“分享到QQ”按钮点击状态及自定义分享内容接口：
wx.onMenuShareQQ({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    success: function () { 
       // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
       // 用户取消分享后执行的回调函数
    }
});

获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口：
wx.onMenuShareWeibo({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    success: function () { 
       // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});

图像接口：
拍照或从手机相册中选图接口：
wx.chooseImage({
    success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    }
});

预览图片接口：
wx.previewImage({
    current: '', // 当前显示的图片链接
    urls: [] // 需要预览的图片链接列表
});

上传图片接口：
wx.uploadImage({
    localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
        var serverId = res.serverId; // 返回图片的服务器端ID
    }
});
备注：上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id

下载图片接口：
wx.downloadImage({
    serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
        var localId = res.localId; // 返回图片下载后的本地ID
    }
});

音频接口：
开始录音接口：
wx.startRecord();

停止录音接口：
wx.stopRecord({
    success: function (res) {
        var localId = res.localId;
    }
});

监听录音自动停止接口：
wx.onVoiceRecordEnd({
    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
    complete: function (res) {
        var localId = res.localId; 
    }
});

播放语音接口：
wx.playVoice({
    localId: '' // 需要播放的音频的本地ID，由stopRecord接口获得
});

暂停播放接口：
wx.pauseVoice({
    localId: '' // 需要暂停的音频的本地ID，由stopRecord接口获得
});

停止播放接口：
wx.stopVoice({
    localId: '' // 需要停止的音频的本地ID，由stopRecord接口获得
});

监听语音播放完毕接口：
wx.onVoicePlayEnd({
    success: function (res) {
        var localId = res.localId; // 返回音频的本地ID
    }
});

上传语音接口：
wx.uploadVoice({
    localId: '', // 需要上传的音频的本地ID，由stopRecord接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
        var serverId = res.serverId; // 返回音频的服务器端ID
    }
});
备注：上传语音有效期3天，可用微信多媒体接口下载语音到自己的服务器，此处获得的 serverId 即 media_id

下载语音接口：
wx.downloadVoice({
    serverId: '', // 需要下载的音频的服务器端ID，由uploadVoice接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
        var localId = res.localId; // 返回音频的本地ID
    }
});

智能接口：
识别音频并返回识别结果接口：
wx.translateVoice({
   localId: '', // 需要识别的音频的本地Id，由录音相关接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
        alert(res.translateResult); // 语音识别的结果
    }
});

设备信息：
获取网络状态接口：
wx.getNetworkType({
    success: function (res) {
        var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
    }
});

地理位置：
使用微信内置地图查看位置接口：
wx.openLocation({
    latitude: 0, // 纬度，浮点数，范围为90 ~ -90
    longitude: 0, // 经度，浮点数，范围为180 ~ -180。
    name: '', // 位置名
    address: '', // 地址详情说明
    scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
});

获取地理位置接口：
wx.getLocation({
    success: function (res) {
        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        var speed = res.speed; // 速度，以米/每秒计
        var accuracy = res.accuracy; // 位置精度
    }
});

界面操作：
隐藏右上角菜单接口：
wx.hideOptionMenu();

显示右上角菜单接口：
wx.showOptionMenu();

关闭当前网页窗口接口：
wx.closeWindow();

批量隐藏功能按钮接口：
wx.hideMenuItems({
    menuList: [] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
});

批量显示功能按钮接口：
wx.showMenuItems({
    menuList: [] // 要显示的菜单项，所有menu项见附录3
});

隐藏所有非基础按钮接口：
wx.hideAllNonBaseMenuItem();

显示所有功能按钮接口：
wx.showAllNonBaseMenuItem();

微信扫一扫：
调起微信扫一扫接口：
wx.scanQRCode({
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res) {
      var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
    }
});

微信小店：
跳转微信商品页接口：
wx.openProductSpecificView({
    productId: '', // 商品id
    viewType: '' // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
});

微信卡券：
调起适用于门店的卡券列表并获取用户选择列表：
wx.chooseCard({
    shopId: '', // 门店Id
    cardType: '', // 卡券类型
    cardId: '', // 卡券Id
    timestamp: 0, // 卡券签名时间戳
    nonceStr: '', // 卡券签名随机串
    signType: '', // 签名方式，默认'SHA1'
    cardSign: '', // 卡券签名，详见附录4
    success: function (res) {
        var cardList= res.cardList; // 用户选中的卡券列表信息
    }
});

批量添加卡券接口：
wx.addCard({
    cardList: [{
        cardId: '',
        cardExt: ''
    }], // 需要添加的卡券列表
    success: function (res) {
        var cardList = res.cardList; // 添加的卡券列表信息
    }
});

查看微信卡包中的卡券接口：
wx.openCard({
    cardList: [{
        cardId: '',
        code: ''
    }]// 需要打开的卡券列表
});

微信支付：
发起一个微信支付请求：
wx.chooseWXPay({
    timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    nonceStr: '', // 支付签名随机串，不长于 32 位
    package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
    signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    paySign: '', // 支付签名
    success: function (res) {
        // 支付成功后的回调函数
    }
});
备注：prepay_id 通过微信支付统一下单接口拿到，paySign 采用统一的微信支付 Sign 签名生成方法，注意这里 appId 也要参与签名，appId 与 config 中传入的 appId 一致，即最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。


</script>