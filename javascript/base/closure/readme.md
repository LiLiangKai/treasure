# JS的闭包

函数A内部有一个函数B，函数B可以访问函数A的变量，此时函数B就是闭包。

```js
function A() {
  let scope = 'A'
  function B(){
    return scope
  }
  return B
}

const foo = A()
foo()
```

在上面的例子中，函数A内部存在函数B，当执行完函数A时会返回函数B，即代码 `const foo = A()` 的结果是 `foo = B`。到执行代码`foo()` 时，函数A的执行上下文已经销毁，但在函数B内容仍能访问到函数A中的变量 `scope`。

在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量。

常见的闭包，node模块就相当于闭包
