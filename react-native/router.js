import { StackNavigator } from 'react-navigation';
import App from './container/App';
import OtherScreen from './container/OtherScreen';
import Touchable from './container/Touchable';
import ViewPager from './container/ViewPager';
import Animated from './container/Animated';

// 使用 react-navigation 注册路由
export default StackNavigator(
    // 指定路由名字和对应的组件
    {
        App,
        OtherScreen,
        Touchable,
        ViewPager,
        Animated,
    },
    // 路由配置
    {
        initialRouteName: 'App',
    }
);