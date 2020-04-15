/** 发布者  */
class Publisher {
  constructor () {
    this.observers = []
    console.log('create publisher')
  }
  // 添加订阅者
  add ( observer ) { 
    if(!observer || typeof observer !== 'object') return
    if(this.observers.some(obs => obs === observer)) return
    console.log('add observer ', observer.name)
    this.observers.push(observer)
  }

  remove ( observer ) {
    if ( !observer || typeof observer !== 'object' ) return
    const idx = this.observers.findIndex(obs => obs === observer)
    if ( idx === -1 ) return
    console.log( 'remove observer ', observer.name )
    this.observers.splice(idx, 1)
  }

  notify () {
    console.log('notify all observer')
    this.observers.map(obs => {
      obs.update()
    })
  }
}

/** 订阅者 */
class Observer {
  constructor (name) {
    this.name = name
    console.log('create observer')
  }

  update () {
    console.log(`observer ${this.name} update`)
  }
}

const publish = new Publisher()
const observer1 = new Observer('Jack')
const observer2 = new Observer('John')
const observer3 = new Observer('Tom')

publish.add(observer1)
publish.add(observer2)
publish.add(observer3)

setTimeout(() => {
  publish.remove(observer3)
  publish.notify()
}, 1000)