# Three.js 系列学习之基础篇

## 一、Three.js 介绍



## 二、概念

### 1、场景 `scene`

继承自 `Object3D` 对象

**常用方法和属性**

| 方法\|属性            | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| add(object)           | 添加 object 为该对象的子对象。可以添加任意数量的对象         |
| remover(object)       | 删除该对象中的 object 子对象。可以删除任意数量的对象         |
| getChildByName(name)  | 搜索对象的子对象，并返回第一个和name匹配的对象               |
| traverse((e) => void) | 在这个对象和所有的子对象上执行回调                           |
| children              | 返回一个场景中的物体对象列表                                 |
| fog                   | 定义了场景中的雾状背景类型，默认为null。（Scene对象特有）    |
| overrideMaterial      | 强制场景中的一切对象都使用该材料进行渲染，默认为null。（Scene对象特有） |



### 2、相机 `camera`



### 3、渲染器 `renderer`


### 4、几何 `geometry`



### 5、材质 `material`



### 6、光源 `light`

