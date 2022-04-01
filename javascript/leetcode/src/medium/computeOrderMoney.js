/*
计算订单费用
*/

const Map = [
  [ 6000, 1 ], [ 5000, 2 ], [ 4000, 3 ], [ 3000, 4 ],
  [ 2000, 5 ], [ 1000, 6 ], [ 500, 7 ], [ 100, 8 ],
  [ 50, 9 ], [ 20, 10 ], [ 5, 15 ], [ 0, 30 ]
]

function computeMoney ( order ) {
  if ( !order ) return 0
  let total = 0
  for ( const info of Map ) {
    if(order <= info[0]) continue
    const dv = order - info[0]
    total += dv * info[1]
    order -= dv
  }
  return total
}

console.time('computeMoney')
console.log( computeMoney( 1 ) )
console.log( computeMoney( 2 ) )
console.log( computeMoney( 5 ) )
console.log( computeMoney( 6 ) )
console.log( computeMoney( 6000 ) )
console.log( computeMoney( 6123 ) )
console.timeEnd( 'computeMoney' )