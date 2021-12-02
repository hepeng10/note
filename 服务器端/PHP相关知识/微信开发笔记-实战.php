<?php
微信开发中curl的使用是基础
// curl的几个重要函数
curl_init();  //初始化一个curl会话
curl_setopt();  //设置curl传输选项
curl_exec();  //执行一个curl会话
curl_close();  //关闭一个curl会话
// curl_setopt()的选项
选项  作用  类型  应用场景
CURLOPT_URL  需要获取的URL地址  string  接口地址
CURLOPT_RETURNTRANSFER  将curl_exec()获取的信息以文件流的形式返回，而不是直接输出  boll  需要解析返回文件
CURLOPT_POST  以POST方式请求，同表单提交  bool  模拟POST请求
CURLOPT_POSTFIELDS  POST方式发送文件，文件名前需加@符  string或array  设置POST数据
CURLOPT_REFERER  HTTP请求中'Referer:'的内容  string  模拟请求来源
CURLOPT_HEADER  启动时会将头文件的信息作为数据流输出  bool  代码调试
CURLOPT_SSL_VERIFYHOST  检查SSL证书是否存在公用名  integer  非SAE模拟HTTPS时需打开
CURLOPT_SSL_VERIFYPEER  验证HTTPS证书是否有效  bool  非SAE模拟HTTPS时需打开
CURLOPT_COOKIE  设置HTTP请求中'Cookie:'内容  string  模拟cookie
CURLOPT_COOKIEFILE  包含cookie数据的文件名  string  模拟cookie
CURLOPT_COOKIEJAR  连接结束后保存cookie信息的文件  string  模拟cookie
CURLOPT_PROXY  HTTP代理通道  string  刷票
CURLOPT_USERAGENT  模拟浏览器信息  string  模拟微信浏览器访问

// curl模拟GET
$ci=curl_init();  //初始化
$url='http://www.baidu.com';  //设置抓取URL地址
curl_setopt($ci,CURLOPT_URL,$url);  //GET方式抓去URL
curl_exec($ch);  //执行
curl_close($ch);  //关闭
以上代码就会模拟GET访问baidu，从而浏览器跳转到百度地址

// curl处理GET数据获取access_token
$appid='xxx';  //微信APPID
$secret='xxx';  //微信secret
$url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$secret}";  //获取access_token接口
$ci=curl_init();
curl_setopt($ci,CURLOPT_URL,$url);
curl_setopt($ci,CURLOPT_RETURNTRANSFER,1);  //以文件流方式输出
$res=curl_exec($ci);  //将文件保存到变量中，成功返回json格式字符串：{"access_token":"xxx","expires_in":7200}
$oJSON=json_decode($res);  //JSON解析
$access_token=$oJSON->access_token;  //获取access_token
echo $access_token;

// curl模拟POST请求
$flight='CZ3109';  //查询航班号
$post="queryType=flightNum&flightNum={$flight}";  //POST提交内容
$url='http://xxx.xxx.xxx/xxx';  //提交地址
$ci=curl_init();
curl_setopt($ci,CURLOPT_URL,$url);
curl_setopt($ci,CURLOPT_REFERER,'http://xxx.xxx.xxx');  //模拟来源，有些网站会限制提交来源
curl_setopt($ci,CURLOPT_POST,1);  //设置为1表示POST提交
curl_setopt($ci,CURLOPT_POSTFIELDS,$post);  //POST内容
curl_exec();
curl_close($ci);

// curl模拟POST上传文件
$post=array('filename'=>'@aa.jpg');  //POST提交内容
$url='http://xxx.xxx.xx/up.php';  //上传地址
$ci=curl_init();
curl_setopt($ci,CURLOPT_URL,$url);
curl_setopt($ci,CURLOPT_POST,1);
curl_setopt($ci,CURLOPT_POSTFIELDS,$post);  //POST提交内容
curl_exec($ci);
curl_close($ci);
var_dump($_FILES);  //上传文件成功后会返回一个二维数组

// memcache缓存access_token
$mi=memcache_init();  //初始化缓存
$token=memcache_get($mi,'token');  //获取token
if ($token) {
    $appid='xxx';
    $secret='xxx';
    $url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$secret}";
    $ci=curl_init();
    curl_setopt($ci,CURLOPT_URL,$url);
    curl_setopt($ci,CURLOPT_RETURNTRANSFER,1);
    $res=curl_exec($ci);
    $oJSON=json_decode($a);
    $access_token=$oJSON->access_token;
    memcache_set($mi,'token',$access_token,0,7000);  //缓存access_token为token，过期时间7000s
    $token=$access_token;
}
可以将缓存和获取token封装成一个函数，在别的文件中引入。ThinkPHP中可使用S()函数来缓存



// 自定义菜单
分为click类型和view类型。click类型微信会推送一个含有菜单按钮key值的事件给开发者；view类型就是个url跳转链接

// 创建自定义菜单
include('token.php');
$post='
 {
     "button":[
     {  
          "type":"click",
          "name":"今日歌曲",
          "key":"V1001_TODAY_MUSIC"
      },
      {
           "name":"菜单",
           "sub_button":[
           {    
               "type":"view",
               "name":"搜索",
               "url":"http://www.soso.com/"
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
 }';  //创建菜单
$url="https://api.weixin.qq.com/cgi-bin/menu/create?access_token={$token}";
$ci=curl_init();
curl_setopt($ci,CURLOPT_URL,$url);
curl_setopt($ci,CURLOPT_POST,1);
curl_setopt($ci,CURLOPT_POSTFIELDS,$post);
curl_setopt($ci,CURLOPT_SSL_VERIFYPEER,false);  //因为是https请求，非SAE环境可能出现失败，需要加上此设置
curl_setopt($ci,CURLOPT_SSL_VERIFYHOST,false);  //非SAE环境可能出现失败，需要加上此设置
curl_exec($ci);
curl_close($ci);

// 自定义菜单删除
如果更改自定义菜单没效果，那就删除再创建试试吧
include('token.php');
$url="https://api.weixin.qq.com/cgi-bin/menu/delete?access_token={$token}";
$ci=curl_init();
curl_setopt($ci,CURLOPT_URL,$url);
curl_exec($ci);
curl_close($ci);

// click类型菜单操作；使用开发文档中的XML列子
define('TOKEN','weixin');
$weichatObj=new wechatCallbackapiTest();
$vechatObj->valid();
$wechatObj->responseMsg();
// 通过官方的wx_sample.php修改
class wechatCallbackapiTest{
    ...
    // 解析用户点击菜单微信推送的XML信息并回复
    public function responseMsg(){
        $postStr=$GLOBALS['HTTP_RAW_POST_DATA'];
        if (!empty($postStr)) {
            // 使用simplexml_load_string解析XML
            $postObj=simplexml_load_string($postStr,'SimpleXMLElement',LIBXML_NOCDATA);
            $fromUsername=$postObj->FromUserName;
            $toUsername=$postObj->ToUserName;
            $keyword=trim($postObj->Content);
            $msgType=$postObj->MsgType;
            $event=$postObj->Event;
            $eventKey=$postObj->EventKey;
            $time=time();
            $textTpl="<xml>
                        <ToUserName><![CDATA[%s]></ToUserName>
                        <FromUserName><![CDATA[%s]></FromUserName>
                        <CreateTime>%s</CreateTime>
                        <MsgType><![CDATA[%s]></MsgType>
                        <Content><![CDATA[%s]></Content>
                        <FuncFlag>0</FuncFlag>
                        </xml>";
            // 判断是否为自定义菜单点击事件
            if ($msgType=='event' && $event=='CLICK') {
                // 自定义key可以用任意字符串，当然可以更简短
                if ($eventKey=='V1001_TODAY_MUSIC') {
                    $con='周杰伦 - 以父之名';
                }elseif ($eventKey=='V1001_TODAY_SINGER') {
                    $con='周杰伦，港台男歌手';
                }elseif ($eventKey=='V1001_GOOD') {
                    $con='谢谢你的赞';
                }
                $msgType='text';
                // 使用sprintf()将模版textTpl中的%s替换为自定义内容
                $resultStr=sprintf($textTpl,$fromUsername,$toUsername,$time,$msgType,$contentStr);
                // 输出内容返回给微信完成回复
                echo $resultStr;
            }else{
                echo 'Input sonthing...';
            }
        }else{
            echo '';  //输出空表示什么也不做
            exit;
        }
    }
    ...
}



// 上传多媒体文件
include('token.php');
$ci=curl_init();
$post=array('file'=>'@mov.mp4');
$url="https://api.weixin.qq.com/cgi-bin/media/upload?access_token={$token}&type=video";  //type=video这里设置不同的类型
curl_setopt($ci,CURLOPT_URL,$url);
curl_setopt($ci,CURLOPT_POST,1);
curl_setopt($ci,CURLOPT_POSTFIELDS,$post);
curl_setopt($ci,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ci,CURLOPT_SSL_VERIFYPEER,false);  //因为是https请求，非SAE环境可能出现失败，需要加上此设置
curl_setopt($ci,CURLOPT_SSL_VERIFYHOST,false);  //非SAE环境可能出现失败，需要加上此设置
$res=curl_exec($ci);
$oJSON=json_decode($res);
$media_id=$oJSON->media_id;
curl_close($ci);

// 下载多媒体文件
$media="https://api.weixin.qq.com/cgi-bin/media/get?access_token={$token}&media_id={$media_id}";
$file=file_get_contents($media);  //获取文件
$fname='xxx.jpg';
file_put_contents($fname,$file);  //保存文件



// 获取用户基本信息
include('token.php');
$url="https://api.weixin.qq.com/cgi-bin/user/info?access_token={$token}&openid={$fromUsername}";
$ci=curl_init();
curl_setopt($ci,CURLOPT_URL,$url);
curl_setopt($ci,CURLOPT_RETURNTRANSFER,1);
$rs=curl_exec($ci);
$oJSON=json_decode($rs);
$nickname=$oJSON->nickname;  //获取昵称
$image=$oJSON->headimgurl;  //获取头像
$smallimage=substr($image,0,-1).'132';  //转换小头像
$file=file_get_contents($smallimage);  //获取远程，防盗链
$headname=time().'.jpg';
file_put_contents($headname, $file);  //保存头像
$sql="INSERT INTO `user` (`openid`,`nickname`,`head_img`) VALUES ('{$fromUsername}','{$nickname}','{$headname}'";



// 分场景二维码
可以通过高级接口生成带参数的二维码，参数就是scene_id，用户可以通过扫描生成的二维码关注公众号，当用户扫描这类二维码关注的时候会收到scene_id，从而通过不同的scene_id来判断用户是通过哪种途径扫描二维码关注的（比如在网站、名片、杂志上投放不同scene_id的二维码）。主要用于统计分析来辅助推广