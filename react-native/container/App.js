/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  SectionList,
  Button,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  // 导航头标题
  static navigationOptions = {
    title: 'App Screen',
  };

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  page(p) {
    const pages = {
      1: this.renderBuJu.bind(this),
      2: this.renderTextInput.bind(this),
      3: this.renderScrollView.bind(this),
      4: this.renderFlatList.bind(this),
      5: this.renderSectionList.bind(this),
      6: this.renderFetch.bind(this),
      7: this.renderRouter.bind(this),
    }
    return pages[p]();
  }

  renderBuJu() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        {/* flex 设置为1，使组件撑满剩余空间。多个并列的组件设置 flex:1 则会平分空间，如果要让某个组件占据空间更大，可设置更大的值 */}
        <View style={{borderWidth: 3, borderColor: 'black', flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'powderblue'}} />
          <View style={{flex: 2, backgroundColor: 'skyblue'}} />
          <View style={{flex: 3, backgroundColor: 'steelblue'}} />
        </View>
        {/* flexDirection 设置方向：column、row */}
        <View style={{borderWidth: 3, borderColor: 'red', flex: 1, flexDirection: 'row'}}>
          <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        </View>
        {/* jestifyContent 设置对齐方式 flex-start、center、flex-end、space-around以及space-between */}
        <View style={{borderWidth: 3, borderColor: 'blue', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        </View>
        {/* alignItems 设置次轴方向的对齐方式 flex-start、center、flex-end以及stretch.注意：要使stretch选项生效的话，子元素在次轴方向上不能有固定的尺寸。以下面的代码为例：只有将子元素样式中的height: 50去掉之后，alignItems: 'stretch'才能生效。 */}
        <View style={{borderWidth: 3, borderColor: 'green', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        </View>
      </View>
    );
  }

  renderTextInput() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    );
  }

  renderScrollView() {
    return (
      // 可以通过属性 horizontal={true} 来改为横向滚动
      // 会立即渲染所有元素，即使屏幕以外的。适合用来显示数量不多的滚动元素。如果你需要显示较长的滚动列表，那么应该使用功能差不多但性能更好的ListView组件。
      <ScrollView>
        <Text style={{fontSize:50}}>Scroll me plz</Text>
        {/* require 必须是静态字符串，不能使用变量，因为 require 是在编译时执行，而非运行时执行 */}
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Text style={{fontSize:50}}>If you like</Text>
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Text style={{fontSize:50}}>Scrolling down</Text>
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Text style={{fontSize:50}}>What's the best</Text>
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Text style={{fontSize:50}}>Framework around?</Text>
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Image source={require('../img/favicon.png')} />
        <Text style={{fontSize:80}}>React Native</Text>
      </ScrollView>
    );
  }

  // FlatList组件用于显示一个垂直的滚动列表，其中的元素之间结构近似而仅数据不同。
  // FlatList并不立即渲染所有元素，而是优先渲染屏幕上可见的元素。
  renderFlatList() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={{ padding: 10, fontSize: 30, height: 60 }}>{item.key}</Text>}
        />
      </View>
    );
  }

  // 分组的列表
  renderSectionList() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin', 'David', 'Dana']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderSectionHeader={
            ({section}) => <Text style={{ paddingTop: 2, paddingLeft: 10, paddingRight: 10, paddingBottom: 2, fontSize: 50, fontWeight: 'bold', backgroundColor: 'rgba(247,247,247,1.0)', }}>{section.title}</Text>
          }
          renderItem={({item}) => <Text  style={{ padding: 10, fontSize: 30, height: 60 }}>{item}</Text>}
          // 给予 key 属性，避免类似 react 的没有 key 的警告
          keyExtractor={(item, i) => {return i;}}
        />
      </View>
    );
  }

  // fetch 请求。（RN 内置 fetch 和 XMLHttpRequest，所以也可以使用 axios 等其它库）
  // 需要注意的是，安全机制与网页环境有所不同：在应用中你可以访问任何网站，没有跨域的限制。
  renderFetch() {
    this.fetchMoviesList();
    return (
      <View>
        <Text>render 方法中不能返回空，这里返回内容防止报错。。。</Text>
      </View>
    );
  }
  async fetchMoviesList() {
    try {
      const res = await fetch('https://facebook.github.io/react-native/movies.json');
      const resJson = await res.json();
      // console 内容可以通过命令行输入 react-native log-android 查看
      console.log(123456798, resJson);
    } catch(err) {
      console.error(err);
    }
  }

  // 路由跳转
  renderRouter() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="Go to OtherScreen"
          onPress={() => {
            // 使用 navigate() 方法跳转到指定的路由组件中。传参在目标组件中通过 this.props.navigation.state.params 获取
            // 注意：如果没传参数，this.props.navigation.state.params 的值为 undefined，而不是空对象
            navigate('OtherScreen', { name: 'Tirion' })
          }}
        />
        <Button
          title="可点击的组件"
          onPress={() => {
            navigate('Touchable');
          }}
        />
        <Button
          title="轮播组件"
          onPress={() => {
            navigate('ViewPager');
          }}
        />
        <Button
          title="动画"
          onPress={() => {
            navigate('Animated');
          }}
        />
      </View>
    );
  }

  // 修改传入的页数查看不同组件渲染效果
  render() {
    return this.page(7);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
