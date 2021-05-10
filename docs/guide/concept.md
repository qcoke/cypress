## 文件结构 & 基础概念
<img :src="$withBase('/imgs/structure.png')" alt="文件结构" style="margin:20px 0 10px 0" />

在工程目录中
- <b>fixtures:</b> 放置我们需要依赖的部分数据，它既可以模拟接口返回的值。也可以用于发送提交表单的数据集合。
- <b>integration:</b> 目录放置我们需要编写的测试用例
- <b>plugins:</b> Cypress 的集成环境让整个用例控制在浏览器之内，提升性能的同时也导致了在浏览器之外进行通信更加困难。所以
Cypress 提供了一些现成的插件，使你能够定制化一些 Cypress 的内部行为。（动态修改环境变量）
- <b>support:</b> 支持文件目录是放置可重用配置项，如底层通用函数或全局默认配置。

为了运行的方便，每次测试文件运行之前，Cypress 都会自动加载 support/index.js plugins/index.js 文件

## Mocha
Cypress 底层依赖于很多优秀的开源框架，比如 Mock，Mocha，Chai 等。也由于它本身的内置类似于“约定大于配置”的理念，才能够使其“开箱即用”。

Mocha 是一个功能丰富的javascript测试框架，运行在 node.js 和浏览器中，使异步测试变得简单有趣。Mocha 测试连续运行，允许灵活和准确的报告，同时将未捕获的异常映射到正确的测试用例。
Mocha自身没有断言库，但是支持使用不同的断言库，每个断言库的用法有一些差异。像官网就是用的assert。
```javascript
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
```
<b>describe</b> 块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称，第二个参数是一个实际执行的函数。

<b>it</b> 块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称，第二个参数是一个实际执行的函数。
### Mocha + Chai 的组合
Chai是一个用于node和浏览器的BDD / TDD断言库，可以与任何javascript测试框架轻松地配对。为什么会有 Chai ？ 因为 Chai 让 Mocha 的语法看起来更加的 “人性化” 也更加符合规范，通过用户精准的描述表达，把需要的测试用例翻译成为机器代码。expect 和 should 是 BDD 风格的，二者使用相同的链式语言来组织断言。

但不同在于他们初始化断言的方式：expect 使用构造函数来创建断言对象实例，而 should 通过为 Object.prototype 新增方法来实现断言（所以 should 不支持 IE）；expect 直接指向 chai.expect，而 should 则是 chai.should()。

关于 Chai 的使用和介绍，可以点击这里进入查看 [Chai（中文介绍）](https://www.jianshu.com/p/9c78548caffa)

<img :src="$withBase('/imgs/chai_assert.png')" alt="chai_assert">

## Hock
使用过 Vue 等前端框架的开发者应该很熟悉，它就是钩子函数，一般用于在执行测试用例之前、之后做一些操作。例如：点击某按钮之后需要保存返回值作为长期使用的信息。或者进入某些
方法之前需要使用的 token 信息。 以及进行某种操作之后进行清理操作（如：清理数据）

```javascript
describe('统计分析模块测试',()=>{

  before(() => {
    cy.log('当前测试用例套件中【顶级套件】，【所有】测试用例执行之前运行【before】');
  });
  beforeEach(() => {
    cy.log('当前测试用例套件中【顶级套件】，【每个】测试用例执行之前运行【beforeEach】');
  });
  after(()=>{
    cy.log('当前测试用例套件中【顶级套件】，【所有】测试用例执行之前运行【after】');
  });
  afterEach(()=>{
    cy.log('当前测试用例套件中【顶级套件】，【每个】测试用例执行之前运行【afterEach】');
  });

  it('测试用例 1', ()=> {
    cy.log('一级测试用例----------1')
  })
  it('测试用例 2', ()=> {
    cy.log('一级测试用例----------2')
  })

  describe('二级测试套件', ()=> {
    before(()=> {
      cy.log('我是【二级套件】，【所有】测试用例执行之前运行的【before】')
    });

    after(()=> {
      cy.log('我是【二级套件】，【所有】测试用例执行之前运行的【after】')
    });

    it('我是二级测试用例 1-1',() => {
      cy.log(' 二级测试用例 1-1')
    })

    it('我是二级测试用例 1-2',() => {
      cy.log(' 二级测试用例 1-2')
    });

    context('第三级测试套件', ()=> {
      it('第三级的测试套件', ()=> {
        cy.log('三级测试用例 1-1-1')
      })
    })
  });
});
```
<img :src="$withBase('/imgs/results.jpg')" alt="执行结果">

<b>对一条可执行的测试用例来说，两个部分是必要的组成条件</b>
- describe() 测试套件，里面可以设定 context()，可以包含多个 it()，还能嵌套子测试套件，一个测试套件可以不包括任何钩子函数。但是有且至少包含一条测试用例 it()
- it() 如上文，describe 中的一条测试用例，其他的条件可选。
- skip(), only() 跳过与仅仅执行一条，暂时跳过。

## 指令 & 断言
测试用例文件内，分为两种代码。分别为 “指令” 和 “断言”。顾名思义，”指令“ 是要求浏览器进行某一类型的操作。 ”断言“ 则是对操作的结果进行预言。

<img :src="$withBase('/imgs/assert.png')" alt="指令&断言">

这里因为篇幅过长，整理了一份常用的 API [点击这里进入](/guide/API) 

## 重试机制
重试（Retry-ability）机制是 Cypress 比较有特色的概念，它能够有助于我们写出更加容易理解的测试用例。日常测试中经常碰到的问题有如下：
1. 界面未加载完毕导致的断言失败。
2. 请求的时间超长而导致的断言失败。
3. 如果界面发生了动画，或者上万个节点的渲染导致界面没有及时更新导致的断言失败。

所以指令之后的断言失败，相应的指令会重新查询 web 应用程序的 DOM 树，然后 Cypress 将再次尝试对命令的返回进行断言。
#### 例子
如果查找 .className 失败的话，Cypres 仍然会重新查询 DOM 树直到成功或者超时（默认4秒）
```javascript
cy.get('.className') 
```
#### 多重断言的例子：
在日常测试中，有时候需要多重断言，即获取元素后跟多个断言。在多重断言中，Cypress 将按顺序进行断言，即当第一个断言通过后，会进行第二个断言，通过后进行第三个断言...以此类推
```javascript
describe('测试列表',function(){
  context('测试列表',function(){
    it('测试列表顺序和选项存在',function(){
      cy.get('.list>li')
        .should('have.length',2)
        .and(($li)=>{
          expect($li.get(0).textContent, 'first item').to.equal('iTesting')
          expect($li.get(1).textContent, 'second item').to.equal('testerTalk')
        })
    })
  })
})
```
总共有三个断言，一个 should，两个 expect。其中 and() 里如果第二个断言失败，第三个永远不会执行，如果导致第二个断言失败的原因被找到且修复了，且此时整个命令还没有超时，则在进行第三个断言时，还会再次重试第一、第二个断言。

Cypress 并不会重试所有命令，当命令可能改变被测应用程序的状态时，该命令将不会重试（如：click），常见的可重试命令如下：

<img :src="$withBase('/imgs/re_command.png')" alt="指令&断言">
