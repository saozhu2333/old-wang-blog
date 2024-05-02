### The background color moves with the image

principle：

::: tip
Obtain the 'img' file data, draw the 'img' onto the 'canvas' to obtain information on each pixel, and use color aggregation algorithms to obtain the top three main colors.
Due to its complexity, obtaining the three main colors directly uses the third-party library 'ColorThief'
:::

```js

//Mainly using 'colorthief' code
//Listen to the move in method to change the element style
htmldiv.addEventListener('mouseover',async function(e){
    if(e.target.className==='Htmldiv'){
        return
    }
    //Because 'colorthief' returns a 'promise', add 'await'. The first parameter is' img ', and the second parameter is to obtain the three main colors
    const colors= await colorThief.getPalette(e.target,3)
    //After obtaining, use string concatenation to deconstruct three colors for background color modification operations
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

 [Demonstration case](https://tutouguai.cn/PressDemo/one/index.html)