## 断言库的支持类型

断言是测用例的必要组成部分，Cypress支持多种断言，其中包括BDD（expect/should）和TDD（assert）格式断言。简而言之 TDD 是一种构建高质量代码的开发模式。通常我们先一小段某个功能的测试代码，
然后再编写业务实现代码。通过测试代码之后才能进行下一个迭代的循环。因为它是代码级的验证，在真实的需求和操作方面的契合度不高，非技术人员、客户可能无法评审，因而无法与对应的功能点进行关系对应。在这个痛点之上，有一些人扩展了TDD，提出了BDD(Behaviour-Driven Development)的概念。行为驱动开发是一种敏捷软件开发的技术，它鼓励软件项目中的开发者、QA和非技术人员或商业参与者之间的协作。主要是从用户的需求出发，强调系统行为。BDD最初是由Dan North在2003年命名，它包括验收测试和客户测试驱动等的极限编程的实践，作为对测试驱动开发的回应。

## 常见的断言方式
- 针对长度（length）的断言
```javascript
// 重试,直到找到3个匹配的<li.selected>
cy.get('li.selected').should('have.length',3)
```
- 正对类（Class）的断言
```javascript
// 重试,直到input元素没有类被disabled为止（或者超时为止）
cy.get('from').fijd('input').should('not.have.class','disabled')
```
- 针对值（Value）断言
```javascript
// 重试,直到textarea的值为‘iTesting’
cy.get('textarea').should('have.value','iTesting')
```
- 针对文本内容（Text Content）的断言
```javascript
// 重试,直到这个span不包含“click me”字样
cy.get('a').parent('span.help').should('not.contain','click me')
// 重试,直到这个span包含“click me”字样
cy.get('a').parent('span.help').should('contain','click me')
```
- 针对元素可见与否（Visibility）的断言
```javascript
// 重试,直到这个button是可为止
cy.get('button').should('be.visible')
```
- 针对元素存在与否（Existence）的断言
```javascript
// 重试,直到id为loading的spinner不在存在
cy.get('#loading').should('not.exist')
```
- 针对元素状态的（State）的断言
```javascript
// 重试,直到这个radio button是选中状态
cy.get(':radio').should('be.checked')
```
- 针对CSS的断言
```javascript
// 重试,直到completed这个类有匹配的css为止
cy.get('.completed').should('have.css','text-decoration','line-through')
```
## Jenkins 持续集成
Cypress 可以通过 Jenkins 的插件机制持续的集成，使用方法和常见的 NodeJS 插件类似，这里不展开篇幅说。也是通过插件配置
执行相关的 Shell 或者 NodeJS 代码，最后建议配置生成相关的报告。通过邮箱等发送。

## "PageObject" 测试模式
在编写代码的过程中，有一种叫做 PageObject 的方式。原理很简单，是通过把界面常见的操作比如输入用户名和密码，放置在另外
的 js 中，做成一个通用的方法，而把其他的断言等，放在核心的测试库中。通过这样的抽离达到用户的指令反复重用的目的。所以
由此基础之上，Cypress 充分考虑了此问题，做出了 commands 的机制。通过编写自定义的指令，放置在系统启动的位置。进而随着
系统的启动直接注入顶层 Cy 对象，在测试代码的任意位置可以实现优雅的调用。详见 [commands](https://docs.cypress.io/api/cypress-api/custom-commands.html#Syntax)

## 为何要使用 date-cy ？直接使用 Class，ID 进行 Dom 查找不好吗？
官方建议使用 data-test, data-cy 来替代 Class, ID 的查找是出于对前端代码的侵入性导致。前端开发中会经常使用 Dom 编程
来实现界面交互上的操作。因为测试而导致修改 Class，ID 很有可能会直接导致原有的界面逻辑出现变动而导致的错误。使用 data-*
此类的自定义属性能够从一定程度上避免此类事故的发生。

## Cypress 能够支持多浏览器、多环境配置么？
本质上来说，Cypress 是通过 NodeJS 的底层驱动。所以从 NodeJS 对环境变量的读取能够很好的区分不同的环境，而对不同的环境
进行 Cypress.config 文件进行分门别类的处理。比如：设置 baseURL,API Service等。

## Cypress 能够测试 API 么？
Cypress 内置了 request 对象，所以通过配置 header 和 option 等就可以完全模拟 HttpRequest 请求。它同时也支持 Mock Server

## 在使用 JWT 的时候，我们有大量的数据需要保存下来，如何保存？
仅只能依靠编码来，我们可以使用 Cookies 来保存
```Cypress.Cookies.preserveOnce('smlm-refresh-token', 'smlm-access-token');```具体的参数可以查看 Cypress.io 的 API 文档
关于 SessionStore，localStore 的保存，可以查看编写的代码教程。具体可以参考链接 [登录模块的例子](https://docs.cypress.io/examples/examples/recipes#Logging-In)

未完待续......
