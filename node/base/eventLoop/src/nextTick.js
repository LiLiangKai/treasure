setTimeout( () => {
  console.log( 'timer1' )

  Promise.resolve().then( function () {
    console.log( 'promise1' )
  } )
}, 0 )

new Promise((resolve) => {
  console.log('promise 2 start')
  resolve(1)
  console.log('promise 2 end')
}).then(v => {
  console.log('promise 2 value: ', v)
})

process.nextTick( () => {
  console.log( 'nextTick' )
  process.nextTick( () => {
    console.log( 'nextTick' )
    process.nextTick( () => {
      console.log( 'nextTick' )
      process.nextTick( () => {
        console.log( 'nextTick' )
      } )
    } )
  } )
} )

// Node 中的 process.nextTick 函数是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行