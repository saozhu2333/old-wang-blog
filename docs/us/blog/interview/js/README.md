---
sidebar: auto
---


# Interview questions

## JS

### 1、What are the data types of JavaScript

```text
basic：undefined、null、boolean、Number、String、Symbol、Bigint
complex：Array、Object、Function
```

### 2、How to determine the data type of (JavaScript)

```text
1、basic: typeof
typeof true //“boolean”
2、complex: instanceof
const obj={}
obj instanceof Object //true
3、Object.prototype.toString.call()
4、constructor
```

### 3、Why is 0.1+0.2 not equal to 0.3 (explain the principle)

```text

The data of type (number) in JavaScript is stored in memory as double precision floating-point, following the (ieee 754) standard. Since converting 0.1 to binary is an infinite loop, the number of bits stored in memory is limited, so precision will be lost the first time. When performing an add operation at 0.1+0.2, the order needs to be aligned. The order of 0.1 is smaller than 0.2, so the tail of 0.1 needs to be shifted to the right, which can also cause accuracy loss and ultimately result in 0.1+0.2 not equal to 0.3
```

### 4、List host objects, built-in objects, native objects, and explain their definitions

```text
1. Host objects are objects provided by the hosting environment of JavaScript, such as: (window), (document), (XMLHttpRequest), (console)
2. Built in objects that do not require specific host environment support, such as: (Object), (Array), (String), (Date), (Math)
3. Native objects that can be directly accessed and used by JavaScript engines, such as: (Number), (Boolen), (Symbol), (Function), (Error)
```

### 5、=== And ==  (difference)

```text
===Both and==are comparison operators used to determine whether two variables are equal
===It is a strict equality judgment: comparing the values of two variables to ensure they are completely equal, including their types,
==It is a loose equality judgment: if the type is different, first convert the variable and compare two values
```

### 6、null and undefined (difference)

```text
The (null) value represents an empty object pointer;
(undefined) When a variable is declared using (var) or (let) but not initialized, it is equivalent to assigning a value to the variable (undefined)
```

### 7、Under what circumstances will it return (undefined)

```text
1. When accessing a declared but unassigned variable
2. When accessing a variable assigned as (undefined)
3. When accessing properties that do not exist in an object
4. When calling a function without (return)
5. When calling a (return) function with no content
```