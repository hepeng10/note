import React from 'react';
import ReactDOM from 'react-dom';

var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach((product)=>{
      // 对用户输入数据进行过滤
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  // 用户输入内容时调用的函数，用来修改父级state
  handleChange: function() {
    // 通过this.props来调用父级传入的回调函数
    this.props.onUserInput(
      // 通过 this.refs.ref值 获取到下面的设置了ref属性的DOM节点
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },
  render: function() {
    return (
      <form>
        {/*输入框中，绑定了filterText，那么只有当filterText改变，view才会改变。如果在用户输入的时候，不更新filterText，那么view也就不会更新，从而产生无法输入数据的感觉*/}
        <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange} />
        <p>
          {/*获取父组件传入的state。ref属性：给这个DOM元素一个名字，在此组件的其它地方，就可以通过 this.refs.ref值 获取到这个DOM节点*/}
          <input type="checkbox" checked={this.props.inStockOnly} ref="inStockOnlyInput" onChange={this.handleChange} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

var FilterableProductTable = React.createClass({
  // 通过分析，这两个数据是属于state的（会改变，并且不依赖于其它数据）
  getInitialState(){
    return {
      filterText:'',
      inStockOnly:false
    }
  },
  // 创建一个回调函数，用来改变state数据
  handleUserInput(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },
  render: function() {
    return (
      <div>
        {/*向子组件传入state数据，并传入回调函数onUserInput*/}
        <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onUserInput={this.handleUserInput} />
        <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
});


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);