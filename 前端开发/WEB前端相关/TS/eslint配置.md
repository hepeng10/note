```json
{
    // 配置 ts 解析器
    "parser": "@typescript-eslint/parser",
    "plugins": [
        // 配置 ts 插件
        "@typescript-eslint/eslint-plugin"
    ],
    "extends": [
        // 继承自官方推荐规则
        "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
        // 自定义规则重写默认规则
        "no-unused-vars": "off",  // 未被使用的变量提示。不报错只提示
        "@typescript-eslint/no-unused-vars": "off",  // 关闭函数类型定义中形参未使用的提示（与上面那个组合使用）
        "@typescript-eslint/no-var-requires": "off",
        "max-statements-per-line": ["error", { "max": 1 }],  // 每行允许的最大语句数
    }
}
```