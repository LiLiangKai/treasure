# 排序

> 排序是指以一定的顺序（递增、递减等）对一个数组（或列表）中的项进行重新排序。

排序问题有许多不同的算法解决方案，而且也体现了许多计算机科学的想法：

- 比较与非比较策略，
- 迭代与递归实现，
- 分而治之范式（这个或这个），
- 最佳/最差/平均情况时间复杂性分析，
- 随机算法等

## 常见排序算法

1、基于比较的排序算法:

- 冒泡排序
- 选择排序
- 插入排序
- 归并排序 (递归实现)
- 快速排序 (递归实现)
- 随机快速排序 (递归实现)

2、不基于比较的排序算法:

- 计数排序
- 基数排序

## 冒泡排序

给定一个N个元素的数组，冒泡法排序将：

```
1、如果元素大小关系不正确，交换这两个数
2、比较一对相邻元素（a，b）
3、重复步骤1和2，直到我们到达数组的末尾（最后一对是第（N-2）和（N-1）项，因为我们的数组从零开始）
4、到目前为止，最大的元素将在最后的位置。 然后我们将N减少1，并重复步骤1，直到N = 1
```

![bubble sort](./assets/bubbleSort.gif)

代码实现

```js
function bubbleSort ( array ) {
  const length = array.length
  for ( let i = 0; i < length - 1; i++ ) {
    for ( let j = 0; j < length - 1 - i; j++ ) {
      if(array[j] > array[j+1]) {
        let t = array[ j + 1 ]
        array[ j + 1 ] = array[ j ]
        array[ j ] = t
      }
    }
  }
  return array
}
```

#### 分析

比较和交换需要一个以常量为界的时间，我们称之为c。标准冒泡排序中有两个嵌套循环。外循环正好运行N次迭代。 但内部循环运行变得越来越短：

当 i = 0，（N-1）次迭代（比较和可能交换）时。
当 i = 1，（N-2）次迭代时，...
当 i =（N-2）时，1次迭代,
当 i=（N-1），0迭代.
因此，总迭代次数=（N-1）+（N-2）+ ... + 1 + 0 = N *（N-1）/ 2（推导）。
总时间= c * N *（N-1）/ 2 = O（N ^ 2）。

## 选择排序

给定 N 个项目和 L = 0 的数组，选择排序将：

- 在 [L ... N-1] 范围内找出最小项目 X 的位置，
- 用第 L 项交换X，
- 将下限 L 增加1并重复步骤1直到 L = N-2。

![bubble sort](./assets/selectionSort.gif)

代码实现

```js
function selectionSort (array) {
  for(let i=0; i<array.length-1; i++) {
    let n = i
    for(let j=i+1; j<array.length; j++) {
      if(array[j] < array[n]) {
        n = j
      }
    }
    const t = array[n]
    array[n] = array[i]
    array[i] = t
  }
  return array
}
```

时间复杂度： O(n²) 