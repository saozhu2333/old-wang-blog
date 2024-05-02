### websocket心跳检测

 #### 心跳检测

websocket 在使用过程中，如果遭遇网络问题等，这个时候服务端没有触发`onclose`事件，这样会产生多余的连接，并且服务端会继续发送消息给客户端，造成数据丢失。因此需要心跳检测机制来检测客户端和服务端是否处于正常连接的状态。

#### 如何进行心跳检测以及遭遇后的重连

1、每隔一段指定的时间（计时器），向服务器发送一个数据，服务器收到数据后再发送给客户端，正常情况下客户端通过`onmessage`事件是能监听到服务器返回的数据的，说明请求正常。

2、如果再这个指定时间内，客户端没有收到服务器端返回的响应消息，就判定连接断开了，使用`websocket.close`关闭连接。

3、这个关闭连接的动作可以通过`onclose`事件监听到，因此在 onclose 事件内，我们可以调用`reconnect`事件进行重连操作。

 ```js

var websocket
var isReconnect = false
var timeReconnect = null
var pathObj = null
//创建socket
function createWebsocket(path){
    try{
        //建立socket连接、保存传入的url以及接收消息时要执行的方法
        websocket = new WebSocket(path.url)
        pathObj = path
    }catch(err){
             console.log(err)
             reconnect()
    }
    init()
}
//初始化
function init(){
     //连接成功建立的回调方法
        websocket.onopen = function (event) {
            console.log("WebSocket:已连接");
            //心跳检测重置
            heartCheck.reset().start();
        };

        //接收到消息的回调方法
        websocket.onmessage = function (event) {
            pathObj.showNotify(event.data);
            console.log("WebSocket:收到一条消息", event.data);
            heartCheck.reset().start();
        };

        //连接发生错误的回调方法
        websocket.onerror = function (event) {
            console.log("WebSocket:发生错误");
            reconnect();
        };

        //连接关闭的回调方法
        websocket.onclose = function (event) {
            console.log("WebSocket:已关闭");
            heartCheck.reset();//心跳检测
            reconnect();
        };

        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            websocket.close();
        };

        //关闭连接
        function closeWebSocket() {
            websocket.close();
        }

        //发送消息
        function send(message) {
            websocket.send(message);
        }
}
//重连
function reconnect(){
    //防止重复重连
    if(isReconnect){
        return
    }
    isReconnect = true
    timeReconnect && clearTimeout(timeReconnect)
    timeReconnect=setTimeout(function(){
        createWebsocket(pathObj)
    },3000)
}
//
var heartCheck = {
    timeout:10000,
    timeoutObj:null,
    serverTimeoutObj:null,
    //重置状态
    reset:function (){
       clearTimeout(this.timeoutObj)
       clearTimeout(this.serverTimeoutObj)
       this.timeoutObj = null
       this.serverTimeoutObj=null
       return this
    },
    start:function(){
        var self = this
        //重置定时器
        this.timeoutObj&&clearTimeout(this.timeoutObj)
        this.serverTimeoutObj&&clearTimeout(this.serverTimeoutObj)
        //心跳检测
        this.timeoutObj = setTimeout(function(){
            websocket.send('检测')
             self.serverTimeoutObj = setTimeout(function(){
                 //到时间没有重置该方法则代表服务端已经断开 需要关闭
                 console.log("执行了关闭")
                 websocket.close()
             },self.timeout+1000)
        },this.timeout)
    }
}

export default {createWebsocket}
 ```