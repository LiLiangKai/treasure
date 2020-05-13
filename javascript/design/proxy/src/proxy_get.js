const target = {
  name: 'Jack',
}

const targetProxy = new Proxy(target, {
  get: function (target, propKey, receiver) {
    if(target.hasOwnProperty(propKey)) {
      console.log( receiver )
      return target[propKey]
    } else {
      return false
    }
  }
})

console.log(targetProxy.name) // Jack
console.log(targetProxy.age) // false