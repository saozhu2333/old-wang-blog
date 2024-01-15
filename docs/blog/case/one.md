### 背景颜色跟随图片一起动

原理：

::: tip
拿到img文件数据，将img绘制到canvas上拿到每一个像素点信息，通过颜色聚合算法拿到前三种主要颜色。
因为比较复杂所以获取三种主要颜色直接采用第三方库 ColorThief 
:::

```js
//主要使用colorthief代码
//监听移入方法，去更改元素样式
htmldiv.addEventListener('mouseover',async function(e){
    if(e.target.className==='Htmldiv'){
        return
    }
    //因为colorthief会返回一个promise 所以添加await，第一个参数为img，第二个参数为获取三种主要颜色
    const colors= await colorThief.getPalette(e.target,3)
    //获取后通过字符串拼接，解构出三种颜色进行修改背景颜色操作
    const[c1,c2,c3] = colors.map(c => `rgb(${c[0]},${c[1]},${c[2]})`)
    
    urldom.forEach((res)=>{
        if(e.target.id==res.id){
            bodydom.style.backgroundImage =`linear-gradient(45deg,${c1},${c2},${c3})`
            bodydom.style.opacity=`${1}`
            res.style.transform=`scale(${1.1})`
        }else{
            res.style.opacity=`${0.2}`
        }
    })
    // console.log(urldom);
})
```

 [演示案例](https://tutouguai.cn/PressDemo/one/index.html)