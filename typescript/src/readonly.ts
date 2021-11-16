interface IMeta {
  id: string
}
const meta: Readonly<IMeta> = {
  id: '001'
}

meta.id = '002'
// 无法分配到 "id" ，因为它是只读属性。