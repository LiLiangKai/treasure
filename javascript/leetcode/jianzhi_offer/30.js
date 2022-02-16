/*
输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。
*/

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function ( arr, k ) {
  const result = []
  if(!arr || !arr.length || k === 0) return result

  for(let i=0; i<arr.length; i++) {
    heapPush(result, k, arr[i])
  }
  return result
};

function heapPush (heap = [], k, n) {
  if(!heap.length) {
    heap.push(n)
    return heap
  }
  const stack = []
  let top = heap[heap.length-1]
  if(n >= top) {
    if(heap.length === k) {
      return heap
    }
    heap.push(n)
    return heap
  }
  while (n < top && heap.length) {
    stack.push(heap.pop())
    top = heap[heap.length-1]
  }
  heap.length < k && heap.push(n)
  while(stack.length && heap.length < k) {
    heap.push(stack.pop())
  }
  return heap
}

// const heap = []
// console.log( heapPush( heap, 4, 4 ) )
// console.log( heapPush( heap, 4, 5 ) )
// console.log( heapPush( heap, 4, 1 ) )
// console.log( heapPush( heap, 4, 6 ) )
// console.log( heapPush( heap, 4, 2 ) )
// console.log( heapPush( heap, 4, 7 ) )
// console.log( heapPush( heap, 4, 3 ) )

// console.log( getLeastNumbers( [ 4, 5, 1, 6, 2, 7, 3 ], 4 ) )
// console.log( getLeastNumbers( [ 4, 5, 1, 6, 2, 7, 3 ], 10 ) )
// console.log( getLeastNumbers( [], 10 ) )
// console.log( getLeastNumbers( [], 0 ) )
console.log( getLeastNumbers( [ 0, 0, 1, 3, 4, 5, 0, 7, 6, 7 ], 9 ) )