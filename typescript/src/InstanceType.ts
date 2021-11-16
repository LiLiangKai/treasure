class C {
  name: string
  age: number
  
  getName () {
    return this.name
  }

  getAge () {
    return this.age
  }
}
type T14 = InstanceType<typeof C>
// type T14 = C