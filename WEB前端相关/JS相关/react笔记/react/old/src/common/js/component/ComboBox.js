import React from 'react';
import {BFDSelect} from 'antd-ui';


class ComboBox extends React.Component{
	render(){
		console.log(this.props);
		const comboboxConfig = this.props;
		var options = comboboxConfig.dataProvider.map(function(itemObj, index){
				return (<Option key={index} value={itemObj[comboboxConfig.dataField]}>{itemObj[comboboxConfig.labelField]}</Option>);
		});
		return (<BFDSelect size="large"  placeholder="请选择" style={{width: 200, marginRight: 10}} defaultValue={comboboxConfig.dataProvider[0][comboboxConfig.dataField]} {...this.props}>{options}</BFDSelect>);
	}
}

module.exports = ComboBox