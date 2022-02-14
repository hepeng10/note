小程序分享朋友圈目前的做法一般都是保存一个带有小程序二维码的海报到本地，网上也有不少相关文章，但是别人的不如自己的，这里记录一下自己生成海报保存到本地的方法。

本来一开始打算使用离屏 canvas 的，结果搞了半天发现小程序的离屏 canvas 和 通过 canvas 标签获取的有很多不同，简直就是大坑，最后使用了 canvas 标签，然后定位到很远的地方就行。

二维码设计的圆形，实现也很简单，画一个圆到二维码的位置，然后 clip 一下，再画二维码就行。

```jsx
  <Canvas
    className={styles.shareCanvas}
    canvasId="share"
    id="share"
    style={{ width: w, height: h }}
  ></Canvas>
```
```js

// 分享海报长度坐标等定义
// 海报的宽高
const w = 750;
const h = 1232;
// 二维码的边长
const qrCodeSide = 234;
// 二维码圆心位置
const qrCenter = {
  x: 381,
  y: 962
};



  // 保存图片，使用 canvas 绘制
  const saveImg = async () => {
    // 创建canvas对象
    const cxt = Taro.createCanvasContext('share');
    // 绘制背景
    cxt.drawImage(posterImg, 0, 0, w, h);
    // 绘制圆形
    cxt.arc(qrCenter.x, qrCenter.y, qrCodeSide / 2, 0, 2 * Math.PI);
    // 设置裁剪，下面绘制二维码就会裁剪在圆形上
    cxt.clip();
    // 绘制二维码
    cxt.drawImage(qrCode, 264, 845, qrCodeSide, qrCodeSide);
    cxt.draw();
    // 延迟执行才能绘制成功
    setTimeout(() => {
      Taro.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: w,
        canvasId: 'share',
        fileType: 'jpg',
        success(res) {
          setTimeout(() => {
            Taro.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success() {
                showToast('已保存到本地相册');
              }
            });
          }, 300);
        }
      });
    }, 300);
  };
```
