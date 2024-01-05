---
sidebar: auto
---


# 面试题

## HTML+CSS

### 1、什么是BFC?如何触发？有什么特点？如何解决margin“塌陷”

```text
BFC:块级格式化上下文,通俗来讲就是一个独立的渲染区域，让内部的子元素不会影响到外面的元素,不同的BFC盒子的margin不会重叠和穿透

触发BFC: 1、float不为none 2、position不为static或relative 3、display值为inline-block、flex、inline-flex 4、overflow为hidden

```



### 2、css如何隐藏溢出内容？说一下overflow不同值的区别

```text
overflow 可以进行溢出内容隐藏，默认值(visible)溢出，hidden溢出内容隐藏,scroll添加滚动条,auto当存在溢出时才添加滚动条
```

