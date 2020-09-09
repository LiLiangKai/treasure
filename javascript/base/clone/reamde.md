# js对象的克隆

## 浅克隆

浅克隆只克隆对象第一层的数据，对第二层或更深层级的数据不做拷贝。

常用方法：

- `...` 对象扩展符
- `Object.assign` 方法

示例

```js
const obj = {a: 1, b: 2, c: { a: 1, b: 2 }}
const obj2 = obj
const obj3 = {...obj}
const obj4 = Object.assign({}, obj)

obj===obj2 // true
obj===obj3 // false
obj===obj4 // false

// 浅拷贝对更深层数据不做拷贝，由于引用相同，所以对拷贝数据深层数据进行修改，会影响到原始的对象
obj4.c.a = 5
console.log(obj.c.a) // 5
```

## 深度克隆

### 基础版

### 考虑各种类型

### 解决循环引用