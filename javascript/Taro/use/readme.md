# Taro 使用

## 一、安装及使用

1、安装Taro开发工具 `@tarojs/cli`

```
# cnpm 安装
cnpm install @tarojs/cli -g
# yarn 安装
yarn global add @tarojs/cli
```

2、创建Taro项目

```
# 创建
taro init [project name]
# 进入项目
cd [project name]
# 安装依赖
yarn
```

3、编译项目

微信小程序

```
# yarn
yarn dev:weapp
yarn build:weapp
# 全局安装
taro build --type weapp --watch
trao build --type weapp
```

支付宝小程序

```
# yarn
yarn dev:alipay
yarn build:alipay
# 全局安装
taro build --type alipay --watch
trao build --type alipay
```

H5

```
# yarn 
yarn dev:h5
yarn build:h5
# 全局安装
taro build --type h5 --watch
taro build --type h5
```



