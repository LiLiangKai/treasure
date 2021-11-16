interface IInfo {
  title: string
  desc: string
  collect: number
}

const info: Omit<IInfo, 'collect'> = {
  title: 'title',
  desc: 'desc'
}

textInfo.desc

