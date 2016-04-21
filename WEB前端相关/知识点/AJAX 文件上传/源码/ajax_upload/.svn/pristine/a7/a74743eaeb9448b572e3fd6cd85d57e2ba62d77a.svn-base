var express = require('express');
var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var fs = require('fs');

router.all('/', function (req, res) {
    res.sendFile('../public/index.html');
});

router.post('/upload', multipartMiddleware, function(req, res) {
    console.log(req.body);
    console.log(req.files);

    // 删除临时文件
    fs.unlink(req.files.myfile.path);

    res.send("upload success!");
});

router.post('/upload2', multipartMiddleware, function(req, res) {
    console.log(req.body);
    console.log(req.files);

    // 实际编程时，一般要将临时文件移动到目标位置，之后删除临时文件
    // 课程中为简化操作，直接将临时文件当成目标文件
    var fpath = req.files.myfile.path;
    var fname = fpath.substr(fpath.lastIndexOf('\\') + 1);

    setTimeout(function() {
        var ret = ["<script>",
            "window.parent.uploadFinished('" + fname + "');",
            "</script>"];
        res.send(ret.join(""));
    }, 3000);

});

router.post('/upload3', multipartMiddleware, function(req, res) {
    console.log(req.body);
    console.log(req.files);

    // 实际编程时，一般要将临时文件移动到目标位置，之后删除临时文件
    // 课程中为简化操作，直接将临时文件当成目标文件
    var fpath = req.files.myfile.path;
    var fname = fpath.substr(fpath.lastIndexOf('\\') + 1);

    res.json({fname: fname});
});

module.exports = router;