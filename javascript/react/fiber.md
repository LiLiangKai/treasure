# Fiber

## Fiber 的起源

在`React`15版本以前，`React`采用两层架构模型：`Reconciler`（协调器）和 `Renderer`（渲染器），`Reconciler`负责找出变化的组件，`Renderer`负责将变化的组件渲染到页面上，`Reconciler` 和 `Renderer` 交替工作。

在两层架构模型中，`Reconciler`会递归更新子组件，但递归一旦开始变不能停止，如果组件树过深，很可能造成页面卡顿。

为了解决递归更新的问题，`React`16版本将两层架构模型更改为三层架构模型：

- `Scheduler` - 调度器，负责更新任务的调度
- `Reconciler` - 协调器，接受`Scheduler`调度的任务，为变化的组件打上不同标记
- `Renderer` - 渲染器，根据`Reconciler`为组件打上的标记，做对应的真实DOM操作

在三层架构模型中，`Reconciler`和 `Renderer`不再交替进行工作，而是会由 `Reconciler`将组件树中所有变化的组件都处理完毕，才会交由 `Renderer` 处理。同时将递归更新改为异步的可中断更新。

异步的可中断更新，在`React` 中叫`Concurrent Mode`，将整个渲染分解成一个个独立的工作单元，当一个工作单元执行完毕就进入下一个工作单元，直到没有需要执行的工作单元。

为了实现异步的可中断更新，`React`实现了一种数据结构，叫做`Fiber`。

- 在`React`16版本之后，整个`Reconciler`是基于`Fiber`节点实现的，被称为`Fiber Reconciler`。
- 每个`Fiber` 节点对应一个`React element`，`Fiber`节点保存了组件的类型、DOM节点信息，父级/子级/兄弟关系信息等
- `Fiber`节点还记录了组件本次要更新的状态、要执行的操作（新增/删除/更新）等。

## Fiber 的数据结构

```js
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;    // Fiber对应的组件类型，如 FunctionComponent/ClassComponent/HostComponent
  this.key = key;    // Fiber的key属性
  this.elementType = null; 
  this.type = null;
  this.stateNode = null; // Fiber对应的真实DOM节点

  this.alternate = null; // 关联旧的fiber节点

  this.return = null;  // 父级Fiber节点
  this.child = null;   // 第一个子级Fiber节点
  this.sibling = null; // 下一个兄弟Fiber节点
  this.index = 0;      // 子级的索引，记录当前Fiber是其父级的第几个孩子

  this.ref = null;     // ref

  // 保存本次更新要改变的状态信息等
  this.pendingProps = pendingProps;  // 要更新的props
  this.memoizedProps = null;         // 正在生效的props
  this.updateQueue = null;           // Fiber的更新队列
  this.memoizedState = null;         // 正在生效的state

  this.dependencies = null;
  this.mode = mode; // Effects

  this.flags = NoFlags; // 本次更新Fiber对应的DOM要做的操作
  // 本次要更新的Fiber链表，所有改变的Fiber以链表形式连接
  this.nextEffect = null;
  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;
}
```

`Fiber`节点之间通过`return`、`child`、`sibling`关联。

## Fiber的工作原理

在React中，至多存在着两颗`Fiber Tree`，一个是正在构建的`Fiber Tree`，叫做`WorkInProgress Fiber Tree`；一个是正在显示的`Fiber Tree`，叫做`Current Fiber Tree`。

两颗树的工作原理，当组件树发生了更新，都会重新构建`WorkInProgress Fiber Tree`，构建完毕后就会交由`Renderer`渲染到页面上，此时`WorkInProgress Fiber Tree`变成`Current Fiber Tree`。

在`Current Fiber Tree`中的`Fiber`节点称为`current fiber`，在`WorkInProgress Fiber Tree`中的`Fiber`节点称为`workInProgress fiber`，两种类型的`Fiber`节点通过`alternate`关联。

由于每次更新都会生成新的组件`Fiber Tree`，因此需要一个特殊的`Fiber`节点指向构建完的`Fiber Tree`。在React中，`fiberRoot`正是起到该作用。`fiberRoot`在首次执行`ReactDom.render`方法后生成，通过构造函数`FiberRootNode`创建。`Fiber Tree`的根节点叫做`rootFiber`，每次生成新的`Fiber Tree`都会产生新的`rootFiber`。

`fiberRoot`通过`current`属性指向`rootFiber`，`rootFiber`通过`stateNode`属性关联到`fiberRoot`上。

前面提到的`WorkInProgress Fiber Tree`构建完毕交由`Renderer`渲染后，会变成`Current Fiber Tree`，在代码层面上的体现就是当`fiberRoot.current`指向`WorkInProgress Fiber Tree`的`rootFiber`时，就表示`WorkInProgress Fiber Tree`变成了`Current Fiber Tree`，因此`fiberRoot.current`指向的是已渲染到页面上的`Fiber Tree`。

