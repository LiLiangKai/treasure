const PEDNGIND = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


class MyPromise {
  status
  onfulfilledCbs
  onrejectedCbs

  constructor (executor) {
    this.status = PEDNGIND  
    this.onfulfilledCbs = []
    this.onrejectedCbs = []

    const resolve = (value) => {
      this.status = FULFILLED
      this.onfulfilledCbs.forEach((onfulfilled) => {
        typeof onfulfilled === 'function' && onfulfilled(value)
      })
    }

    const reject = (reason) => {
      this.status = REJECTED
      this.onrejectedCbs.forEach((onrejected) => {
        typeof onrejected === 'function' && onrejected(reason)
      })
    }

    setTimeout(() => {
      try {
        typeof executor === 'function' && executor(resolve, reject)
      } catch (err) {
        reject(err)
      }
    }, 0)
  }

  then (onfulfilled, onrejected) {
    if(this.status === PEDNGIND) {
      onfulfilled = onfulfilled || ((value) => value)
      onrejected = onrejected || ((reason) => {throw reason})

      this.onfulfilledCbs.push(onfulfilled)
      this.onrejectedCbs.push(onrejected)
    }
  }

  catch (onrejected) {
    if(this.status === PEDNGIND) {
      onrejected = onrejected || ( ( reason ) => { throw reason } )
      this.onrejectedCbs.push( onrejected )
    }
  }
}

new Promise( ( resolve, reject ) => {
  try {
    setTimeout(() => {
      resolve( true )
    }, 100) 
  } catch {
    reject( false )
  }
} ).then( (value) => {
  console.log('promise value: ', value)
}, (reason) => {
  console.log('promise error: ', reason)
} )

new MyPromise((resolve, reject) => {
  try {
    setTimeout( () => {
      resolve( true )
    }, 100 ) 
  } catch {
    reject(false)
  }
} ).then( ( value ) => {
  console.log( 'promise value: ', value )
}, ( reason ) => {
  console.log( 'promise error: ', reason )
} )