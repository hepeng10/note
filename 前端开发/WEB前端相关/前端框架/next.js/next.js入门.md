nextJS 10 版本
# 创建项目
使用 create-next-app 创建项目：
```sh
yarn create next-app project_name --typescript
```
运行命令：
```sh
yarn dev
    # Starts the development server.

yarn build
    # Builds the app for production.

yarn start
    # Runs the built app in production mode.
```

# 国际化
国际化使用 next 自带的国际化配置和 react-i18next 配合实现。

### next 中配置国际化
配置 next.config.js，可实现通过路由切换语言。如 /blog | /en/blog | /zh/blog 都访问 /blog，只是 /en/blog 会访问英文版 blog，/blog 和 /zh/blog 会访问中文版 blog。
```js
// next.config.js
module.exports = {
    // 国际化配置
    // https://nextjs.org/docs/advanced-features/i18n-routing
    i18n: {
        locales: ['zh', 'en'],  // 这里配置了 zh 和 en 两种语言，即路由中通过 /zh/xxx, /en/xxx 可以访问 /xxx 路由
        defaultLocale: 'zh'  // 默认语言，即路由为 /blog 时通过 router.locale 获取到的语言也是此语言
    },
};
```
### useRouter 在国际化中的使用
next 国际化配置好后，组件中使用 useRouter() 得到的 router.locale 可以获取当前路由中的语言。即路由为 /xxx 和 /zh/xxx 时会返回 'zh'，/en/xxx 时会返回 'en'
```jsx
    const router = useRouter();
    const isZh = router.locale === 'zh';  // 是否是中文
    const route = router.route;  // 当前页面路由

    <span 
        className={styles.switchLang} 
        // 通过使用 router.push 传入 locale 切换路由中的语言，实现网页语言的切换
        onClick={() => router.push(route, route, { locale: isZh ? 'en' : 'zh' })}
    >
        {isZh ? 'English' : '中文'}
    </span>
```

### react-i18next 的使用
react-i18next 可配置多种语言的文本内容，然后根据当前设置的语言可以获取到对应语言的文本内容。
如我们配置中文的内容 zh.js，英语可以创建一个 en.js 以相同的数据格式值为英文的文本即可。
```js
// i18n/zh.js
export default {
    // head 标签
    head: {
        title: '艾倍尔',
        description: '艾倍尔'
    },
    layout: {
        header: {
            nav: {
                home: '主页',
                solution: '解决方案',
                product: '产品',
                about: '关于我们',
                contact: '联系我们',
            }
        }
    },
    title: '标题',
    dynamicName: '动态赋值：{val}',
    "debugObj.hello": '你好 Debug对象',
};
```
然后创建 config.js 将这些文本资源加到 react-i18next 中：
```js
// i18n/config.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 引入各语言的文本资源
import translation_en from './en.js';
import translation_zh from './zh.js';

i18n.use(initReactI18next).init({
    // 配置 resources 字段，将文本资源加到 react-i18next 中
    resources: {
        // en, zh 是自定义的语言名称（并不是英语就必须是 en, 中文就必须是 zh），当然这个名称在项目中肯定会统一
        en: {
            translation: translation_en,  // 每种语言的 translation 字段的值就是对应语言的文本资源
        },
        zh: {
            translation: translation_zh,
        },
    },
    lng: 'zh',  // 默认的语言
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
```
然后在入口文件 _app.js 中引入设置语言
```js
import 'antd/dist/antd.css';
import '../styles/globals.css'

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import '../i18n/config';  // 引入 i18n/config.js

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
    // 获取 url 中的当前语言： zh | en
    const locale = useRouter().locale;
    const { i18n } = useTranslation();

    useEffect(() => {
        // 路由中的语言变化的时候就会调用 react-i18next 的 changeLanguage 修改语言
        i18n.changeLanguage(locale);
    }, [locale]);

    return (
        // antd 路由语言为 zh 时显示中文；undefined 即为默认的英文
        <ConfigProvider locale={locale === 'zh' ? zhCN : undefined}>
            <Component {...pageProps} />
        </ConfigProvider>
    )
}

export default MyApp
```