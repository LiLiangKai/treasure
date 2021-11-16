interface IPerson {
  age: number
  name: string
}

type TLevel = 'boss' | 'manager' | 'staff'

const users: Record<TLevel, IPerson> = {
  boss: { age: 40, name: 'Jack' },
  manager: { age: 34, name: 'Mark' },
  staff: { age: 27, name: 'John' }
}

users.boss