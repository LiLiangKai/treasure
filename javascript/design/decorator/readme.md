> 2020/4/15 by Hiya

# Javascript 设计模式之装饰器模式

> 定义：在不改变原对象的基础上，通过对其进行包装拓展，使原有对象可以满足用户的更复杂需求。

装饰器模式在前端开发中，可能是一种比较少用到的设计模式。实际上，装饰器模式也是一种非常实用的设计模式，巧用装饰器模式，可以很好的帮助我们对已有功能进行拓展，同时又不破坏已有功能。

对于装饰器，我们可以理解为一个包装容器，装饰器模式就是将一个对象放到包装容器对象中，最后返回一个包装对象。

## 示例

```js
const button = ( function () {
  const button = document.createElement( 'button' )
  button.innerText = 'button'
  button.addEventListener( 'click', () => {
    alert( 1 )
  } )
  return button
} )()   

document.body.appendChild( button ) 
```

例子中，我们创建了一个按钮元素，同时为按钮元素绑定点击事件。

现在新增一个需求，在原按钮的基础上，为按钮的点击事件新增一个行为，每次点击时都会改变`body`元素的背景颜色。

```js
const button = ( function () {
  const button = document.createElement( 'button' )
  button.innerText = 'button'
  button.addEventListener( 'click', () => {
    alert( 1 )
    document.body.style.backgroundColor = `#${ Math.random().toString( 16 ).slice( 9 ) }`
  } )
  return button
} )()   
```

现在我们新增了一句代码就实现了新的需求，但存在一个缺点——修改到了原始的按钮对象，这违背了开发闭合原则。我们不可能在每次变更需求后，都去修改原始的对象，因为这会带来不稳定性。因此我们可以尝试用装饰器模式去实现上面的需求

```js
const button = ( function () {
  const button = document.createElement( 'button' )
  button.innerText = 'button'
  button.addEventListener( 'click', () => {
    alert( 1 )
  } )
  return button
} )()   

function decoratorButton( button ) {
  if ( !button ) return button
  button.addEventListener( 'click', () => {
    document.body.style.backgroundColor = `#${ Math.random().toString( 16 ).slice( 9 ) }`
  } )
  return button
}

document.body.appendChild( decoratorButton( button ) )
```

虽然相比前面的修改，使用装饰器模式新增了不少代码，却存在不少优势：

- 不用修改到原始对象的代码，同时又保留了原始对象的功能
- 如果后面不再需要这个功能，我们可以直接移除该装饰器
- 对于新增功能，我们可以在装饰器里修改，或添加新的装饰器

## ES7装饰器



## 生产实践

### React高阶组件HOC

> 高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。

