function request (n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(n * 2)
    }, 1000)
  })
}

function *gen () {
  const res1 = yield request(5)
  const res2 = yield request(res1)
  return res2
}

async function gAsync () {
  const res1 = await request( 5 )
  const res2 = await request( res1 )
  return res2
}
gAsync().then(v => console.log(v))

// const g = gen()
// const next1 = g.next()
// next1.value?.then(res => {
//   console.log( 'res1: ', res )
//   console.log( 'next1: ', next1 )
//   const next2 = g.next(res)
//   next2.value?.then(res2 => {
//     console.log('res2: ', res2)
//     console.log('next2: ', next2)
//     const next3 = g.next()
//     if(next3.done) {
//       console.log('next3: ', next3)
//     }
//   })
// })

function generatorToAsync (generatorFn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      const g = generatorFn(...args)
      
      function go(key, val) {
        let res
        try {
          res = g[key](val)
        } catch(err) {
          return reject(err)
        }
        if(res) {
          const { value, done } = res
          if(done) {
            return resolve(value)
          }
          return Promise.resolve(value).then(v => go('next', v), err => go('throw', err))
        }
      }

      go('next')
    })
  }
}

const genAsync = generatorToAsync(gen)
genAsync().then(v => console.log(v)) // 20