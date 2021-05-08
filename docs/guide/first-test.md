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
### Cypress 工程常见初始化设置
首先，我们先把网站的基础域名和浏览器窗口的分辨率设置完毕，我们找到 /cypress.json 文件。添加如下几行代码：
```json
// 基础路径
"baseUrl": "http://owner3.smlm.songmingkeji.com",
// 浏览器视窗大小
"viewportWidth": 1400,
"viewportHeight": 900,
// 超时设置
"defaultCommondTimeout": 10000
```
具体的配置表，可以通过 Cypress 运行的主窗口 setting 标签页中查看
然后我们可以开始编写以下的代码：

### 登录模块
#### 空提交
```javascript
context('系统登录测试', () => {
  const userName = 'admin', passRight = '123456', passError = '666666';
  // 首先打开一个网页
  before(() => {
    cy.viewport(1920, 1080);
    cy.visit('/auth/#/');
  });
  
  it('完全不输入用户名、密码、验证码模拟登录，界面上有且需要三个红框提示用户需要输入相关错误提示。', () => {
    cy.get('.login-submit').click();
    cy.get('.el-form-item.is-error .el-input__inner').should('have.length', 3);
  });
});
```
#### 验证码不输入
```javascript
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
```
#### 用户名密码错误
```javascript
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
```
#### 正确登录
```javascript
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
```
这里我们注意调用了一个 ```cy.saveInfo();``` 它调用的就是我们在 support/commands.js 中编写的用例代码。我们来查看 commands 中所作的事件
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

### 系统管理模块
#### 进入系统后台管理界面
因为每个测试用例，在 Cypress.io 中是相互隔离的，为了维持浏览器测试的纯净性，在不同的测试用例调用之间。系统会清理所有的浏览器缓存以及保留的信息
而系统中使用了 JWT 的信息，我们就需要使用代码来维持当前浏览器的正确信息，防止403错误导致业务的阻塞。
```javascript
context('进入【后台管理】模块', () => {
  beforeEach(() => {
    cy.restoreInfo();
  });
  afterEach(() => {
    cy.saveInfo();
  });

  it('是否进入了系统管理界面', () => {
    // 这里偶尔会失败，暂时不清楚原因
    cy.url().should('include', '/sys/#/default');
  });
});
```
#### 判断系统界面是否正常加载
```javascript
it('是否进入了系统管理界面', () => {
    // 这里偶尔会失败，暂时不清楚原因
    cy.url().should('include', '/sys/#/default');
  });
```
#### 判断业主信息是否加载成功
```javascript
it('判断业主信息是否加载成功', () => {
  // 这里因为跳转进入的页面，可能会导致加载时长超过 4s 引发异常
  cy.get(".top-menu .el-menu-item").eq(1).click();
  // 这里有几个异步操作，直接跳转会导致失败
  cy.wait(3000).then(() => {
    cy.get('.table-info-words').should('have.length', 1);
  });
});
```
#### 区域管理模块测试
```javascript
context('区域管理测试组', () => {
  it('是否可以进入区域管理', () => {
    cy.visit('sys/#/basic/region');
    cy.url().should('include', 'sys/#/basic/region');
  });

  it('新增一个区域', () => {
    cy.get('.avue-crud__menu .el-button--primary').eq(0).click();
    cy.get('.avue-crud__dialog__menu .el-dialog__title').should('have.text', '新 增');
    // 等待 Dialog 的加载动画完成
    cy.wait(2000).then(() => {
      treeNodeName = Mock.mock('@csentence');
      cy.get('.avue-input').eq(0).type(treeNodeName);
      cy.get('.avue-input').eq(1).click();
      cy.get(".el-tree-node").eq(0).click();
      // 模拟点击事件
      cy.get(".avue-form__menu--right .el-button--primary").click();
      // 把请求定义成一个新的名字，用于拦截请求后进行判断。
      cy.intercept('/smlm-system/api/region/*').as('createRegion');
      cy.wait('@createRegion').then((interception) => {
        // 断言
        expect(interception.response.body.code).to.equal(200);
      })
    });
  });

  it('测试删除区域', () => {
    cy.wait(2000).then(() => {
      cy.contains('.el-table__row', treeNodeName).find('.el-button').eq(1).click({force: true});
      // 应该弹出是否删除的框
      cy.get('.el-message-box__message').should('have.text', '确定将选择数据删除?');
      // 点击删除按钮
      cy.get(".el-message-box__btns .el-button").eq(1).click({force: true});
      cy.wait(2000).then(() => {
        cy.contains('.el-table__row', treeNodeName).should('have.length', 0);
      })
    });
  });
});
```
