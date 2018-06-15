import { StackNavigator } from 'react-navigation';
import App from './container/App';
import OtherScreen from './container/OtherScreen';

// 使用 react-navigation 路由
export default StackNavigator(
    // 指定路由名字和对应的组件
    {
        App,
        OtherScreen
    },
    // 路由配置
    {
        initialRouteName: 'App',
    }
);