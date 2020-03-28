# Javascript 设计模式

> 设计模式的定义：在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案

## 设计模式

- [单例模式](./javascript/design/single/)
- [策略模式](./javascript/design/)
- [代理模式](./javascript/design/)
- [发布-订阅模式](./javascript/design/)
- [命令模式](./javascript/design/)
- [组合模式](./javascript/design/)
- [模板方法模式](./javascript/design/)
- [享元模式](./javascript/design/)
- [职责模式](./javascript/design/)
- [中介者模式](./javascript/design/)
- [装饰者模式](./javascript/design/)
- [状态模式](./javascript/design/)

## 设计原则和编程技巧

### 单一职责（SRP）原则

> 一个对象（方法/函数）只做一件事情。

如果一个方法承担了过多的职责，那么在需求的变化过程中，该方法被改写的可能性就会变大。

但需要注意的是，并不少所有职责都应该一一分离。如果随着需求的变化，某些职责总是同时变化，此时可以不用分离他们。

SRP原则的优点是降低了单个对象或方法的复杂度，有助于代码的复用。同时，当一个职责需求发生变更也不会影响到其他职责；但SRP原则也存在缺点，最明显的是增加了编写代码的复杂度，有时可能会降低使用的方便性。

### 最少知识（LKP）原则

