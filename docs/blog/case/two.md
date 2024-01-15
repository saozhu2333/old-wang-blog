### 拖拽排序

#### 最终效果
::: tip

该效果为添加flip效果后的最终效果，本文最后一步未添加flip，如需了解可阅读flip

:::

 [演示案例](https://tutouguai.cn/PressDemo/two/index.html)
 
 #### 实现

1、给每个li添加拖拽属性

```html
<ul class="list">
        <li draggable="true">1</li>
        <li draggable="true">2</li>
        <li draggable="true">3</li>
        <li draggable="true">4</li>
        <li draggable="true">5</li>
        <li draggable="true">6</li>
</ul>
```

2、拖动时原来位置通过更改css变为虚影

::: warning 

需要添加异步操作，因为拖动的样式是根据拖动那一刻拿到的所以需要延迟修改css

:::

```js
//使用代理监听拖动
list.ondragstart = (e)=>{
    //添加一个异步操作，因为拖动的样式是拿到拖动那一刻原始元素的样式，添加异步操作这样不会提前改变样式
    setTimeout(()=>{
        e.target.classList.add('moving')
    },0)
}
```

3、拖动到其他目标时触发更换位置

nowListNode:拖动时存储的当前正在拖动的元素

```js
//监听拖动到目标时触发
list.ondragenter = (e)=>{
    //排除移动到父元素以及自身元素之上
    if(e.target=== list || e.target === nowListNode){
        return
    }
    //将所有子元素转换成数组，判断移动的下标与覆盖的元素的下标的大小，可以判断出此时是要向下移动还是向上移动
    const children=Array.from(list.children)
    const nowNodeIndex= children.indexOf(nowListNode)
    const targetIndex=children.indexOf(e.target)
    if(targetIndex>nowNodeIndex){
        //向下移动就将其加入到该元素下一个元素的前面
        list.insertBefore(nowListNode,e.target.nextElementSibling)
    }else{
        //向上移动就将其加入到该元素的前面
        list.insertBefore(nowListNode,e.target)
    }
}
```

4、拖动结束后，将css更改回来

```js
list.ondragend=(e)=>{
    e.target.classList.remove('moving')
}
```

5、（1）拖动操作不允许拖动到其他元素之上所以部分浏览器会出现拖动样式移动回原来位置的动画，通过阻止默认事件可以解决。（2）拖动操作默认为复制，部分浏览器鼠标会变成加号，所以将其行为改成move即可

```js{12,14-16,19}
const list = document.querySelector('.list')
let nowListNode
//使用代理监听拖动
list.ondragstart = (e)=>{
    //添加一个异步操作，因为拖动的样式是拿到拖动那一刻原始元素的样式，添加异步操作这样不会提前改变样式
    setTimeout(()=>{
        e.target.classList.add('moving')
    },0)
    //记录当前正在拖动的dom
    nowListNode = e.target
    //拖动默认为复制，部分浏览器鼠标会变成加号所以将其行为改成move即可
    e.dataTransfer.effectAllowed = 'move'
}
list.ondragover = (e)=>{
    e.preventDefault()
}
//监听拖动到目标时触发
list.ondragenter = (e)=>{
    e.preventDefault()
    //排除移动到父元素以及自身元素之上
    if(e.target=== list || e.target === nowListNode){
        return
    }
    //将所有子元素转换成数组，判断移动的下标与覆盖的元素的下标的大小，可以判断出此时是要向下移动还是向上移动
    const children=Array.from(list.children)
    const nowNodeIndex= children.indexOf(nowListNode)
    const targetIndex=children.indexOf(e.target)
    if(targetIndex>nowNodeIndex){
        //向下移动就将其加入到该元素下一个元素的前面
        list.insertBefore(nowListNode,e.target.nextElementSibling)
    }else{
        //向上移动就将其加入到该元素的前面
        list.insertBefore(nowListNode,e.target)
    }
}
//监听拖动结束后触发
list.ondragend=(e)=>{
    e.target.classList.remove('moving')
}
```





