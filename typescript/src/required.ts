interface IProps {
  a?: number
  b?: string
}

const p1: IProps = {
  a: 1
}

const p2: Required<IProps> = {
  a: 1
}