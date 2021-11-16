interface IInfo {
  title: string
  desc: string
  collect: number
}

type TTextInfo = Pick<IInfo, 'title'|'desc'>

const textInfo: TTextInfo = {
  title: 'title',
  desc: 'desc'
}

textInfo.desc


interface Example {
  a: string;
  b: string | number;
  c: () => void;
  d: {};
}

type ConditionalPick<Type, Condition> = {
  [key in keyof Type as Type[key] extends Condition ? key : never]: Type[key]
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, Function>

