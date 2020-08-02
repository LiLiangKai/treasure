> 2020/5/5 by Hiya

# Webpack 之 loader

> loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

## 如何使用loader?

我们可以在webpack的配置文件中通过 `module.rules` 配置指定相关的 `loader`。

例如：使用 `css-loader` 处理 `.css` 文件，使用 `ts-loader` 处理 `.ts` 文件。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ts/,
        loader: 'ts-loader'
      },
      {
        test: /\.css/,
        loader: 'css-loader'
      }
    ]
  }
}
```

除了通过配置文件使用 `loader`，还可以使用内联方式使用，即在每个 import 语句中显式指定 loader，例如：

```js
import 'css-loader?modules!./style.css'
```

但并不推荐内联方式使用 `loader`，使用配置文件能够使代码变得简洁和易于维护，也能对所有的 `loader` 配置有更清晰的了解。

## rule.use

在配置`loader`时，某些类型文件可能需要多个`loader`去加载解析，此时我们可以使用 `use` 去指定多个 `loader`。上面例子中出现的 `loader: "ts-loader"` 其实是 `use: [{loader: "ts-loader"}]` 的简写。示例如下：

```js
module: {
  rules: [
    {
      test: /\.ts/,
      use: ['babel-loader', 'ts-loader']
    }
  ]
}

// 或者
module: {
  rules: [
    {
      test: /\.ts/,
      use: [{
        loader: 'babel-loader'
      }, {
        loader: 'ts-loader'
      }]
    }
  ]
}

```

需要注意的是，webpack 在执行 `loader` 时的顺序是与书写的顺序相反的，如例子中的 `use: ['babel-loader', 'ts-loader']`，webpack是先执行 `ts-loader` 后再执行 `babel-loader`，所以在书写 `loader` 时，应注意顺序，避免顺序出差引起错误。

## 如何编写一个 `loader`

webpack 现在是一个比较成熟的打包工具，相关社区也提供了非常多的 `loader` 工具，基本无需自行开发相关的`loader`。但在实际开发过程中，也可能出现需要开发 `loader` 的情况，本节内容主要简单介绍下如何去开发编写一个 `loader`。

## 相关链接

- [webpack - loader](https://webpack.docschina.org/loaders/)
- [编写一个loader](https://webpack.docschina.org/contribute/writing-a-loader/)
- [loader API](https://webpack.docschina.org/api/loaders/)