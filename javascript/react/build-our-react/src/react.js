const element = {
  type: 'h1',
  props: {
    title: 'hello',
    children: 'Hello'
  }
}

const node = document.createElement(element.type)
node.title = element.props.title
const text = document.createTextNode('')
text.nodeValue = element.props.children
node.appendChild(text)

const app = document.getElementById('app')
app.appendChild(node)