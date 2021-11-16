type T1 = Exclude<'a'|'b'|'c', 'c'>

type T2 = Exclude<number|string|(() => void), Function>