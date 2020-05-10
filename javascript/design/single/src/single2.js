const SingleDog = (function() {
  let instance = null
   
  return function SingleDog () {
    if(instance) return instance
    this.name = 'singe dog'
    this.hasGirlFriend = false
    instance = this
  }
})()

const a = new SingleDog()
const b = new SingleDog()
console.log(a === b)
