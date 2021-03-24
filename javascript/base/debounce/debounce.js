const fs = require('fs')
const path = require('path')

function debounce ( fn, delay ) {
  let timer
  return (...arg) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arg)
    }, delay)
  }
}

function throttle (fn, delay ) {
  let timer
  return (...arg) => {
    if(timer) return
    timer = setTimeout(() => {
      fn.apply(this, arg)
      timer = null
    }, delay)
  }
}

// const foo = debounce(() => console.log(1), 500)

// foo()
// foo()
// foo()

const bar = throttle(() => console.log(2), 500)

bar()
bar()
bar()

const content = fs.readFileSync(path.join(__dirname, 'readme.md'), 'utf8')
console.log(JSON.stringify({fdContent: content}))