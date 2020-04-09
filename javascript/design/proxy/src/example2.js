// 苹果商店
const Apple = {
  macPro: () => {
    console.log('购买 MacBook Pro')
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
    Apple.macPro()
  }
}

customerA.buyMacPro( B ) // 购买 MacBook Pro