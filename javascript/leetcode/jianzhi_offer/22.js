/*
输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个栈是否是该栈的弹出序列。假设压入栈的所有元素均不相等。
例如 [1,2,3,4,5]是某栈的压入顺序，序列[4,5,3,2,1]是该压入栈的某一个弹出序列，而[4,3,5,1,2]则不可能是该压入栈的一个弹出序列
*/

/**
 * 
 * @param {Number[]} pushOrder 
 * @param {Number[]} popOrder 
 * @returns 
 */
function isPopOrder (pushOrder, popOrder) {
  if(!pushOrder.length || !popOrder.length) return false
  if(pushOrder.length !== popOrder.length) return false
  const stack = []
  let nextPush = 0
  let nextPop = 0
  while(nextPop < popOrder.length) {
    // 压入栈元素入栈，直到栈顶元素等于弹出栈的第nextPop个元素
    while(!stack.length || stack[stack.length-1] !== popOrder[nextPop]) {
      if(nextPush === pushOrder.length) break
      stack.push(pushOrder[nextPush])
      nextPush++
    }
    // 栈顶元素与弹出栈的第nextPop个元素不相等，退出循环
    if(stack[stack.length-1] !== popOrder[nextPop]) {
      break
    }
    // 栈顶元素与弹出栈的第nextPop个元素相等，栈元素出栈，继续循环
    stack.pop()
    nextPop++
  }
  // 如果栈不为空，且压入栈都已入栈，则结果为false
  if(stack.length>0 && nextPush === pushOrder.length) return false
  return true
}

console.log( isPopOrder( [], [] ) )
console.log( isPopOrder( [ 1, 2, 3, 4, 5 ], [] ) )
console.log( isPopOrder( [], [ 1, 2, 3, 4, 5 ] ) )
console.log( isPopOrder( [ 1, 2, 3, 4, 5 ], [ 4, 5, 3, 1, 2 ] ) )
console.log( isPopOrder( [ 1, 2, 3, 4, 5 ], [ 4, 5, 3, 2, 1 ] ) )
console.log( isPopOrder( [ 1, 2, 3, 4, 5 ], [ 5,4,3,2,1 ] ) )