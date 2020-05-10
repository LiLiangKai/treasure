class SingleDog {
  static instance = null

  constructor () {
    this.name = 'singe dog'
    this.hasGirlFriend = false
  }

  static getInstance () {
    if ( !SingleDog.instance ) {
      SingleDog.instance = new SingleDog()
    }
    return SingleDog.instance
  }
}

module.exports = SingleDog.getInstance()