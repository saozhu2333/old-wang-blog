### WebSocket Heartbeat Detection

 #### Heartbeat Detection

During the use of 'websocket', if encountering network problems, etc., the server does not trigger the 'onclose' event, which will generate extra connections and the server will continue to send messages to the client, causing data loss. Therefore, a heartbeat detection mechanism is needed to detect whether the client and server are in a normal connection state.。

#### How to perform heartbeat detection and reconnect after encountering

1. Send data to the server at specified intervals (timers), and the server will receive the data before sending it to the client. Under normal circumstances, the client can listen to the data returned by the server through the 'onmessage' event, indicating that the request is normal.
2. If the client does not receive a response message from the server within the specified time, it is determined that the connection has been disconnected and closed using 'websocket. close'.
3. The action of closing the connection can be detected through the 'onclose' event, so within the onclose event, we can call the 'reconnect' event to perform a reconnection operation.

 ```js

var websocket
var isReconnect = false
var timeReconnect = null
var pathObj = null
//Create a socket
function createWebsocket(path){
    try{
        //Establishing a socket connection, saving incoming URLs, and executing methods when receiving messages
        websocket = new WebSocket(path.url)
        pathObj = path
    }catch(err){
             console.log(err)
             reconnect()
    }
    init()
}
//initialization
function init(){
     //Callback method for successfully establishing a connection
        websocket.onopen = function (event) {
            console.log("WebSocket:已连接");
            //心跳检测重置
            heartCheck.reset().start();
        };

        //Callback method for receiving messages
        websocket.onmessage = function (event) {
            pathObj.showNotify(event.data);
            console.log("WebSocket:收到一条消息", event.data);
            heartCheck.reset().start();
        };

        //Callback method for connection errors
        websocket.onerror = function (event) {
            console.log("WebSocket:发生错误");
            reconnect();
        };

        //Callback method for connection closure
        websocket.onclose = function (event) {
            console.log("WebSocket:已关闭");
            heartCheck.reset();//心跳检测
            reconnect();
        };

        //Listen for window closure events. When the window is closed, actively close the websocket connection to prevent closing the window before the connection is disconnected, and the server will throw an exception.
        window.onbeforeunload = function () {
            websocket.close();
        };

        //Close Connection
        function closeWebSocket() {
            websocket.close();
        }

        //send message
        function send(message) {
            websocket.send(message);
        }
}
//Reconnection
function reconnect(){
    //Prevent duplicate reconnection
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
    //reset state 
    reset:function (){
       clearTimeout(this.timeoutObj)
       clearTimeout(this.serverTimeoutObj)
       this.timeoutObj = null
       this.serverTimeoutObj=null
       return this
    },
    start:function(){
        var self = this
        //Reset Timer 
        this.timeoutObj&&clearTimeout(this.timeoutObj)
        this.serverTimeoutObj&&clearTimeout(this.serverTimeoutObj)
        //Heartbeat detection
        this.timeoutObj = setTimeout(function(){
            websocket.send('检测')
             self.serverTimeoutObj = setTimeout(function(){
                 //If the method is not reset by the time, it means that the server has been disconnected and needs to be closed
                 console.log("执行了关闭")
                 websocket.close()
             },self.timeout+1000)
        },this.timeout)
    }
}

export default {createWebsocket}
 ```