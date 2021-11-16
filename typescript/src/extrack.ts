type T3 = Extract<'a' | 'b' | 'c', 'c'>

type T4 = Extract<number | string | (() => void), Function>