// 苹果商店
const Apple = {
  macPro: () => {
    console.log('购买 MacBook Pro')
  },
  sale: (fn) => {
    setTimeout(() => {
      fn && fn()
    }, 2000)
  }
}

// 顾客A
const customerA = {
  buyMacPro: (target) => {
    target.macPro()
  }
}

// 代购员B
const B = {
  macPro: () => {
    Apple.sale( Apple.macPro )
  }
}

customerA.buyMacPro( B ) 
// 2s后出现 购买 MacBook Pro