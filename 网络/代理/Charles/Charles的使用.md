# Android 中代理 https 请求的方式
按照网上的配置后，Android 中还是不能正常代理 https 请求，目前发现个解决方法是：
在 Charles 中，选择 Help -> SSL Proxying -> Save Charls Root Certificate，在保存的时候格式选择 .cer 后缀的文件。
然后将文件传到手机上，安装 CA 证书选择后进行安装。
最后重启下手机和 Charles 再测试，之前测试一直不通过就是没重启手机，重启后就可以了。
