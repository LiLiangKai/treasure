module.exports = quickSort

function quickSort (array = []) {
  if(array.length <= 1) return array
  const mid = Math.floor( array.length / 2 )
  const pivot = array[mid]
  const lows = []
  const highs = array.reduce((arr, v, i) => {
    if(mid === i) return arr
    if(v > pivot) {
      arr.push(v)
    } else {
      lows.push(v)
    }
    return arr
  }, [])
  return quickSort(lows).concat(pivot, quickSort(highs))
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