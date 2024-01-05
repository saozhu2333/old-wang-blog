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

## JS

### 1、javascript的数据类型有哪些

```text
基本类型：undefined、null、boolean、Number、String、Symbol、Bigint
引用类型：Array、Object、Function
```

### 2、如何判断javascript的数据类型

```text
1、基本类型 typeof
typeof true //“boolean”
2、引用类型 instanceof
const obj={}
obj instanceof Object //true
3、Object.prototype.toString.call()
4、constructor
```

### 3、0.1+0.2为什么不等于0.3(解释原理)

```text
js中number类型的数据都是双精度浮点型保存在内存中的，遵循的是ieee754标准，由于0.1转化为2进制是一个无限循环的，但是内存保存的位数有限，所以第一次这里会精度丢失。在进行0.1+0.2时，在执行加操作时要对阶，0.1的阶数比0.2小，所以0.1的尾数要右移，所以这里也会造成精度丢失，最后导致了0.1+0.2不等于0.3
```

### 4、列举宿主对象、内置对象、原生对象并说明其定义

```text
1、宿主对象，是由js的宿主环境提供的对象例如：window,document,XMLHttpRequest,console
2、内置对象，无需特定的宿主环境支持，例如：Object,Array,String,Date,Math
3、原生对象，可以由js引擎直接访问和使用，例如：Number，Boolen，Symbol,Function,Error
```

### 5、===和==的区别

```text
===和==都是比较运算符，用于判断两个变量是否相等
===是严格相等判断：比较两个变量的值是否完全相等，包括类型，
==是宽松相等判断：类型不一样先将变量进行类型转换，在比较两个值
```

### 6、null和undefined的区别

```text
null值表示一个空对象指针；
undefined使用var或let声明了变量但是没有初始化时相当于给变量赋值了undefined
```

### 7、什么情况下会返回undefined

```text
1、当访问一个声明但是未赋值的变量
2、当访问一个赋值为undefined的变量
3、当访问对象中不存在的属性时
4、当调用一个没有return的函数
5、当调用一个return没有内容的函数
```

