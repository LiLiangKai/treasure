class EvtMsg {
  evts

  constructor () {
    this.evts = {}
  }

  /**
   * 监听事件
   * @param {string} event 事件名
   * @param {Function} cb 事件回调
   */
  on ( event, cb ) {
    if ( !event || typeof cb !== 'function' ) return
    if ( !this.evts[ event ] ) {
      this.evts[ event ] = []
    }
    this.evts[ event ].push( cb )
  }

  /**
   * 触发事件
   * @param {string} event 事件名
   * @param  {...any} arg 回调参数
   */
  emit ( event, ...arg ) {
    if ( !event || !this.evts[ event ] ) return
    const cbs = this.evts[ event ]
    for ( let i = 0; i < cbs.length; i++ ) {
      const cb = cbs[ i ]
      cb.apply( this, arg )
    }
  }

  /**
   * 移除事件
   * @param {string} event 事件名
   * @param {Function} cb 事件回调
   */
  off ( event, cb ) {
    if ( !event || !this.evts[ event ] ) return
    const cbs = this.evts[ event ]
    const idx = cbs.findIndex( c => c === cb )
    cbs.splice( idx, 1 )
    return
  }

  /** 移除所有监听的事件 */
  removeAll () {
    this.evts = {}
  }

  /**
   * 监听一次性事件
   * @param {string} event 事件名
   * @param {Function} cb 事件回调
   */
  once ( event, cb ) {
    if ( !event || typeof cb !== 'function' ) return
    const wrapperCb = (...arg) => {
      cb.apply(this, arg)
      this.off(event, wrapperCb)
    }
    this.on(event, wrapperCb)
  }
}

const evtMsg = new EvtMsg()

class A {
  constructor () {
    evtMsg.on('feedback', this.feedback)
  }

  feedback () {
    console.log( 'A get feedback' )
  }

  notify () {
    evtMsg.emit('notify')
  }
}

class B {
  constructor () {
    evtMsg.on('notify', this.update)
  }

  update () {
    console.log( 'B receive notify' )
    evtMsg.emit('feedback')
  }
}

const a = new A()
const b = new B()
a.notify()
// B receive notify
// A get feedback