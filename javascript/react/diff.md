# Diff算法

本文档主要讲解React的diff算法。

在讲解React运行流程的render阶段时，在beginWork阶段更新组件时，会调用`reconcileChildren`方法：

```js
function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
  if (current === null) {
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderLanes);
  } else {
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes);
  }
}
```

对于首次渲染的组件调用`mountChildFibers`方法，更新的组件调用`reconcileChildFibers`方法。实际上，这两个方法本质上是一样的：

```js
var reconcileChildFibers = ChildReconciler(true);
var mountChildFibers = ChildReconciler(false);
```

都是通过`ChildReconciler`方法生成的:

```js
function ChildReconciler (shouldTrackSideEffects) {
  // ...

  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) { /* ... */ }

  function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, lanes) { /* ... */ }

  function reconcileSingleElement(returnFiber, currentFirstChild, element, lanes) { /* ... */ }

  function reconcileChildFibers(returnFiber, currentFirstChild, newChild, lanes) { /* ... */ }

  return reconcileChildFibers
}
```

可以看到，diff算法的入口函数是`reconcileChildFibers`：

```js
function reconcileChildFibers(returnFiber, currentFirstChild, newChild, lanes) {
  var isObject = typeof newChild === 'object' && newChild !== null;

  if(isObject) {
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
          return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, lanes));
      // 其他类型
    }
  }
  
  if (typeof newChild === 'string' || typeof newChild === 'number') {
    return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, lanes));
  }

  if (isArray(newChild)) {
    return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
  }

  // 其他情况

  // 以上情况都没命中，删除节点
  return deleteRemainingChildren(returnFiber, currentFirstChild);
}
```

整个diff可以分为两种情况，单节点的diff和多节点的diff：

- 单节点：`newChild`为`object`,`string`,`number`时，表示同级只有一个节点。
- 多节点：`newChild`为`Array`，表示同级有多个节点。

需要明确的是，React的diff算法只在同级节点之间进行比较，不进行跨级比较，在`beginWork`时，只会对当前正在处理的`fiber`节点的子`fiber`节点和新的子元素做diff。

## 单节点diff

对于单节点diff，主要讲解下`newChild`类型为`object`的情况:

```js
if(isObject) {
  switch (newChild.$$typeof) {
    case REACT_ELEMENT_TYPE:
      return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, lanes));
  }
}
```

对类型为`object`的`newChild`，主要调用`reconcileSingleElement`方法。

由于父`fiber`节点的孩子可能不止一个，所以diff算法需要从这些旧的子`fiber`节点中找出可以被复用的节点，如果都没有，则根据`newChild`创建新的子`fiber`节点，删除所有旧的子`fiber`节点。

代码：
```js
function reconcileSingleElement(returnFiber, currentFirstChild, element, lanes) {
  var key = element.key;
  var child = currentFirstChild;

  // 已经存在子fiber节点
  while (child !== null) {
    // 判断旧的子fiber节点的key和新的子元素的key是否一样
    if(child.key === key) {
      switch (child.tag) {
        case Fragment:
          // ...
        case Block:
          // ...
        default:
          // 判断type是否一样
          if(child.elementType === element.type) {
            // 已命中可以复用的，将剩余的其他子fiber节点都标记为 Deletion
            deleteRemainingChildren(returnFiber, child.sibling);
            // 复用当前的子fiber节点
            const existing = useFiber(child, element.props);
            existing.ref = coerceRef(returnFiber, child, element);
            existing.return = returnFiber;
            return existing
          }
          break
      }

      // key值一样，但type不一样，无法被复用，将剩余的子fiber节点都标记为 Deletion
      deleteRemainingChildren(returnFiber, child);
      break;
    } else {
      // 对不能复用的子fiber节点标记为 Deletion
      deleteChild(returnFiber, child);
    }

   // 继续和下一个子fiber节点比较
    child = child.sibling;
  }

  // 未找到可复用的子fiber节点，创建新的
  if(element.type === REACT_FRAGMENT_TYPE) {
    var created = createFiberFromFragment(element.props.children, returnFiber.mode, lanes, element.key,);
    created.return = returnFiber;
    return created;
  } else {
    var created = createFiberFromElement(element, returnFiber.mode, lanes);
    created.ref = coerceRef(returnFiber, currentFirstChild, element);
    created.return = returnFiber;
    return created;
  }
} 
```

单节点diff的流程：

1. 如果已经存在子`fiber`节点，则进行比较，否则创建新的子`fiber`节点。
2. 比较旧的子`fiber`节点与新的子元素的`key`值是否一样：
  - `key`值不一样，则将当前的子`fiber`节点标记为`Deletion`，继续比较下一个子`fiber`节点；
  - `key`值一样，则比较`type`是否一样，若一样，则复用当前子`fiber`节点，并将其他剩余的子`fiber`节点标记为`Deletion`；不一样，则表示最可能被复用的节点都不满足，不用继续比较了，直接将所有剩余子`fiber`节点标记为`Deletion`。
3. 未能命中能被复用的子`fiber`节点，则根据新的子元素创建新的子`fiber`节点。

## 多节点diff

相比单节点diff，多节点的diff就相当复杂了。

对于多节点的更新，主要有三种情况：

1. 节点更新
```jsx
<div>
  <div key="0">0</div>
  <div key="1">1</div>
</div>

// 属性发生更新
<div>
  <div key="0">0</div>
  <div key="1" data-show="true">1</div>
</div>

// 标签发生更新
<div>
  <div key="0">0</div>
  <li key="1">1</li>
</div>
```

2. 节点新增或减少
```js
<ul>
  <li key="0">0</li>
  <li key="1">1</li>
  <li key="2">2</li>
</ul>

// 新增节点
<ul>
  <li key="0">0</li>
  <li key="1">1</li>
  <li key="2">2</li>
  <li key="3">3</li>
</ul>

// 减少节点
<ul>
  <li key="0">0</li>
  <li key="1">1</li>
</ul>
```

3. 节点位置偏移
```jsx
<div>
  <div key="0">0</div>
  <div key="1">1</div>
</div>

// 位置改变
<div>
  <div key="1">1</div>
  <div key="0">0</div>
</div>
```

对于同级多节点，其更新情况满足上面的一种或多种。

在React中，主要使用两次循环处理多节点的diff，第一次循环处理更新的`fiber`节点，第二次循环处理剩下的不属于更新的`fiber`节点。

```js
function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
  var resultingFirstChild = null;   // 第一个新的子fiber节点
  var previousNewFiber = null;      // 前一个新的子fiber节点
  var oldFiber = currentFirstChild; // 当前被遍历的旧的子fiber节点
  var lastPlacedIndex = 0;  // 最后一个可复用的节点在旧的子fiber节点中的位置索引
  var newIdx = 0;           // 当前变量的newChild的索引
  var nextOldFiber = null;  // 下一个旧的子fiber节点

  // 第一轮遍历
  for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
    // ...
  }

  // ① newChildren都遍历完
  if (newIdx === newChildren.length) {
    deleteRemainingChildren(returnFiber, oldFiber);
    return resultingFirstChild;
  }

  // ② oldFiber遍历完，newChildren未遍历完
  if(oldFiber === null) {
    for (; newIdx < newChildren.length; newIdx++) {
      const newFiber = createChild(returnFiber, newChildren[newIdx], lanes);
      // ...
      if (previousNewFiber === null) {
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
    }
    return resultingFirstChild
  }

  // ③ oldFiber和newChildren都未遍历完
  var existingChildren = mapRemainingChildren(returnFiber, oldFiber);
  // 第二轮遍历
  for (; newIdx < newChildren.length; newIdx++) {
    // ...
  }

  // ...

  return resultingFirstChild;
}
```

第一轮遍历主要将旧的`fiber`节点和新的子元素一一进行比较，能否复用旧的`fiber`节点，判断依据类似单节点diff。

```js
// 第一轮遍历
for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
  // 记录下一个需要比较的fiber节点
  if (oldFiber.index > newIdx) {
    nextOldFiber = oldFiber;
    oldFiber = null;
  } else {
    nextOldFiber = oldFiber.sibling;
  }

  // 比较newChildren[newIdx]和oldFiber
  var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);

  if (newFiber === null) {
    // 新的子fiber为空，退出循环，key不同时会返回null
    if (oldFiber === null) {
      oldFiber = nextOldFiber;
    }

    break;
  }

  if (shouldTrackSideEffects) {
    if (oldFiber && newFiber.alternate === null) {
      // oldFiber不能被复用，标记为Deletion
      deleteChild(returnFiber, oldFiber);
    }
  }

  lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);

  // 新子节点关联
  if (previousNewFiber === null) {
    resultingFirstChild = newFiber;
  } else {
    previousNewFiber.sibling = newFiber;
  }

  // 继续比较newChildren[newIdx+1]和下一个oldFiber
  previousNewFiber = newFiber;
  oldFiber = nextOldFiber;
}
```

第一轮遍历的过程：

1. `newIdx = 0`，比较`newChildren[newIdx]`和`oldFiber`，根据`key`值和`type`值确定是否能复用`oldFiber`；
2. 能够复用，`newIdx++`，继续比较`newChildren[newIdx]`和`oldFiber.sibling`;
3. 不能复用，分为两种情况：
  -  `key`不同表示无法复用，直接退出循环；
  - `key`相同，`type`不同，创建新的`fiber`节点，将`oldFiber`标记为`Deletion`，继续遍历；
4. 遍历完`newChildren`（`newIdx === newChildren.length-1`）或`oldFiber`（`oldFiber.sibling === null`），第一轮循环结束。

经过第一轮循环，会有四种结果：

1. `newChildren` 和 `oldFiber` 同时遍历完，这是最理想的情况，此时多节点diff完成。

2. `newChildren`遍历完，`oldFiber`没遍历完，需要将剩余的`oldFiber`都标记为`Deletion`。

3. `newChildren`没遍历完，但`oldFiber`遍历完，需要为剩余每个的`newChild`创建新的`fiber`节点。

4. `newChildren` 和 `oldFiber` 都未遍历完，进入第二轮循环

重点讲一下第四种情况。

由于可能更新是由节点位置变化引起，导致第一轮循环时，由于相应位置的`key`值不同而被判断为无法复用，此时无法再根据索引位置进行比较。但在剩余的`oldFiber`中，可能还有能够被复用的，因此在遍历剩余的`newChildren`时，需要能够通过`key`值从`oldFiber`中找到能够被复用的阶段，所以在进入第二轮循环时，会根据剩余的`oldFiber`生成一个`Map`，`Map`的`key`是`oldFiber.key`，`value`是`oldFiber`。

在第二轮遍历中，主要是从`Map`中找是否有能够被复用的`oldFiber`，有则复用并从`Map`中删除该被复用的`oldFiber`；否则创建新的`fiber`节点。遍历完`newChildren`后，如果`Map`中还有剩余的`oldFiber`，需要标记为`Deletion`。

```js
// 生成Map
var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // 第二轮循环
for (; newIdx < newChildren.length; newIdx++) {
  // 从Map中找是否有能够复用的oldFiber，否则创建新的fiber节点
  var newFiber = updateFromMap(existingChildren,returnFiber,newIdx,newChildren[newIdx],lanes);
  if (newFiber !== null) {
    if (shouldTrackSideEffects) {
      if (newFiber.alternate !== null) {
        // 删除被复用的oldFiber
        existingChildren.delete(
          newFiber.key === null ? newIdx : newFiber.key,
        );
      }
    }

    // 标记是否为移动
    lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);

    // 新子节点关联
    if (previousNewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
}

if (shouldTrackSideEffects) {
  // Map有剩余，都标记为Deletion
  existingChildren.forEach(child => deleteChild(returnFiber, child));
}
```

### 如何判断节点是发生位置移动？

在React的多节点diff中，节点是否移动的参照物是最后一个可复用的节点在`oldFiber`中的索引位置（用变量`lastPlacedIndex`表示）。

由于`newChildren`是按顺序遍历的，每次遍历到的可复用节点一定是当前遍历到的所有可复用节点中最靠右的那个，即一定在`lastPlacedIndex`对应的可复用的节点在本次更新中位置的后面。因此只需要比较遍历到的可复用节点在上次更新时是否也在`lastPlacedIndex`对应的`oldFiber`后面，就能知道两次更新中这两个节点的相对位置有没改变。

用变量`oldIndex`表示遍历到的可复用节点在`oldFiber`中的位置索引。如果`oldIndex < lastPlacedIndex`，代表本次更新该节点需要向右移动。

`lastPlacedIndex`初始为0，每遍历一个可复用的节点，如果`oldIndex >= lastPlacedIndex`，则`lastPlacedIndex = oldIndex`

一个例子：

```
更新前：abcd
更新后：adbc

===== 第一次遍历 ==========
a（之后） 与 a（之前）比较
key不变 可复用
lastPlaceIndex = 0

d（之后）与 b（之前）比较
key不同，不可复用退出循环
===== 第一次遍历结束 =======

此时
oldFiber = bcd
newChildren = dbc
lastPlaceIndex = 0

将oldFiber保存到Map中

===== 第二次遍历 ==========
遍历剩余的newChildren

key = d 在 Map中存在
oldIndex = 3
比较 oldIndex 与 lastPlaceIndex
oldIndex (3) >= lastPlaceIndex (0)，表示可复用节点不需要移动
lastPlaceIndex = 3

key =  b 在Map中
oldIndex = 1
比较 oldIndex 与 lastPlaceIndex
oldIndex (1) < lastPlaceIndex (3)，表示可复用节点需要右移

key =  c 在Map中
oldIndex = 2
比较 oldIndex 与 lastPlaceIndex
oldIndex (2) < lastPlaceIndex (3)，表示可复用节点需要右移
===== 第二次遍历结束 =======

结果 ad 不需要移动，bc被标记为移动
```

## 小结

![](https://raw.githubusercontent.com/LiLiangKai/resources/main/images/reactDiff.jpg)