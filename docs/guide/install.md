### 安装

#### 操作系统需求
- MacOS 10.9+ (64-bit only)
- Linux Ubuntu 12.04 and above, Fedora 21 and Debian 8 (64-bit only)
- Windows 7+
#### Node.js 
安装好 NodeJS 之后，请更新您的 npm,yarn 到最新版本，然后运行。

```bash
mkdir test-demo && cd test-demo
npm install cypress --save-dev
```
完毕之后，打开目录中的 package.json 修改 script 节点，添加 test:cypress open 然后在终端运行
```npm run test```您将看到如下的过程：

<img :src="$withBase('/imgs/install.gif')" alt="Cypress安装">

看到以上操作内容，则表示安装成功。

------
#### PS: NodeJS的安装
[NodeJS下载和安装](https://nodejs.org/en/)