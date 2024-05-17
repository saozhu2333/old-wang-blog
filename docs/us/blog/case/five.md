# Github/gitee webhooks+node for hot deployment of Vue

### principle：


Local code 'push' → After receiving a 'push', the remote library sends a 'post' request to the corresponding server through 'Githoks' → Server updates

### Preparation steps:

#### 1.Configuring Node.js Environment in Linux

You can download the compressed file from the official website and install it through a soft connection after decompression

[Linux System Installation NodeJs Linux Installation Nodejs Example](https://blog.csdn.net/TanHao8/article/details/130806432)

(I'm a bit lazy, so I just installed NVM on Linux to manage Nodejs. The operation is as follows)

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

##### The problem I encountered while installing nodejs (if there are no issues, you can skip this step)

During the installation process, as I am using the '20' version of 'nodejs' installed in' centos7 ', the' GLIBC 'library is not compatible. Therefore, to upgrade the corresponding library, please refer to the following link

[The GLIBC version of the CentOS lower version system is too low](https://www.cnblogs.com/banger/p/18083574)

After installation, there may be an abnormal issue with the 'en_us.utf8' encoding database. I am not sure if this issue is caused by upgrading these things. Finally, the command to resolve it is regenerated as follows

```
localedef -v -c -i en_US -f UTF-8 en_US.UTF-8
```





#### 2.Install the PM2 package manager to manage the script files to be executed

```bash
//Since the node environment has already been installed, NPM installation can be used directly
npm install -g pm2
```

#### 3.install git

```bash
sudo yum install git
//Check if installation was successful - print the version number
git --version
//Set git name and email
git config --global user.name "Name"
git config --global user.email "youremail@163.com"
//Generate SSH key
//-t To specify the key type, rsa is used here
//-C To specify a comment field in the key
ssh-keygen -t rsa -C "annotation"

//The generated key is usually located in the. ssh folder under the root user folder
//Copy the content of the rsa key, paste the content into the warehouse to be hot deployed, and add the public key to the corresponding warehouse

//After adding, use 'git clone * * * *' to test that the code can be successfully pulled from the server
```



### Start deployment

Start a proxy server to listen on a port using the HTTP module

Use the gitee webhook handler third-party library to listen to the corresponding hook. Here, simply listen to the push button. After listening, use exec to execute the corresponding script file to remotely retrieve and package the code. The following is a simple code


(Github is: Github webhook handler)

#### app.js

```js
// *****create index.js 

//import node http module  
var http = require('http')
//import gitee-webhook-handler
var createHandler = require('gitee-webhook-handler')
const { exec } = require('child_process');
//path：Path after address http://127.0.0.1:9001/webhooks Secret: Fill in the webHook password for gitee | | github configuration
var handler = createHandler({ path: '/webhooks', secret: '***' })

//Introducing child_process to create a subprocess function
function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function () { callback(resp) });

}
//Create an HTTP proxy server
http.createServer(function (req, res) {
  // handler  afferent req, res
  handler(req, res, function (err) {
    //  error
    res.statusCode = 404
    res.end('no such location')
  })

}).listen(9001, function () {
  console.log((new Date()) + 'WebHook Start Run Port:', 9001);
})
//Trigger function when listening to push hook
handler.on('Push Hook', function (event) {

 
  // The Vue project address is a unique identifier, and the specific location can be found in the webhooks return parameters of Gitee/Github
if(event.payload.project.path_with_namespace === '********'){
  buildvue(event)

}


  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})
//listen Issue 
handler.on('Issue Hook', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})

//listen error
handler.on('error', function (err) {
  console.error('Error:', err.message)
})


function buildvue(e){
   // Execute sh file
   console.log('Execute server script----')
    //It can be made into a script file or executed one by one through the parameters passed through webhooks
  exec('sh ./build.sh')
  
}
```

#### build.sh

```bash
echo "Start deployment"
//Enter the corresponding folder (absolute path)
cd "*****"

echo "Pull Code"
git pull origin master

npm i

npm run build:stage

echo "complete"
// You can use the mv or cp command to move the packaged directory to any location
// cp [options] source_file target_file
// mv source_file target_file
```

#### Use pm2 manager to run the app.js script

```bash
pm2 start app.js --name webhooks

// View script runtime logs

pm2 logs webhooks
```



#### Add webhooks

1.Open the corresponding Gitee/GitHub project

2.Go to Management/Settings

3.Select webhooks -> Enter the server address, the path from app.js, and the webhooks password. You can listen to all hooks or just a single hook

Note: The server must allow the port number corresponding to the script







###### After completing these operations, you can push the code to see if the corresponding packaged files are generated