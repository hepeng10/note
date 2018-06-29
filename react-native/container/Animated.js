import React, { Component } from 'react';
import { Animated, View, Text, Easing } from 'react-native';

// 创建一个动画组件
class FadeInView extends Component {
    static navigationOptions = {
        title: 'Animated',
    };

    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),  // 透明度初始值设为0
        };
    }
    
    componentDidMount() {
        Animated.timing(                              // 随时间变化而执行的动画类型
            this.state.fadeAnim,                      // 动画中的变量值
            // 动画配置
            {
                toValue: 1,                           // 透明度最终变为1，即完全不透明
                easing: Easing.ease,  // 动画类型
                duration: 2000,  // 持续时间
                delay: 1000,  // 延迟
            }
        ).start();                                    // 开始执行动画
    }

    render() {
        return (
            <Animated.View                            // 可动画化的视图组件
              style={{
                ...this.props.style,
                opacity: this.state.fadeAnim,          // 将透明度指定为动画变量值
              }}
            >
              {this.props.children}
            </Animated.View>
        );
    }
}

// 组合动画
class CombineView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: new Animated.Value(10),
            height: new Animated.Value(10),
            left: new Animated.Value(0),
        }
    }

    componentDidMount() {
        const { width, height, left } = this.state;
        // 使用 parallel 来同时执行多个动画。也可以使用 sequence 来顺序执行多个动画
        Animated.parallel([
            Animated.timing(
                width,
                {
                    toValue: 100,
                    delay: 1000,
                    duration: 2000,
                }
            ),
            Animated.timing(
                height,
                {
                    toValue: 100,
                    delay: 1000,
                    duration: 2000,
                }
            ),
            Animated.timing(
                left,
                {
                    toValue: 100,
                    delay: 1000,
                    duration: 2000,
                }
            ),
        ]).start();
    }

    render() {
        const { width, height, left } = this.state;
        return (
            <Animated.View
                style={{
                    width,
                    height,
                    left,
                    backgroundColor: 'yellow',
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default class AnimatedComponent extends Component {
    render() {
        return (
            <View>
                <FadeInView style={{ width: 250, height: 50, backgroundColor: 'powderblue' }}>
                    <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>Fading in</Text>
                </FadeInView>
                <CombineView>
                    <Text style={{ textAlign: 'center' }}>组合动画</Text>
                </CombineView>
            </View>
        );
    }
}