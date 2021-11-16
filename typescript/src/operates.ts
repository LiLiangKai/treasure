interface IPoint {
  x: number
  y: number
  z: number
}
type TP = keyof IPoint
// 等同 'x' | 'y' | 'z'

type TCopyPoint = {
  [key in keyof IPoint]: IPoint[key]
}

interface Animate {
  run: () => void
}
interface Dog extends Animate {}

type A1 = Dog extends Animate ? number : string
// type A1 = number

type A2 = Error extends Animate ? number : string
// type A2 = string

type A3 = keyof Animate extends string | number ? string : number