> 2020/7/20 by Hiya

# Storybook + React + Typescript

1、添加依赖

```
yarn add react react-dom
yarn add @storybook/react -D
yarn add babel-loader @babel/core -D
yarn add typescript ts-loader -D
# 可选但推荐
yarn add @storybook/addon-info react-docgen-typescript-loader -D
```

2、添加npm脚本

在 `package.json` 的 `scripts` 添加脚本

```json
{
  "scripts": {
    "storybook": "start-storybook",
    "build-storybook": "build-storybook"
  }
}
```

命令行执行：`yarn storybook` 可启动storybook项目
命令行执行：`yarn build-storybook` 可打包storybook项目

3、创建主文件

在项目下创建文件 `.storybook/main.js`

```js
module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  }
}
```
