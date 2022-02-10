# 使用webpack搭建一个项目脚手架

本文档主要讲解webpack的使用，并完成一个简单通用的项目脚手架，最终使项目能支持用`React + TypeScript + Sass`进行开发。

## 初始化项目

新建一个目录

```bash
mkdir project
cd project
```

使用`yarn`初始化项目

```bash
yarn init
```

初始化后会生成一个 `package.json` 文件。现在在该项目下新建如下目录，以便后续操作：

```
/project
|_ src
|_ scripts
|_ package.json
```

- `src` - 放置项目源码
- `scripts` - 放置`webpack`配置及相关项目脚本

### 安装webpack

本项目是基于`webpack`5.x 版本进行开发，不同大版本之间的`webpack`，在配置使会有所不同，使用时应当注意。

```
yarn add webpack -D
```

注意，命令中加 `-D` 是将`webpack`作为开发依赖安装，安装完后的依赖是写到`devDependencies`中。

## 编写webpack配置

在`scripts`目录下新建`webpack.config.js`文件

```
/project
|_ scripts
   |_ webpack.config.js
```

编写内容

```js
// webpack.config.js
module.exports = {
  // 在这里编写webpack配置
}
```

### 输入和输出

对于`webpack`来说，必须要有输入和输出，即指定某个文件作为项目的构建入口文件，以及构建完后在哪里输出最终构建产物。

在`webpack`中，使用`entry`配置输入，`output`配置输出。

对于本项目而言，约定使用`src`目录下的`index.js`作为入口文件，先在`src`目录下新建`index.js`文件；根目录下的`dist`目录作为构建输出目录，完成如下配置：

```js
const path = require('path')
const ROOT = process.cwd()
module.exports = {
  entry: path.join(ROOT, 'src/index.js'),
  output: {
    filename: 'index.js',
    library: 'app',
    path: path.join(ROOT, 'dist'),
    umdNamedDefine: true,
    libraryTarget: 'umd',
  }
}
```

在上面的配置中，指定了以`src/index.js`作为构建入口文件，以`umd`格式输出，输出的文件是`dist/index.js`

完成以上配置便可以进行打包构建了，如果要使用命令行执行，需要安装依赖`webpack-cli`

```base
yarn add webpack-cli -D
```

安装完后执行：`webpack -c scripts/webpack.config.js`

执行完毕后会看到根目录下生成了`dist/index.js`文件

### 支持TypeScript

由于现在大部分项目都开始使用`TypeScript`进行开发，本项目也应当支持使用`TypeScript`进行开发，因此需要增加一些`webpack`配置，用于支持`TypeScript`。

首先，更改入口文件，原先是使用`src/index.js`作为入口文件，现在改用`src/index.ts`作为入口文件。

修改`webpack`配置

```js
module.exports = {
  entry: path.join(ROOT, 'src/index.ts'),
  // ...
}
```

因为`webpack`只会识别`js`文件，对于其他类型文件，需要使用相关的`loader`新处理转为成`webpack`能识别的内容，否则构建就会报错。通常会使用`ts-loader`和`babel-loader`处理`ts`文件。

`babel`可用于将当前新版本的js转为较低版本的js，方便开发者可以在开发时直接使用上js的新特性。

安装相关依赖: `yarn add typescript ts-loader babel-loader -D`

在根目录下新建`.babelrc.js`和`tsconfig.json`文件，这里直接提供这两份文件的内容，里面有些配置跟后面有关联，在此不做过多讲解，若有需要可直接使用，一些细节则根据实际项目进行调整。

`tsconfig.json`文件
```json
{
  /* https://www.tslang.cn/docs/handbook/compiler-options.html*/
  "compilerOptions": {
    /* TypeScript模块解析: https://www.tslang.cn/docs/handbook/module-resolution.html */
    /* 解析非相对模块名的基准目录 */
    "baseUrl": ".",
    /* 指定生成哪个模块系统代码 */
    "module": "esnext",
    /* 模块解析策略,Node or Classic */
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "declaration": false,
    /* 启用实验性的ES装饰器*/
    "experimentalDecorators": true,
    /* 编译过程中需要引入的库文件的列表 */
    "lib": ["es7", "dom"],
    /* 在.tsx文件里支持JSX："React"或"Preserve"*/
    "jsx": "react",
    /* 指定生成目标为react JSX时，使用的JSX工厂函数，比如React.createElement或h*/
    "jsxFactory": "React.createElement",
    /* 指定生成的ES版本*/
    "target": "es6",
    /* 不是函数的所有返回路径都有返回值时报错*/
    "noImplicitReturns": true,
    /* 若有未使用的局部变量则抛错*/
    "noUnusedLocals": true,
    "preserveConstEnums": true,
    /* 生成相应的.map文件*/
    "sourceMap": true,
    "strictNullChecks": true,
    "noImplicitAny": false,
    "paths": {
      "@/*": [
        "src/*"
      ],
    }
  },
  "include": ["src", "types"],
  "exclude": ["node_modules", "dist", "public"],
  "compileOnSave": false
}
```

`.babelrc.js` 文件
```js
module.exports = {
  // exclude: /node_modules/,
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        modules: 'commonjs',
        targets: {
          browsers: [
            'ie >= 11',
            'Chrome >= 21',
            'Firefox >= 1',
            'Edge >= 13'
          ]
        }
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-runtime',
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'React.createElement'
      }
    ]
  ]
}
```

为了使用`babel`，还需要安装`babel`的相关依赖，由于依赖过多，直接在`package.json`的`devDependencies`中添加如下依赖后进行安装：

```json
{
  "devDependencies": {
    "@babel/core": "^7.13.10",
    "@babel/plugin-proposal-class-properties": "^7.8.3",
    "@babel/plugin-proposal-nullish-coalescing-operator": "^7.10.1",
    "@babel/plugin-proposal-object-rest-spread": "^7.9.0",
    "@babel/plugin-proposal-optional-chaining": "^7.10.1",
    "@babel/plugin-syntax-dynamic-import": "^7.8.3",
    "@babel/plugin-transform-react-jsx": "^7.9.4",
    "@babel/plugin-transform-runtime": "^7.9.0",
    "@babel/plugin-transform-typeof-symbol": "^7.14.5",
    "@babel/preset-env": "^7.13.10",
    "@babel/preset-react": "^7.12.13",
    "@babel/preset-typescript": "^7.13.0",
  }
}
```

完成配置：

```js
const babelLoader = {
  loader: 'babel-loader',
  options: {
    babelrc: false,
    configFile: path.join(ROOT, '.babelrc.js'),
    cacheDirectory: true
  }
}

const tsLoader = {
  loader: 'ts-loader',
  options: {
    configFile: path.join( ROOT, 'tsconfig.json' ),
    transpileOnly: true
  }
}

// webpack.config.js
moudle.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ babelLoader ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [ babelLoader, tsLoader ]
      }
    ]
  }
}
```

通常在开发中，我们引入文件时会忽略掉文件后缀名，如：

```js
import fn from './help'
```

实际引用的是`help.js`文件，在`webpack`中，默认能被识别的文件后缀是`js`和`json`，如果引入的是`ts`文件，则构建会报错，此时需要配置`resolve.extensions`

```js
// webpack.config.js
moudle.exports = {
  // ...
  resolve: {
    extensions: [ '.ts', '.js', '.json' ],
  }
}
```

### 支持React

安装React相关依赖：

```bash
yarn add react react-dom
yarn add @types/react @types/react-dom -D
```

通常React的使用`JSX`风格进行开发，文件后缀为`jsx`，使用`TypeScript`时为`tsx`，因此需要修改`/\.js$/`和`/\.ts$/`规则：

```js
// webpack.config.js
moudle.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [ babelLoader ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [ babelLoader, tsLoader ]
      }
    ]
  }
}
```

将入口文件改为`src/index.tsx`

```tsx
module.exports = {
  entry: path.join(ROOT, 'src/index.tsx'),
  // ...
}
```

修改`resolve.extensions`配置，使得`tsx`和`jsx`能被识别，同时配置别名`alias`，让`@`符号指向`src`目录，方便开发时引入文件时更为简便：

```js
module.exports = {
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json' ],
    alias: {
      // 别名设置只在webpack构建时能识别，如果想要ts能识别，需要在tsconfig.json中配置`paths`
      '@': paths.src, 
    }
  }
}
```

### 支持Sass

如果是开发一个React网站应用，则需要编写`css`样式，需要增加对`css`样式的处理，样式的处理需要使用到`style-loader`和`css-loader`。同时为了让样式能兼容不同浏览器（自动给样式添加浏览器前缀，如`-webkit|-moz`等），额外再使用`postcss-loader`，需要安装如下依赖:

```json
{
  "devDependencies": {
    "autoprefixer": "^10.4.0",
    "css-loader": "^6.5.1",
    "postcss": "^8.4.4",
    "postcss-import": "^14.0.2",
    "postcss-loader": "^6.2.1",
    "postcss-url": "^10.1.3",
    "style-loader": "^3.3.1",
  }
}
```

在根目录下新建文件`.postcssrc.js`，内容如下：

```js
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    autoprefixer: {}
  }
}
```

增加规则配置：

```js
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      config: path.join(ROOT, '.postcssrc.js')
    }
  }
}

module.exports = {
  module: {
    rules: [
      // ...
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          postcssLoader
        ]
      }
    ]
  }
}
```

为了支持样式可以使用`sass`编写，还需要做一些修改。

安装相关依赖：
```json
{
  "devDependencies": {
    "sass": "^1.35.1",
    "sass-loader": "^12.1.0"
  }
}
```

新增配置规则：

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          postcssLoader,
          {
            loader: "sass-loader",
            options: { implementation: require( "sass" ) }
          }
        ]
      }
    ]
  }
}
```

### 支持静态资源处理

在项目开发中，难免要使用到一些静态资源，如图片、音视频、字体等。

在`webpack`5版本之前，要处理这些静态资源，需要额外使用一些`loader`，如`url-loader`、`file-loader`等，但在`webpack`5版本后，`webpack`内置了资源模块类型用来处理静态资源：

- `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
- `asset/inline` 导出一个资源的 data URI。之前通过使用 url-loader 实现。
- `asset/source` 导出资源的源代码。之前通过使用 raw-loader 实现。

完善规则配置：

```js
module.exports = {
  module: {
    rules: [
      // ...
      {
        // 图片资源处理
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[name][ext]'
        }
      },
      {
        // 媒体资源处理
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name][ext]'
        }
      },
      {
        // 字体文件处理
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name][ext]'
        }
      }
    ]
  }
}
```

### 区分开发模式和生产模式

在实际项目中，通常会有两种方式构建项目，一个是开发模式，另一个是生产模式。

开发模式一般用于开发人员开发项目时使用，为了提升构建速度，可能会放弃一些耗时的优化处理，如代码压缩、构建产物生成到内存中等；生产模式用于将构建产物输出到文件，最终部署到服务器上，通常会做一些代码优化工作，以及做一些构建性能分析等。

开发模式使用`development`表示，生产模式使用`production`表示。

在`scripts`目录下新增`webpack.dev.js`文件（用来配置开发模式下的webpack配置）和`webpack.prod.js`文件（用来配置生产模式下的webpack配置）。

改写`webpack.config.js`文件，将原先导出对象改为导出方法，参数为指定构建模式:

```js
// webpack.config.js
module.exports = (mode = 'development') => {
  return {
    mode,
    entry: path.join(paths.src, 'index.tsx'),
    // ...
  }
}
```

配置`webpack.dev.js`

```js
// webpack.dev.js
const webpack = require('webpack')
const { merge } = require('webpack-merge') // 需要安装 webpack-merge
const webpackBaseConfig = require('./webpack.base')
const mode = 'development'

module.exports = merge(webpackBaseConfig(mode), {
  devtool: 'cheap-module-source-map',
  optimization: {
    minimize: false // 开发模式下不压缩代码
  },
  devServer: {
    host: '127.0.0.1',
    port: 5050,
    hot: true,
    open: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 使用热更新
  ]
})
```

配置`webpack.prod.js`

```js
// webpack.prod.js
const webpack = require('webpack')
const { merge } = require( 'webpack-merge' )
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require( 'terser-webpack-plugin' )
const webpackBaseConfig = require('./webpack.base')
const mode = 'production'

module.exports = merge(webpackBaseConfig(mode), {
  optimization: {
    minimizer: [
      new TerserPlugin( {
        parallel: true,
        terserOptions: {}
      } )
    ]
  },
  plugins: [
    new MiniCssExtractPlugin( {
      filename: 'style.css'
    } ),
    new webpack.ProgressPlugin()
  ]
})
```

生产模式下使用`terser-webpack-plugin`（需要单独安装依赖）插件来压缩代码；使用`mini-css-extract-plugin`（需要单独安装依赖）插件处理`css`样式，使最终的样式能独立成一个文件，此时还需要修改`webpack.config.js`

```js
// webpack.config.js
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )

module.exports = (mode = 'development') => {
  return {
    mode,
    entry: path.join(paths.src, 'index.tsx'),
    // ...
    module: {
      rules: [
        // ...
        {
          test: /\.css$/,
          use: [
            mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            postcssLoader
          ]
        },
        {
          test: /\.scss$/,
          use: [
            mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            postcssLoader,
            {
              loader: "sass-loader",
              options: { implementation: require( "sass" ) }
            }
          ]
        }
      ]
    }
  }
}
```

### 其他

在`webpack.config.js`中新增两个插件配置：

```js
// webpack.config.js
const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' )
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (mode = 'development') => {
  return {
    plugins: [
      new ForkTsCheckerWebpackPlugin( {
        typescript: {
          configFile: path.join( ROOT, 'tsconfig.json' ),
        }
      } ),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(ROOT, 'index.html'),
        templateParameters: {
          TITLE: '项目名称',
        }
      })
    ]
  }
}
```

使用`fork-ts-checker-webpack-plugin`（单独安装）插件可以在开发过程中检测`ts`文件的变化。

使用`html-webpack-plugin`（单独安装）插件用于给项目提供一份html模板，模板内容如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= TITLE %></title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```


## 编写脚本

通过以上配置，便可时项目支持使用`React` + `TypeScript` + `Sass`进行开发，接下来需要编写两个脚本，分别用于在开发时启动项目运行，和生产时项目构建输出。

### 编写开发运行脚本

在`scripts`目录下新建文件`start.js`文件，内容如下：

```js
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.dev')

async function start () {
  const compiler = webpack(webpackConfig)
  const devServer = new webpackDevServer(webpackConfig.devServer, compiler)
  devServer.start()
}

start()
```

这里使用`webpack-dev-server`启动应用程序，需要单独安装。

### 编写打包脚本

在`scripts`目录下新建文件`build.js`文件，内容如下：

```js
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod')

async function build () {
  return new Promise((resolve, reject) => {

    webpack( webpackConfig, ( err, stats ) => {
      if ( err ) return reject( err )
      process.stdout.write(
        stats.toString( {
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        } ) + '\n\n'
      )

      if ( stats.hasErrors() ) {
        return reject( false )
      }
      return resolve( true )
    } )
  })
}

build()
```

最后修改`package.json`的`scripts`内容：

```json
{
  "scripts": {
    "dev": "node ./scripts/start.js",
    "build": "node ./scripts/build.js"
  }
}
```

入口文件内容：

```ts
import React from 'react';
import ReactDom from 'react-dom'

const App = () => {
  return (
    <div></div>
  )
}

ReactDom.render(<App />, document.getElementById('app'))
```

执行`yarn dev`或`yarn build`便可开发或打包项目。
