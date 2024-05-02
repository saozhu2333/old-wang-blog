### Drag and drop sorting

#### Final effect
::: tip

This effect is the final result after adding the 'flip' effect. The last step of this article did not add 'flip'. For more information, please refer to 'flip'

:::

 [Demonstration case](https://tutouguai.cn/PressDemo/two/index.html)
 
 #### achieve

1、Add drag and drop attributes to each li

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

2、When dragging, the original position is changed to a ghost by changing the CSS

::: warning 

Asynchronous operation needs to be added because the style of dragging is obtained based on the moment of dragging, so modifying CSS needs to be delayed

:::

```js
//Using a proxy to listen and drag
list.ondragstart = (e)=>{
    //Add an asynchronous operation because the style of the drag is the style of the original element at the moment of the drag. Adding an asynchronous operation will not change the style in advance
    setTimeout(()=>{
        e.target.classList.add('moving')
    },0)
}
```

3、Trigger position change when dragging to other targets

NowListNode: The currently being dragged element stored during drag

```js
//Trigger when listening and dragging to the target
list.ondragenter = (e)=>{
    //Exclude moving above the parent element and its own element
    if(e.target=== list || e.target === nowListNode){
        return
    }
    //Convert all child elements into an array, determine the size of the index of the moved element and the index of the covered element, and determine whether to move downwards or upwards at this time
    const children=Array.from(list.children)
    const nowNodeIndex= children.indexOf(nowListNode)
    const targetIndex=children.indexOf(e.target)
    if(targetIndex>nowNodeIndex){
        //Move down to add it before the next element of that element
        list.insertBefore(nowListNode,e.target.nextElementSibling)
    }else{
        //Move up to add it to the front of the element
        list.insertBefore(nowListNode,e.target)
    }
}
```

4、After dragging, change CSS back

```js
list.ondragend=(e)=>{
    e.target.classList.remove('moving')
}
```

5、(1) The drag operation does not allow dragging onto other elements, so some browsers may have animations that move the drag style back to its original position. This can be resolved by blocking default events. (2) The default drag operation is copy, and some browser mice will change to a plus sign, so change its behavior to move

```js{12,14-16,19}
const list = document.querySelector('.list')
let nowListNode
//Using a proxy to listen and drag
list.ondragstart = (e)=>{
    //Add an asynchronous operation because the style of the drag is the style of the original element at the moment of the drag. Adding an asynchronous operation will not change the style in advance
    setTimeout(()=>{
        e.target.classList.add('moving')
    },0)
    //Record the currently being dragged dom
    nowListNode = e.target
    //Dragging defaults to copying, and some browser mice will change to a plus sign, so change its behavior to move
    e.dataTransfer.effectAllowed = 'move'
}
list.ondragover = (e)=>{
    e.preventDefault()
}
//Trigger when listening and dragging to the target
list.ondragenter = (e)=>{
    e.preventDefault()
    //Exclude moving above the parent element and its own element
    if(e.target=== list || e.target === nowListNode){
        return
    }
    //Convert all child elements into an array, determine the size of the index of the moved element and the index of the covered element, and determine whether to move downwards or upwards at this time
    const children=Array.from(list.children)
    const nowNodeIndex= children.indexOf(nowListNode)
    const targetIndex=children.indexOf(e.target)
    if(targetIndex>nowNodeIndex){
        //Move down to add it before the next element of that element
        list.insertBefore(nowListNode,e.target.nextElementSibling)
    }else{
        //Move up to add it to the front of the element
        list.insertBefore(nowListNode,e.target)
    }
}
//Trigger after listening and dragging ends
list.ondragend=(e)=>{
    e.target.classList.remove('moving')
}
```





