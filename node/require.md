# require方法

本文档主要讲解Node中`require`方法加载模块的流程。

`require`方法内部会使用`Module._load(request)`加载模块。

## 模块路径

加载模块前最主要是知道要加载模块`request`的真实路径，通过 **`Module._resolveFilename(request)`** 寻找到模块的路径，`Module._resolveFilename`方法的执行过程：

1. 判断`request`是不是内置模块，如果是内置模块，直接返回。

内置模式是node安装后自带的，不要额外安装的模块，如`fs`、`path`等

2. 如果是非内置模块，需要找出所有可能路径，执行`Module._resolveLookupPaths(request)`。

当项目自身安装了依赖模块后，会在项目目录下多出`node_modules`目录，在使用依赖模块时，如果当前的目录中不存在`node_modules`或`node_modules`目录没有被使用的模块，则会往上一级目录中寻找是否有被使用模块，如果都没有，则最后执行程序时会报出模块未找到错误。
```
// 例如，文件/User/Desktop/project/a.js
require(‘xxx’)

对于 ‘xxx’ 模块所有可能存在的路径为：
[‘/User/Desktop/project/node_modules’,
‘/User/Desktop/node_modules’,
‘/User/node_modules’,
‘/node_modules’]
```

3. 经过步骤2 确定所有可能路径后，则需要从中找到正确的模块路径，执行`Module._findPath(request, paths)`。

在node中，有三种默认的文件后缀：`.js`、`.json`、`.node`，如果`require`的是这三种文件后缀的模块，是允许不带文件后缀的，如`require('./script.js')`等同于`require('./script')`。

查找正确路径规则：
```
例如对于 require(‘xxx’)

1. 如果 ‘xxx’ 模块是 ‘/’, ‘./’, ‘../’ 开头，则根据父模块的路径确定模块的绝对路径；

将 ’xxx’ 当成文件，依次查找 .js, .json, .node 为后缀的文件，只有其中之一存在，就返回该文件。

将 ‘xxx’ 当成目录，依次查找文件：
xxx/package.json 的main文件
xxx/index.js
xxx/index.json
xxx/index.node
只要其中一个存在，就返回该文件
```

由于模块可能被多次加载，为避免每次加载重复执行相同的查找正确路径的过程，在第一次找到正确路径后，该结果会被缓存下来，以供后续使用。

4. 返回步骤3 找到的正确路径。

## 加载模块

通过`Module._resolveFilename`方法完成查找模块路径后，开始加载模块。

首先会从缓存中查找模块是否已经被加载，如果已经加载过，直接返回加载过的模块。

模块未被加载过，先判断是否是内置模块，如果是，使用`loadNativeModule`加载内置模块并返回。

以上都未满足，创建新的模块，执行`module = new Module(filename)`；将创建的模块缓存下来，然后执行`module.load(filename)`加载模块并返回。

### `module.load`

`module.load`方法主要执行`Module._extensions[extension](this, filename)`，根据filename的后缀类型执行不同的加载逻辑。

- 对于`.json`类型

json文件模块，主要是读取json文件内容，再解析成JSON对象，然后赋值给`module.exports`:

```js
Module._extensions[‘json’] = function (module, filename) {
  // ...
  var content = fs.readFileSync(filenamem, ‘utf8’)
  module.exports = JSON.parse(stripBOM(content))
  // ...
}
```

- 对于`.js`类型

js文件模块，读取js文件内容，再编译执行模块内容:

```js
Module._extensions[‘js’] = function (module, filename) {
  // ..
  var content = fs.readFileSync(filenamem, ‘utf8’)
  module._compile(content, filename)
  // ...
}
```

编译执行模块内容:

```
相当于将模块的内容以闭包的方式执行，同时将exports, require, module以参数传入

(Function (exports, require, module, filename, dirname) {
   // 执行模块源码内容
})(exports, require, module, filename, dirname)

最终将模块exports的值输出
```

## 小结

![](https://raw.githubusercontent.com/LiLiangKai/resources/main/imagesnodeRequire.jpg)