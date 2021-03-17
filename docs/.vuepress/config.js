module.exports = {
  title: 'Cypress.io',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/get-started' },
      { text: 'API', link: 'https://docs.cypress.io/api/api/table-of-contents.html' },
      { text: '官网', link: 'https://www.cypress.io/' },
      { text: 'Github地址', link: 'https://github.com/cypress-io/cypress' }
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            { title: '背景、发展', path: '/guide/get-started' },
            { title: '快速安装', path: '/guide/install' },
            { title: '基础概念', path: '/guide/concept' },
            { title: '开始一个简单测试', path: '/guide/first-test' },
            { title: '常见问题', path: '/guide/FAQ' }
          ]
        }
      ]
    },
    //左侧导航显示的层级
    sidebarDepth: 2,
    lastUpdated: 'Last Updated'
  },
  plugins: ['@vuepress/back-to-top']
}