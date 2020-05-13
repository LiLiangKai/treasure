const target = {
  name: 'Jack',
}

const targetProxy = new Proxy(target, {
  set: (target, propKey, propValue) => {
    if(propKey === 'age') {
      if(typeof propValue !== 'number') {
        throw 'The age is not an intege'
      }
      if(propValue < 0 || propValue > 150) {
        throw 'The age is invalid'
      }
    }
    target[propKey] = propValue
  }
})

targetProxy.age = 25
console.log(targetProxy.age) // 25
targetProxy.age = 300 // 报错