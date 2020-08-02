> 20207/29 by Hiya

# electron-react-boilerplate 脚手架

> Electron React Boilerplate uses Electron, React, Redux, React Router, Webpack and React Hot Loader for rapid application development (HMR).

## 安装

执行命令

```
# 克隆项目
git clone --depth=1 https://github.com/electron-react-boilerplate/electron-react-boilerplate project-name

cd project-name

# 安装依赖
yarn
```

创建项目完成后的项目主要结构目录：
```
./
|_ app              // 应用源码目录
|_ configs          // webpack配置目录
|_ internals        // 内置的图片脚本目录
|_ resources        // 资源目录
|_ test             // 测试相关文件目录
|_ ...
|_ package.json
```

## app

```
./app
|_ components              // 组件目录
|_ constants               // 常量文件目录
|_ containers              // 容器组件目录
|_ features                // 功能组件目录
|_ utils                   // 工具目录
|_ app.global.css          // 全局样式文件
|_ app.html                // 应用入口html
|_ index.tsx               // electron渲染进程，react应用入口文件
|_ main.dev.ts             // electron主进程脚本
|_ menu.ts                 // 自定义顶部菜单
|_ rootReducer.ts          // reduce
|_ Routes.tsx              // 路由
|_ store.ts                // store
|_ ...
|_ package.json
```

## 相关资料：

- [git](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
- [docs](https://electron-react-boilerplate.js.org/docs/installation/)

