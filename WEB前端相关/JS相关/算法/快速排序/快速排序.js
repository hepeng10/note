对 12  5  37  6  22  40 进行快速排序：
1、找到基准点：数据中的中间那个，这里是37或6，我们取37
2、进行遍历，把小于基准点的数放到左边，大于的放到右边，得出：12  5  6  22  37  40
3、从基准点左右两边，分别再找出基准点进行排序：
    左边 12  5  6  22 得到基准点5
    右边 40 不再排序
4、左边通过2步骤排序后得到：5  12  6  22  37  40
5、再对排序后的 12  6  22 进行基准点排序，得到：5  6  12  22  37  40
6、对排序后的 12 22 再进行一次排序，这里位置不变，得到最后结果：5 6 12 22 37 40

总结步骤：
1、找一个基准点
2、建立两个数组，分别存储左边和右边的数组
3、利用递归进行下次比较
function quickSort(arr){
    if(arr.length<=1){  //数组长度小于等于1，则不用排序，返回结果
        return arr;
    }
    var num=Math.floor(arr.length/2);  //找到基准点
    var numValue=arr.splice(num,1);  //取出基准点
    var left=[];
    var right=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i]<numValue){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([numValue],quickSort(right));  //对左边进行递归排序的结果+基准点+对右边进行递归排序的结果，就是排序完成的结果，返回
}
alert(quickSort([12,5,37,6,22,40]));