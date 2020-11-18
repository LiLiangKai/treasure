module.exports = quickSort

// function quickSort (array = []) {
//   if(array.length < 2) return array
//   const pivot = array[0]
//   const left = []
//   const right = []
//   for(let i=1; i<array.length; i++) {
//     const elem = array[ i ]
//     if ( elem > pivot) {
//       right.push( elem )
//     } else {
//       left.push(elem)
//     }
//   }
//   return [...quickSort(left), pivot, ...quickSort(right)]
// }

const arr = [6, 10, 7, 5, 3, 12, 1, 2, 3, 13, 66, 21, 34, 17, 9]

// const r = quickSort(arr)
// console.log(r)
