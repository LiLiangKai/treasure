> 2020/8/3 by Hiya

# JS的数据类型

javascript的数据类型有：`number`, `string`, `boolean`, `undefined`, `object`, `null`, `symbol`, `bigint`

其中 `symbol` 是 es6 新增的数据类型，`bigint` 是 es10 新增的数据类型。

## 基本类型

基本类型有：`number`, `string`, `boolean`, `undefined`, `null`, `symbol`, `bigint`

基本类型存储在栈内存中，数据大小确定，内存空间大小可以分配，可以按值访问。

## 引用类型

引用类型有：`object`，主要包含：对象，数组，函数，正则

引用类型值大小不固定，但内存地址的大小是固定的，引用类型的值是存储在堆内存中，栈内存存储的是指向该引用类型值在堆内存的地址。对引用类型可以按地址访问。

## 类型转换

### toBoolean

在条件判断时，表示`false`的值有：`undefined`, `null`, `false`, `NaN`, `''`, `±0`；

除以上值外 其余都为true。

*注意：空数组`[]` 和空对象`{}` 表示的布尔值也是 `true`。*

### toNumber

常见值的转换：

```js
Number(false)     // 0
Number(true)      // 1
Number([])        // 0
Number([1])       // 1
Number([1,2])     // NaN
Number({})        // NaN
Number('')        //0
Number(undefined) // NaN
Number(null)      // 0
Number('123')     // 123
Number('123abc')  // NaN
```

### toString

常见值的转换：

```js
String(false)      // 'false'
String(true)       // 'true'
String(null)       // 'null'
String(undefined)  // 'undefined'
String([])         // ''
String([1])        // '1'
String([1,2])      // '1,2'
String({})         // '[object Object]'
```