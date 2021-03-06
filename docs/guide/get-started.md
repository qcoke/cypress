### 为什么要使用 Cypress ?

如果说Web自动化测试，大家最熟悉不过的就是 Selenium <font color="orange">[sə'liːniəm]</font> 了。其实还有 testcafe、mocha、jtest 和 cypress 等。Selenium 作为老牌的测试工具。Selenium WebDriver 是我们都知道和喜爱的开源自动化工具。Selenium 已经成为许多现代软件团队的基础测试自动化工具包。最大的优点是其支持多种语言（Java,PHP,Python等），它拥有庞大的活跃用户社区，并且是唯一能够通过<font color=red>全端浏览器测试</font>的工具，使其成为跨浏览器测试的必要条件。

<img :src="$withBase('/imgs/selenium.png')" alt="selenium架构" style="margin:30px auto">

我们在用 Selenium 时，需要集成单元测试框架（unittest、pytest），想要好看的测试报告还得集成（allure），想要 Mock 还得引入对应的 Mock 库。
对于新手来说，Selenium的学习曲线比较陡峭。当然，开发人员和自动化测试人员也可以通过向Selenium社区里的活跃用户学习，来快速入门。
由于涉及到安装浏览器的驱动程序、Selenium Grid服务器、以及Selenium IDE，因此Selenium的设置过程较为复杂。Cypress是为开发人员和质量保证工程师打造的下一代前端测试工具，可被用来测试浏览器中运行的所有内容。与Selenium运行在浏览器外部不同，Cypress能够与应用程序在同一循环中被执行。也就是说，节点服务器(Node server)的进程能够与Cypress相互通信，同步并执行任务。
正由于吸收了各种框架的经验，Cypress 是开箱即用。内置集成的技术栈也让使用者尽可能少的在不同的技术栈中间切换、
学习不同的技术点。保持单一的技术栈体系也让学习曲线平缓了不少。

<img :src="$withBase('/imgs/kaixiang.png')" alt="cypress架构">

在上述的问题，Cypress 还具备以下特性：

- <b>E2E的测试：</b>所谓的E2E就是end-to-end（端到端）。假设我们编写的每个功能程序都是一个黑匣子，最终用户也只会看到这个黑匣子，那么站在用户的角度来看并不需要知道这个黑匣子内部是什么东西也不需要知道怎么实现的，我只管知道最终效果是不是我们想要的。那么映射到前端这边的话就是：我不管你逻辑使用什么框架什么逻辑写的，我只想知道浏览器上我要的交互效果，UI 展示效果是不是正确的，功能使用上是不是正确的，那么这就叫 E2E 测试。
- <b>跨浏览器</b>
<img :src="$withBase('/imgs/browsers.png')" alt="跨浏览器">
- <b>时间穿梭：</b>Cypress 会在测试运行时拍摄快照。只需将鼠标悬停在“ 命令日志”中的命令上，即可准确查看每一步都发生了什么
- <b>可调试性：</b>停止猜测你的测试失败的原因。直接从熟悉的工具如 Chrome DevTools 进行调试。我们可读的错误和堆栈跟踪使调试更加快速便捷。
- <b>实时重载：</b>每当你对测试进行更改时，Cypress 都会自动重新加载。查看应用程序中实时执行的命令。
- <b>自动等待：</b>不要在测试中添加等待或休眠。Cypress 在继续下一步之前会自动等待元素至可操作状态时才会执行命令或断言。异步操作不再是噩梦。
- <b>间谍，存根和时钟：</b>Cypress 允许你验证并控制函数行为，Mock服务器响应或更改系统时间，你喜欢的单元测试就在眼前。
- <b>网络流量控制：</b>Cypress 可以 Mock 服务器返回结果，无须连接后端服务器即可实现轻松控制，模拟网络请求。
- <b>运行结果一致性：</b>Cypress 架构不使用 Selenium 或 Webdriver,在运行速度，可靠性测试，测试结果一致性上均有良好的保障。
- <b>截图和视频：</b>Cypress 在测试运行失败时自动截图，在无头运行时录制整个测试套件的视频，使你轻松掌握测试运行情况。

#### 其他资料
---
- [以后再有人问你selenium是什么，你就把这篇文章给他](https://bbs.huaweicloud.com/blogs/172086)
- [top-javascript-testing-frameworks](https://www.browserstack.com/guide/top-javascript-testing-frameworks)
- [top-javascript-automation-testing-framework](https://www.lambdatest.com/blog/top-javascript-automation-testing-framework/)
- [comparing-javascript-browser-automation-frameworks/](https://applitools.com/blog/comparing-javascript-browser-automation-frameworks/)
- [top-8-essential-javascript-automation-frameworks](https://testguild.com/top-8-essential-javascript-automation-frameworks/)
- [cypress-vs-puppeteer](https://stackshare.io/stackups/cypress-vs-puppeteer)
