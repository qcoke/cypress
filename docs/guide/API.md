#### 元素选择和操作
<table border="0" class="md-table">
  <tr>
    <th width="5%">#</th>
    <th width="20%">方法</th>
    <th width="30%">功能</th>
    <th width="35%">范例</th>
  </tr>
  <tr>
    <td>1</td>
    <td>contains(content)</td>
    <td>获取单元素 - 通过文本</td>
    <td>
      <p>cy.get('.nav').contains('About')</p>
      <p>cy.contains('Hello')</p>
      <p>cy.contains(/^b\w+/)</p>
    </td>
  </tr>
  <tr>
    <td>2</td>
    <td>get(selector|alias)</td>
    <td>
      获取多元素通过CSS选择器 | 别名CSS选择器支持jquery语法
    </td>
    <td>
      <p>cy.get('.list > li’)</p>
      <p>cy.get('ul li:first')</p>
      <p>cy.get('[data-test-id="test-example"]')	</p>
    </td>
  </tr>
  <tr>
    <td>3</td>
    <td>within(fn)</td>
    <td>连续处理元素 - 函数</td>
    <td>
      <p>cy.get('.list').within(() =>{...})</p>
    </td>
  </tr>
  <tr>
    <td>4</td>
    <td>find(selector)</td>
    <td>连缀处理元素 - 选择器</td>
    <td>
      <p>cy.get('.list').find('>li')</p>
    </td>
  </tr>
  <tr>
    <td>5</td>
    <td>children()</td>
    <td>获取子元素</td>
    <td>
      <p>cy.get('nav').children()</p>
    </td>
  </tr>
  <tr>
    <td>6</td>
    <td>parent()</td>
    <td>获取父元素</td>
    <td>
      <p>cy.get('header').parent()</p>
    </td>
  </tr>
  <tr>
    <td>7</td>
    <td>closest()</td>
    <td>获取第一个匹配的元素</td>
    <td>
      <p>cy.get('td').closest('.filled')</p>
    </td>
  </tr>
  <tr>
    <td>8</td>
    <td>eq(index)</td>
    <td>序号 | 序列中的元素</td>
    <td>
      <p>cy.get('td').eq(3)</p>
    </td>
  </tr>
  <tr>
    <td>9</td>
    <td>filter(selector)</td>
    <td>过滤元素</td>
    <td>
      <p>cy.get('td').filter('.users')</p>
    </td>
  </tr>
  <tr>
    <td>10</td>
    <td>not()</td>
    <td>过滤元素和 filter 相反</td>
    <td>
      <p>cy.get('td').not('.users')</p>
    </td>
  </tr>
  <tr>
    <td>11</td>
    <td>first()</td>
    <td>返回第一个元素</td>
    <td>
      <p>cy.get('nav a').first()</p>
    </td>
  </tr>
  <tr>
    <td>12</td>
    <td>last()</td>
    <td>返回最后一个元素</td>
    <td>
      <p>cy.get('nav a').last()</p>
    </td>
  </tr>
  <tr>
    <td>13</td>
    <td>next()</td>
    <td>下一个元素</td>
    <td>
      <p>cy.get('nav a:first').next()</p>
    </td>
  </tr>
  <tr>
    <td>14</td>
    <td>nextAll()</td>
    <td>接下来所有</td>
    <td>
      <p>cy.get('nav').nextAll()</p>
    </td>
  </tr>
  <tr>
    <td>15</td>
    <td>nextUntil()</td>
    <td>接下来直到</td>
    <td>
      <p>cy.get('nav').nextUntil('a')</p>
    </td>
  </tr>
  <tr>
    <td>16</td>
    <td>prev()</td>
    <td>前一个元素</td>
    <td>
      <p>cy.get('li').prev('.active')</p>
    </td>
  </tr>
  <tr>
    <td>17</td>
    <td>prevAll()</td>
    <td>前所有元素</td>
    <td>cy.get('#main').prevAll()</td>
  </tr>
  <tr>
    <td>18</td>
    <td>prevUntil()</td>
    <td>往前查找直到</td>
    <td>cy.get('#main').prevUntil()</td>
  </tr>
  <tr>
    <td>19</td>
    <td>url()</td>
    <td>获取当前页面url</td>
    <td>
      <p>cy.url()</p>
    </td>
  </tr>
  <tr>
    <td>20</td>
    <td>title()</td>
    <td>获取当前页面标题</td>
    <td>
      <p>cy.title()</p>
    </td>
  </tr>
</table>

#### 元素内容处理
<table border="0" class="md-table">
  <tr>
    <th width="5%">#</th>
    <th width="20%">方法</th>
    <th width="30%">功能</th>
    <th width="35%">范例</th>
  </tr>
  <tr>
    <td>1</td>
    <td>each(callbackFn)</td>
    <td>遍历</td>
    <td>
      <p>cy.get('ul>li').each(function () {...})</p>
    </td>
  </tr>
  <tr>
    <td>2</td>
    <td>clear</td>
    <td>清除元素内容</td>
    <td>
      <p>cy.get('[type="text"]').clear()</p>
      <p>cy.get('input[name="name"]').clear().type('Jane Lane')</p>
    </td>
  </tr>
  <tr>
    <td>3</td>
    <td>type(txt[,options])}</td>
    <td>模拟输入内容</td>
    <td>
      <p>cy.get('input').type('233')</p>
      <p>cy.get('input').type('{shift}{alt}Q')---组合键盘操作</p>
      <p>cy.get('input').type('{alt}这里是按了一下alt后输入的内容')</p>
    </td>
  </tr>
  <tr>
    <td>4</td>
    <td>fixture(filePath, encoding, options)</td>
    <td>读取文件</td>
    <td>
      <p>cy.fixture('users.json').as('usersData');</p>
      <p>cy.fixture('users').then((json) => {</p>
      <p style="padding-left:20px;">cy.router('GET', '/users/**', json);</p>
      <p>});</p>
    </td>
  </tr>
</table>

#### 元素操作事件
<table border="0" class="md-table">
  <tr>
    <th width="5%">#</th>
    <th width="20%">方法</th>
    <th width="30%">功能</th>
    <th width="35%">范例</th>
  </tr>
  <tr>
    <td>1</td>
    <td>trigger</td>
    <td>触发DOM元素</td>
    <td>
      <p>cy.get('a').trigger('mousedown')</p>
    </td>
  </tr>
  <tr>
    <td>2</td>
    <td>visit</td>
    <td>访问链接</td>
    <td>
      <p>cy.visit('/landing/')</p>
      <p>设置过baseUrl就是baseUrl+landing</p>
      <p>cy.visit('lesson_report/807212')活动路由</p>
    </td>
  </tr>
  <tr>
    <td>3</td>
    <td>click</td>
    <td>单击</td>
    <td>
      <p>cy.get('#btn_id').click();</p>
    </td>
  </tr>
  <tr>
    <td>4</td>
    <td>dblclick</td>
    <td>双击</td>
    <td>
      <p>cy.focused().dblclick();</p>
    </td>
  </tr>
  <tr>
    <td>5</td>
    <td>focus</td>
    <td>聚焦</td>
    <td>
      <p>cy.get('input').first().focus();</p>
    </td>
  </tr>
  <tr>
    <td>6</td>
    <td>blur</td>
    <td>失焦</td>
    <td></td>
  </tr>
  <tr>
    <td>7</td>
    <td>check</td>
    <td>选中选项 限定: checkbox/radio</td>
    <td>
      <p>cy.get('#checkbox_id').check();</p>
    </td>
  </tr>
  <tr>
    <td>8</td>
    <td>uncheck</td>
    <td>取消选中</td>
    <td>
      <p>cy.uncheck();</p>
    </td>
  </tr>
  <tr>
    <td>9</td>
    <td>select</td>
    <td>选择选项限定option</td>
    <td>
      <p>cy.get('select').select('user-1');</p>
    </td>
  </tr>
  <tr>
    <td>10</td>
    <td>end</td>
    <td>清空返回值用于继续连续操作</td>
    <td>
      <p>cy.get('#a').click().end().get('#b').click();</p>
      <p>等价于</p>
      <p>cy.get('#a').click(); cy.get('#b').click();</p>
    </td>
  </tr>
  <tr>
    <td>11</td>
    <td>exec</td>
    <td>执行原生事件</td>
    <td>
      <p>cy.exec('npm run build').then((result) => {...};</p>
    </td>
  </tr>
  <tr>
    <td>12</td>
    <td>focused</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>13</td>
    <td>reload</td>
    <td>刷新</td>
    <td>
      <p>cy.reload() // 普通刷新</p>
      <p>cy.reload(forceReload) //强刷</p>
    </td>
  </tr>
</table>

#### 数据请求 | 数据处理
<table border="0" class="md-table">
  <tr>
    <th width="5%">#</th>
    <th width="20%">方法</th>
    <th width="30%">功能</th>
    <th width="35%">范例</th>
  </tr>
  <tr>
    <td>1</td>
    <td>server()</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>2</td>
    <td>route(options)</td>
    <td>参数</td>
    <td>
      <p>cy.route(url)</p>
      <p>cy.route(url, response)</p>
      <p>cy.route(method, url)</p>
      <p>cy.route(method, url, response)</p>
      <p>cy.route(callbackFn)</p>
      <p>cy.route(options)</p>
    </td>
  </tr>
  <tr>
    <td>3</td>
    <td>clearCookie(name,[options])</td>
    <td>清除选定cookie，默认会清除</td>
    <td>
      <p>cy.clearCookie('authId');</p>
    </td>
  </tr>
  <tr>
    <td>4</td>
    <td>clearCookies()</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>5</td>
    <td>clearLocalStorage()</td>
    <td>清除localstorage</td>
    <td></td>
  </tr>
  <tr>
    <td>6</td>
    <td>request(method, url, body)</td>
    <td>数据请求</td>
    <td></td>
  </tr>
  <tr>
    <td>7</td>
    <td>wrap()</td>
    <td>传值测试</td>
    <td>
      <p>cy.wrap({name:'LIU'}).invoke('name').should('eq','Jane Lane')</p>
    </td>
  </tr>
</table>

#### 断言相关的语法
<table border="0" class="md-table">
  <tr>
    <th width="5%">#</th>
    <th width="20%">方法</th>
    <th width="30%">功能</th>
    <th width="35%">范例</th>
  </tr>
  <tr>
    <td>1</td>
    <td>should()</td>
    <td>断言</td>
    <td>
      <p>cy.get('.btn').should('be.empty')</p>
      <p>cy.get('.greeting').should('not.be.visible')</p>
      <p>cy.get('.btn').should((text2) => {expect(text1).not.to.eq(text2)})</p>
      <p>cy.get('option:first').should('be.selected').then(($option) => {...})</p>
      <p>cy.request('/users/1').its('body').should('deep.eq',{name: 'Jane'})</p>
    </td>
  </tr>
  <tr>
    <td>2</td>
    <td></td>
    <td>value id | class | value</td>
    <td>
      <p>cy.get('input').should('have.class','btn')</p>
      <p>cy.get('input').should('not.have.value','Jane')</p>
      <p>cy.get('button').should('have.id','a').then(($button) => { // $button is yielded })</p>
    </td>
  </tr>
  <tr>
    <td>3</td>
    <td></td>
    <td>Method and Value</td>
    <td>
      <p>cy.get('#header a').should('have.attr','href','/users')</p>
    </td>
  </tr>
  <tr>
    <td>4</td>
    <td></td>
    <td>Focus</td>
    <td>
      <p>cy.get('#ipt').should('have.focus')</p>
    </td>
  </tr>
  <tr>
    <td>5</td>
    <td></td>
    <td>Function</td>
    <td>
      <p>??</p>
    </td>
  </tr>
  <tr>
    <td>6</td>
    <td></td>
    <td>判断是否存在样式</td>
    <td>
      <p>cy.get('div').should('have.css','color','blue')</p>
    </td>
  </tr>
  <tr>
    <td>7</td>
    <td></td>
    <td>判断是否存在文本 完全匹配</td>
    <td>
      <p>cy.get('div').should('have.text','foobarbaz');</p>
    </td>
  </tr>
  <tr>
    <td>8</td>
    <td></td>
    <td>判断是否存在文本,部分匹配|包含</td>
    <td>
      <p>cy.get('div').should('contain', 'foobarbaz');</p>
    </td>
  </tr>
  <tr>
    <td>9</td>
    <td></td>
    <td>断言之前使用文本</td>
    <td>
      <p>cy.get('div').should(($div) => {</p>
      <p style="padding-left:20px;">const text = $div.text();</p>
      <p style="padding-left:20px;">expect(text).to.match(/foo/);</p>
      <p style="padding-left:20px;">expect(text).to.include('foo');</p>
      <p style="padding-left:20px;">expect(text).not.to.include('bar');</p>
      <p>});</p>
    </td>
  </tr>
  <tr>
    <td>10</td>
    <td></td>
    <td>保留引用 or 比较文本值</td>
    <td>
      <p>cy.get('div').invoke('text').then((text1) => {</p>
      <p style="padding-left:20px;">cy.get('button').click();</p>
      <p style="padding-left:20px;">cy.get('div').invoke('text') .should((text2) => {</p>
      <p style="padding-left:40px;">expect(text1).not.to.eq(text2)</p>
      <p style="padding-left:20px;">})</p>
      <p>});</p>
    </td>
  </tr>
  <tr>
    <td>11</td>
    <td></td>
    <td></td>
    <td>
      <p>cy.get('#header a').should('have.class','active').and('have.attr','href','/users')</p>
    </td>
  </tr>
  <tr>
    <td>12</td>
    <td></td>
    <td>获取innerText</td>
    <td>
      <p>cy.get('div').should(($div) => {</p>
      <p style="padding-left:20px;">// 判断元素中是否存在 foobarbaz 的字符串 </p>
      <p style="padding-left:20px;">expect($div.get(0).innerText).to.eq('foobarbaz')</p>
      <p>});</p>
    </td>
  </tr>
</table>

<style type="text/css">
.md-table {
  width: 100%;
}
.md-table td, .md-table th{
  font-size: 12px;
  font-family: sans-serif;
}
.md-table td p {
  margin: 0;
  padding: 0;
}
</style>