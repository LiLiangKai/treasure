# React Hook

在React中，hook只能在函数式组件中使用，常用的hook有：`useState`、`useEffect`、`useRef`、`useContext`等。

## hook的数据结构

```js
var hook = {
  memoizedState: null,
  baseState: null,
  baseQueue: null,
  queue: null,
  next: null
};
```

- `baseState` - 最后一次更新时的state值
- `baseQueue` - 最后一次更新的更新队列
- `queue` - hook的队列的更新队列
- `next` - 指向同个hook的下一个更新

- `memoizedState` - 保存hook对应的state，对与不同的hook，保存的值是不一样的：
  
  - `useState` - `useState(initialState)` 保存的是`initialState`的值
  - `useReducer` - `useReducer(reducer, initialArg, init?)` 保存的是`init(initialArg)`或者`initialArg`的值
  - `useRef` - `useRef(initialValue)` 保存的是`{current: initialValue}`
  - `useMemo` - `useMemo(callback, deps)` 保存的值是`[callback(), deps]`
  - `useCallback` - `useCallback(callback, deps)`  保存的值是`[callback, deps]`
  - `useEffect` - `useEffect(callback, deps)` 保存的是包含`useEffect`的创建数和销毁函数、已经依赖性等数据结构的`effect`对象


## hook的原理

对于函数时组件执行hook时，会根据组件所处的时期执行不同的hook实现。组件所处时期有两个，分别是初始化时期（`mount`）和更新时期（`update`），两个时期对于的hook实现是不同的，他们来源于不同的对象，这类对象在`React`被称为`dispatcher`

```js
// 初始化
var HooksDispatcherOnMountInDEV = {
  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  // ...
}

// 更新时
var HooksDispatcherOnUpdateInDEV = {
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
  // ...
}
```

函数时组件在执行时，会根据`current !== null && current.memoizedState !== null`条件切换不同的`dispatcher`:

```js
function updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) {
  // ...

  nextChildren = renderWithHooks(current, workInProgress, Component, nextProps, context, renderLanes);

  // ...
} 

function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderLanes) {
  // ...

  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;

  if (current !== null && current.memoizedState !== null) {
    // 切换更新时的dispatcher
    ReactCurrentDispatcher.current = HooksDispatcherOnUpdateInDEV;
  }  else {
    // 切换初始化时的dispatcher
    ReactCurrentDispatcher.current = HooksDispatcherOnMountInDEV;
  }
  
  var children = Component(props, secondArg); 

  // ...
} 
```

### useState和useReducer

例子：

```ts
function reducer (state, action) {
  switch (action) {
    case 'plus':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}

function App() {
  const [visible, setVisible] = useState(false)
  const [count, dispatch] = useReducer(reducer, 1)

  return (
    <div>
      <button onClick={() => setVisible(true)}>show</button>
      <button onClick={() => dispatch('plus')}>count: {count}</button>
    </div>
  )
}
```

mount时，`useState`会调用`mountState`，`useReducer`会调用`mountReducer`

```js
function mountState(initialState) {
  // 创建hook对象
  var hook = mountWorkInProgressHook();

  // 初始化state值
  if (typeof initialState === 'function') {
    initialState = initialState();
  }
  hook.memoizedState = hook.baseState = initialState;

  // 创建queue对象
  var queue = hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState
  };

  // 创建dispatch
  var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);

  return [hook.memoizedState, dispatch];
}

function mountReducer(reducer, initialArg, init) {
  // 创建hook对象
  var hook = mountWorkInProgressHook();

  // 初始化state值
  var initialState;
  if (init !== undefined) {
    initialState = init(initialArg);
  } else {
    initialState = initialArg;
  }
  hook.memoizedState = hook.baseState = initialState;

  // 创建queue对象
  var queue = hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: reducer,
    lastRenderedState: initialState
  };

  // 创建dispatch
  var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);

  return [hook.memoizedState, dispatch];
}
```

从源码来看，`mountState`和`mountReducer`所做的事情是比较相似的。

`queue`的数据结构

```js
var queue = {
  pending: null,
  // 保存dispatchAction
  dispatch: null,
  // 上一次render时使用的reducer
  lastRenderedReducer: reducer,
  // 上一次render时的state
  lastRenderedState: initialState
}
```

对于`useReducer`的`lastRenderedReducer`为传入的`reducer`，对于`useState`的`lastRenderedReducer`为`basicStateReducer`

```js
function basicStateReducer(state, action) {
  return typeof action === 'function' ? action(state) : action;
}
```

update时，`useReducer`会调用`updateReducer`，`useState`虽然是调用`updateState`，但本子还是调用`updateReducer`

```js
function updateState(initialState) {
  return updateReducer(basicStateReducer);
}
```

重点看一下`updateReducer`

```js
function updateReducer(reducer, initialArg, init) {
  // 获取当前的hook对象
  var hook = updateWorkInProgressHook();
  var queue = hook.queue;

  // ...同更新阶段处理update对象和updateQueue类似的逻辑
  // 最后计算新的state值

  var dispatch = queue.dispatch;
  return [hook.memoizedState, dispatch];
}
```

`updateReducer`的目的是找到对应的hook，并根据`update`计算新的`state`值。

`updateReducer`和`useState`如何调度更新？

在上面的代码中，可以看到`queue.dispatch`的值绑定了`dispatchAction`

```js
function dispatchAction(fiber, queue, action) {
  // ...

  // 创建update对象
  var update = {
    lane: lane,
    action: action,
    eagerReducer: null,
    eagerState: null,
    next: null
  };
  var pending = queue.pending;

  // 生成更新链表
  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }

  queue.pending = update;

  // ...

  if (fiber === currentlyRenderingFiber || alternate !== null && alternate === currentlyRenderingFiber) {
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
  } else {
    if (fiber.lanes === NoLanes && (alternate === null || alternate.lanes === NoLanes)) {
      // 优化，如果fiber的更新队列是空的，则直接计算出下次更新时的state值，如果计算出的state值与hook中保存的state值一致，则不进入调度；如果不一致则进入调度，新的state值会在render阶段计算出来
    }

    scheduleUpdateOnFiber(fiber, lane, eventTime); // 调度更新
  }
} 
```

函数式组件执行`useState`或`useReducer`的`dispatch`时，执行的是`mount`时绑定好的`dispatchAction`，并且已经预先将组件对应的`fiber`节点和`hook.queue`做为参数传进去了。

在`React`的更新阶段中，主要做三件事：
- 创建更新对象
- 生成更新队列
- 调度更新

`dispatchAction`方法执行的过程也是类似如此，创建`update`对象，将`update`对象加入到`queue.pending`中，最后开启调度。







