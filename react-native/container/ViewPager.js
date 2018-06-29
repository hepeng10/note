import React, { Component } from 'react';
import { ViewPagerAndroid, View, Text } from 'react-native';

export default class ViewPager extends Component {
    static navigationOptions = {
        title: 'ViewPager',
    };

    render() {
        return (
            <ViewPagerAndroid
                style={styles.viewPager}
                initialPage={0}
            >
                {/* 所有的子视图都必须是纯View，而不能是自定义的复合容器 */}
                <View style={styles.pageStyle}>
                    <Text>First page</Text>
                </View>
                <View style={styles.pageStyle}>
                    <Text>Second page</Text>
                </View>
            </ViewPagerAndroid>
        );
    }
}

const styles = {
    viewPager: {
        height: 100,
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'yellow',
    }
};