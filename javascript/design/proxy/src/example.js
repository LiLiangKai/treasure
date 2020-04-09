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

// 顾客A购买苹果的Mac笔记本
customerA.buyMacPro( Apple ) // 购买 MacBook Pro