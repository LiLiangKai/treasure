module.exports = quickSort

function quickSort (array = [], left, right) {
  if(array.length < 2 ) return array
  left = left || 0
  right = right || array.length-1

  const idx = partition(array, left, right)

  if(left < idx-1) {
    quickSort(array, left, idx-1)
  }
  if(right > idx) {
    quickSort(array, idx, right)
  }

  return array
}

function partition(array = [], left, right) {
  const pivot = Math.floor((right-left)/2 + left)
  let i = left
  let j = right
  while(i<=j) {
    while(array[i] < array[pivot]) i++
    while(array[j] > array[pivot]) j--

    if(i<=j) {
      i!==j && swap(array, i, j)
      i++
      j--
    }
  }
  return i
}

function swap (array = [], i, j) {
  [array[i], array[j]] = [array[j], array[i]]
}

// console.log(quickSort([10, 2, 8, 4, 3, 1, 9]))

/*
[10, 2, 8, 4, 3, 1, 9] , left=0, right=6
pivot = 3, pivotValue = 4
i = left => 0
j = right => 6, 5
i < j => [1, 2, 8, 4, 3, 10, 9]
i = 1
j = 4
i < j => [1, 3, 8, 4, 2, 10, 9]
i = 2
j = 3
i < j => [1, 3, 4, 8, 2, 10, 9]
i = 3
j = 2

--------------------------------
[1, 3, 4, 8, 2, 10, 9] , left=0, right=2
pivot = 1, pivotValue = 3
i = left => 0, 1
j = right => 2, 1
i <= j => [1, 3, 4, 8, 2, 10, 9]
i = 2
j = 0
-------------------
[1, 3, 4, 8, 2, 10, 9] , left=3, right=6
pivot = 4, pivotValue = 2
i = left => 3
j = right => 6, 5, 4
i <= j => [1, 3, 4, 2, 8, 10, 9]
i = 4 
j = 3

*/