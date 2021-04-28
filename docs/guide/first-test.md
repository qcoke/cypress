## 环境准备
```shell
mkdir test-demo && cd test-demo
# 使用 npm init 来初始化一个工程
npm init
```

如下图：
<img :src="$withBase('/imgs/npm_init.png')" alt="创建工程">

开始安装 Cypress
```shell
npm install cypress
```
<img :src="$withBase('/imgs/install_cypress.png')" alt="开始安装 Cypress">

打开测试工程根目录的 package.json 修改 script，方便我们快速的启动 Cypress 工程
```json
...
"scripts": {
  "cypress": "cypress open"
},
...
```

测试 Cypress 环境

<img :src="$withBase('/imgs/cypress_open.gif')" alt="测试 Cypress 环境">

## 开始编写
环境准备完毕，接下来，我们开始编写我们的第一个测试用例。首先，cypress/integration 文件下新建一个文件 hpyz1/login.spec.js
<img :src="$withBase('/imgs/create_file.png')" alt="新建测试用例">
<img :src="$withBase('/imgs/create_first.png')" alt="新建测试用例">

我们需要验证以下几种情况：
- 首先通过浏览器打开网址 http://owner3.smlm.songmingkeji.com:30000/auth/#/
- 完全不输入用户名、密码、验证码模拟登录，界面上有且需要三个红框提示用户需要输入相关错误提示。
- 清理上一次输入，模拟用户输入一个错误的验证码，界面需要提示，请输入正确的验证码。
- 清理上一次输入，模拟用户输入一组错误的用户名和密码，界面上需要显示一个弹出窗，提示：”用户名或密码错误“ 的提示。
- 输入正确的登录信息，界面跳转进入系统主页。

然后我们可以开始编写以下的代码：
```javascript
/*
 * author:      liucan
 * email:       33370733@qq.com
 * description: 系统登录
 */

context('系统登录测试', () => {
  const userName = 'admin', passRight = '123456', passError = '666666';

  // 首先打开一个网页
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('http://owner3.smlm.songmingkeji.com:30000/auth/#/');
  })

  it('完全不输入用户名、密码、验证码模拟登录，界面上有且需要三个红框提示用户需要输入相关错误提示。', () => {
    cy.get('.login-submit').click();
    cy.get('.el-form-item.is-error .el-input__inner').should('have.length', 3);
  }) 
  
  it('模拟用户输入一个错误的验证码，界面需要提示，请输入正确的验证码。', () => {
    // 模拟输入
    cy.get('input[type]').eq(0).type(userName);
    cy.get('input[type]').eq(1).type(passRight);
    cy.get('input[type]').eq(2).type("222222");
    cy.get('.login-submit').click();
    // 这里有一个下滑的动画，虽然可以判断成功，但是无法在界面截图中截取，稍微延迟一秒钟。
    cy.wait(500);
    cy.get('.el-message--error').should('have.text', '验证码不正确');
  });

  it('模拟用户输入一组错误的用户名和密码，界面上需要显示一个弹出窗，提示：”用户名或密码错误“ 的提示', () => {
    cy.get('input[type]').clear();
    cy.get('input[type]').eq(0).type(userName);
    cy.get('input[type]').eq(1).type(passError);
    // 暂停一下，无法验证验证码
    cy.pause();
    cy.get('.login-submit').click();
    cy.wait(500);
    cy.get('.el-message--error').should('have.text', '用户名或密码错误');
  });

  it('输入正确的登录信息，界面跳转进入系统主页', () => {
    cy.get('input[type]').clear();
    cy.get('input[type]').eq(0).type(userName);
    cy.get('input[type]').eq(1).type(passRight);
    // 暂停一下，无法验证验证码
    cy.pause();
    cy.get('.login-submit').click();
    cy.url().should("equal", "http://owner3.smlm.songmingkeji.com:30000/sys/#/default")
  });
});
```