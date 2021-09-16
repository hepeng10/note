# antd 中自适应不换行
antd 中有时会遇到一列的内容会很多，但是产品又不想换行，而希望自适应宽度，如果内容超出了一行就显示省略号。
修改步骤如下：
1、给 antd 的 table 添加 table-layout 样式
```less
:global {
  .ant-table {
    table {
      table-layout: fixed;
    }
}
```
2、给自适应的列添加样式
```jsx
{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    render: v => <span title={v} className={style.ellipsis}>{v || '--'}</span>
},
```
```less
.ellipsis {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 90%;
    line-height: 1.5;
}
```
除了自适应的列以外，其它列都加上 width 定宽更好。