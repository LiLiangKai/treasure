const target = [1,2,3,4,5,6]

const targetProxy = new Proxy(target, {
  get: (target, index) => {
    index = Number(index)
    if (isNaN(index)) {
      throw '无效的数组索引'
    }
    const length = target.length
    if(index < 0) {
      return target[length + index%length]
    } else if ( index > length ) {
      return target[ index % length ]
    }
    return target[index]
  }
})

console.log(targetProxy[0]) // 1
console.log(targetProxy[3]) // 4
console.log(targetProxy[10]) // 5
console.log(targetProxy[-1]) // 6
console.log(targetProxy[-3]) // 4
console.log(targetProxy[-5]) // 2
console.log(targetProxy[-13]) // 6
console.log(targetProxy['ad']) // throw '无效的数组索引'