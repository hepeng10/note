import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

export default class Touchable extends Component {
    static navigationOptions = {
      title: 'Touchable',
    };

    _onPressButton() {
        console.log('啊啊啊啊啊');
    }
    
    render() {
        return (
            <View>
                {/* TouchableHighlight 在用户按下时会变暗。此组件加了 onPress 属性才会有特效 */}
                <TouchableHighlight onPress={this._onPressButton}>
                    <Text style={styles.text}>TouchableHighlight-变暗</Text>
                </TouchableHighlight>

                {/* TouchableNativeFeedback 在用户放开时会有波纹效果 */}
                <TouchableNativeFeedback
                    onPress={this._onPressButton}
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                    {/* 不能直接使用 Text 组件，需要使用 View 组件才有特效 */}
                    <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
                        <Text style={styles.text}>TouchableNativeFeedback-波纹效果</Text>
                    </View>
                </TouchableNativeFeedback>

                {/* TouchableOpacity 在用户按下时会半透明 */}
                <TouchableOpacity onPress={this._onPressButton}>
                    <Text style={styles.text}>TouchableOpacity-半透明</Text>
                </TouchableOpacity>

                {/* TouchableWithoutFeedback 无特效按钮 */}
                <TouchableWithoutFeedback onPress={this._onPressButton}>
                    <Text style={styles.text}>TouchableWithoutFeedback-无特效</Text>
                </TouchableWithoutFeedback>

                {/* 长按：将 onPress 改为 onLongPress 即可 */}
                <TouchableNativeFeedback
                    onLongPress={this._onPressButton}
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                    <View style={{width: 200, height: 100, backgroundColor: 'white'}}>
                        <Text style={styles.text}>onLongPress-长按</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
    }
});