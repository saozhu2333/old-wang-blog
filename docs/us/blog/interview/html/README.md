---
sidebar: auto
---


# Interview questions

## HTML+CSS

### 1、What is BFC? How to trigger it? What are the characteristics? How to solve the collapse of outer edge distance?

```text
BFC:Block Formatting Context,Simply put, it is an independent rendering area，Ensure that the internal sub elements do not affect the external elements,The outer margins of different BFC boxes will not overlap or penetrate

How to trigger BFC: 1、'Float' is not 'none' 2、'Position' is not 'static' or 'relative' 3、'display' is 'inline-block'、'flex'、'inline-flex' 4、'overflow' is 'hidden'

```



### 2、How can CSS hide overflow content? Explain the difference between different values of overflow

```text
(overflow) can hide overflow content. The default value is (visible) overflow, (hidden) overflow content hiding, (scroll) add scroll bar, and (auto) only add scroll bar when overflow exists
```
