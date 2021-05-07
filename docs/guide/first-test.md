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

环境准备完毕，接下来，我们开始编写我们的第一个测试用例。首先，删除掉不用的测试用例 cypress/integration/examples 文件夹，cypress/integration 文件下新建一个文件 hpyz1/login.spec.js
<img :src="$withBase('/imgs/create_file.png')" alt="环境准备开始">
<img :src="$withBase('/imgs/create_first.png')" alt="创建第一个测试文件">

我们需要达成的验证目标：
- 首先通过浏览器打开网址 http://owner3.smlm.songmingkeji.com:30000/auth/#/
- 完全不输入用户名、密码、验证码模拟登录，界面上有且需要三个红框提示用户需要输入相关错误提示。
- 清理上一次输入，模拟用户输入一个错误的验证码，界面需要提示，请输入正确的验证码。
- 清理上一次输入，模拟用户输入一组错误的用户名和密码，界面上需要显示一个弹出窗，提示：”用户名或密码错误“ 的提示。
- 输入正确的登录信息，界面跳转进入系统主页。
首先，我们先把网站的基础域名和浏览器窗口的分辨率设置完毕，我们找到 /cypress.json 文件。添加如下几行代码：
```json
"baseUrl": "http://owner3.smlm.songmingkeji.com",
"viewportWidth": 1400,
"viewportHeight": 900,
"defaultCommondTimeout": 10000
```
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
  before(() => {
    cy.viewport(1920, 1080);
    cy.visit('/auth/#/');
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
    cy.saveInfo();
    // 保存令牌，待用
    expect(sessionStorage.getItem('smlm-token')).to.not.equal(null || undefined);
  });
});
```
这里我们注意调用了一个 ```cy.saveInfo();``` 它调用的就是我们在 support/commands.js 中编写的用例代码。

我们来查看 commands 中所作的事件

```javascript
let SESSION_STORAGE_MEMORY = {};
let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveInfo", () => {
  // 保持 COOKEIS 不变
  Cypress.Cookies.preserveOnce('smlm-refresh-token', 'smlm-access-token');
  Object.keys(sessionStorage).forEach(key => {
    SESSION_STORAGE_MEMORY[key] = sessionStorage[key];
  });
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreInfo", () => {
  Object.keys(SESSION_STORAGE_MEMORY).forEach(key => {
    sessionStorage.setItem(key, SESSION_STORAGE_MEMORY[key]);
  });
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
```
这里有 ```Cypress.Cookies.preserveOnce('smlm-refresh-token', 'smlm-access-token');``` 方法，用于维护 jwt 的登录信息
保持 Cookies 的值。由业务的需要，我们还需要保持当前用户的 sessionStore，localStore 等数据信息。
