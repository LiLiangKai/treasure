const PENDING = 'pending'     // promise 等待态
const FULFILLED = 'fulfilled' // promise 执行态
const REJECTED = 'rejected'   // promise 拒绝态

function _Promise (fn) {
  const _this = this
  this.status = PENDING
  this.value = null
  this.onFulfilledCbs = []
  this.onRejectCbs = []

  function resolve (value) {
    // 需要判断value是否是Promise
    if(value instanceof _Promise) {
      return value.then(resolve, reject)
    }
    // 使用setTimeout包裹的原因是为了保证函数的执行顺序，
    // 即保证onFulfilled和onRejected事件是异步执行，且在then方法被调用的那一轮事件循环之后的新执行栈中执行
    setTimeout(() => {
      if(_this.status === PENDING) {
        _this.value = value
        _this.status = FULFILLED
        _this.onFulfilledCbs.map(cb => cb(value))
      }
    })
  }

  function reject (value) {
    setTimeout(() => {
      if(_this.status === PENDING) {
        // _this.value = value
        _this.status = REJECTED
        _this.onRejectCbs.map(cb => cb(value))
      }
    })
  }

  try {
    fn(resolve, reject)
  } catch(err) {
    reject(err)
  }
}

function resolutionProcedure (promise, x, resolve, reject) {
  // 规定promise不能与x相等，否则发生循环引用问题
  if(promise === x) {
    return reject(new TypeError('Error'))
  }

  let called = false
  // 判断x类型
  if(x instanceof _Promise) {
    // 如果 x 处于等待态，promise 需保持为等待态直至 x 被执行或拒绝
    // 如果 x 处于其他状态，则用相同的值处理 Promise
    if(x.status === PENDING) {

      x.then((value) => {
        resolutionProcedure(promise, value, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
  }

  // 首先创建一个变量 called 用于判断是否已经调用过函数
  // 然后判断 x 是否为对象或者函数，如果都不是的话，将 x 传入 resolve 中
  // 如果 x 是对象或者函数的话，先把 x.then 赋值给 then，然后判断 then 的类型，如果不是函数类型的话，就将 x 传入 resolve 中
  // 如果 then 是函数类型的话，就将 x 作为函数的作用域 this 调用之，并且传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise，两个回调函数都需要判断是否已经执行过函数，然后进行相应的逻辑
  // 以上代码在执行的过程中如果抛错了，将错误传入 reject 函数中
  
  else if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      if(typeof then === 'function') {
        then.call(x, (v) => {
          if(called) return
          called = true
          resolutionProcedure(promise, v, resolve, reject)
        }, (e) => {
          if(called) return
          called = true
          reject(e)
        })
      } else {
        resolve(x)
      }
    } catch(e) {
      if(called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

_Promise.prototype.then = function (onFulfilled, onRejected) {
  const _this = this
  let promise2
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : v => { throw v }

  if(_this.status === PENDING) {
    console.log('_this: ', _this)
    // _this.onFulfilledCbs.push( onFulfilled )
    // _this.onRejectCbs.push( onRejected )
    return (promise2 = new _Promise((resolve, reject) => {
      _this.onFulfilledCbs.push(() => {
        try {
          const x = onFulfilled(_this.value)
          console.log(promise2, x)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
      _this.onRejectCbs.push(() => {
        try {
          const x = onRejected(_this.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    }))
  }

  if(_this.status === FULFILLED) {
    // onFulfilled(_this.value)
    return (promise2 = new _Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(_this.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    }))
  }

  if(_this.status === REJECTED) {
    // onRejected(_this.value)
    return (promise2 = new _Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onRejected(_this.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    }))
  }
}

_Promise.prototype.catch = function(onRejected) {
  const _this = this
  let promise2
  onRejected = typeof onRejected === 'function' ? onRejected : v => { throw v }

  if(_this.status === PENDING) {
    // _this.onRejectCbs.push(onRejected)
    return ( promise2 = new _Promise( ( resolve, reject ) => {
      setTimeout( () => {
        try {
          const x = onRejected( _this.value )
          resolutionProcedure( promise2, x, resolve, reject )
        } catch ( e ) {
          reject( e )
        }
      } )
    } ) )
  }
}

_Promise.resolve = () => {}

_Promise.reject = () => {}

_Promise.all = () => {}

_Promise.race = () => {}

// const p1 = new _Promise((resolve) => {
//   console.log('waiting 300ms')
//     resolve(1)
// }).then(v => {
//   console.log('p1 value: ', v)
// })

// console.log(p1)

new Promise((resolve) => {
  setTimeout(() => {
    resolve(1)
    resolve(2)
  }, 100)
}).then((res) => {
  console.log('result1: ', res)
  return Promise.resolve(res+1)
}).then(res => {
  console.log('result2: ', res)
  return Promise.resolve(res+1)
}).then(res => {
  console.log('result3: ', res)
}).then(res => {
  console.log('result4: ', res)
})
