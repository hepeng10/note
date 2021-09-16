import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class OtherScreen extends Component {
    static navigationOptions = {
      title: 'Other Screen',
    };
    render() {
        console.log(this.props);
        const { name } = this.props.navigation.state.params;
        return <View><Text>OtherScreen. 接收参数 name -> {name}</Text></View>
    }
}