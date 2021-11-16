type T6 = Parameters<() => void>
// type T6 = []

type T7 = Parameters<(text: string) => string>
// type T7 = [text: string]

declare function f1(arg: { a: number; b: string }): void;
type T8 = Parameters<typeof f1>
// type T8 = [arg: {a: number; b: string;}]

type T9 = ConstructorParameters<RegExpConstructor>
// type T9 = [pattern: string | RegExp, flags?: string]

type T10 = ConstructorParameters<FunctionConstructor>
// type T10 = string[]

class Person {
  constructor (name, age) {
  }
}
type T11 = ConstructorParameters<typeof Person>
// type T11 = [name: any, age: any]

type T12 = ReturnType<() => string>
// type T12 = string

type T13 = ReturnType<() => {name: string, age: number}>
// type T13 = { name: string; age: number; }