# React 知识

## createElement

```js
function createElement(type, config, ...children): ReactElement
```

参数：
- `type`
- `config` - 对于config中的`key`, `ref`, `self`, `source` 会被提取出来，不作为创建的组件的props。
- `children` - children可以是一个或多个

```js
export function createElement(type, config, children) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    // 检测是否有ref，提取出ref
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    // 检测是否有key，提取出key
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  // children参数可以是一个或多个，如果指定则直接作为新创建的组件的子组件，覆盖掉config中存在children
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // 传入的type是组件，判断是否有`defaultProps`
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
```

## Virtual DOM

## 类组件和函数式组件

## 组件声明周期

## hooks

## fiber