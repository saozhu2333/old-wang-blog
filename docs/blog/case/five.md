# github/gitee webhooks+node进行vue简单热部署

### 原理：

本地代码push → 远程库收到push后通过githooks去发送一个post请求给对应服务器 → 服务器更新

### 准备步骤:

#### 1.在linux中配置nodejs环境

可以通过官网下载压缩包在解压进行软连接进行安装

[Linux系统安装NodeJs_linux安装nodejs-示例](https://blog.csdn.net/TanHao8/article/details/130806432)

(我有点懒所以直接在linux上安装nvm来对nodejs进行管理了，操作如下)

```bash
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# download and install Node.js
nvm install 20
# verifies the right Node.js version is in the environment
node -v # should print `v20.13.1`
# verifies the right NPM version is in the environment
npm -v # should print `10.5.2`
```

##### 我安装nodejs时遇到的问题(如果没问题可略过该步骤)

在安装过程中由于我使用的是centos7 安装的20版本的nodejs，GLIBC 库不兼容，所以对对应库进行升级可参考以下链接

[CentOS低版本系统的 GLIBC 版本过低](https://www.cnblogs.com/banger/p/18083574)

安装后可能会存在en_us.utf8编码数据库异常问题，我是出了这个问题，不知道是不是因为升级这些东西导致的，最后重新生成解决的命令如下

```
localedef -v -c -i en_US -f UTF-8 en_US.UTF-8
```





#### 2.安装pm2包管理器来对要执行的脚本文件进行管理

```bash
//由于已经安装node环境所以直接使用npm安装
npm install -g pm2
```

#### 3.安装git

```bash
sudo yum install git
//查看是否安装成功-打印一下版本号
git --version
//设置git名字和邮箱
git config --global user.name "Name"
git config --global user.email "youremail@163.com"
//生成ssh秘钥
//-t 来指定密钥类型，这里使用的是rsa
//-C 来指定在密钥中的一个注释字段
ssh-keygen -t rsa -C "注释"

//生成的秘钥一般在根目录用户文件夹下的.ssh文件夹下
//复制rsa秘钥内容将内容粘贴至要热部署的仓库中给对应仓库添加公钥

//添加后使用git clone **** 测试在服务器可以成功拉取代码
```



### 开始部署

使用http模块启动一个代理服务器监听端口

使用gitee-webhook-handler第三方库监听对应的钩子，这里监听push就可以了，监听后使用exec去执行对应的脚本文件去远程库拉取代码，打包代码，以下是简易代码

（github为：github-webhook-handler）

#### app.js

```js
// *****新建 index.js 

//引入 node http模块  
var http = require('http')
//引入 gitee-webhook-handler依赖
var createHandler = require('gitee-webhook-handler')
const { exec } = require('child_process');
//path： 地址后面路径 http://127.0.0.1:9000/webhooks   secret:填写 gitee || github 配置的webHook密码
var handler = createHandler({ path: '/webhooks', secret: '***' })

//引入 child_process  创建一个子进程 函数
function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function () { callback(resp) });

}
//创建一个 HTTP 代理服务器
http.createServer(function (req, res) {
  // handler  传入 req, res
  handler(req, res, function (err) {
    // 发生错误 error
    res.statusCode = 404
    res.end('no such location')
  })

}).listen(9001, function () {
  console.log((new Date()) + 'WebHook启动运行端口：', 9001);
})
//监听push钩子 时触发函数
handler.on('Push Hook', function (event) {

 
  // vue项目地址唯一标识,具体位置可查看gitee/github的webhooks返回参数
if(event.payload.project.path_with_namespace === '********'){
  buildvue(event)

}


  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})
//监听Issue 
handler.on('Issue Hook', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})

//监听发生错误
handler.on('error', function (err) {
  console.error('Error:', err.message)
})


function buildvue(e){
   // 执行 sh 文件
   console.log('执行server脚本中----')
    //可以做成一个脚本文件，也可以通过webhooks传递的参数一条一条去执行
  exec('sh ./build.sh')
  
}
```

#### build.sh

```bash
echo "开始部署"
//进入对应文件夹(绝对路径)
cd "*****"

echo "拉取代码"
git pull origin master

npm i

npm run build:stage

echo "完成"
//可以使用mv 或者cp命令去将打包好的目录更换到任意位置
//cp [选项] 源文件 目标文件
//mv 源文件 目标文件
```

#### 使用pm2管理器来运行app.js脚本

```bash
pm2 start app.js --name webhooks



//查看脚本运行日志

pm2 logs webhooks
```



#### 添加webhooks

1.打开对应gitee/github项目

2.进入管理/setting

3.选择webhooks->输入服务器地址与app.js中的路径和webhooks密码，可以监听所有hook也可以监听单个

注:服务器端要放行脚本对应的端口号







###### 这些操作完成后你就可以push一下代码去看看是否可以生成对应的打包文件