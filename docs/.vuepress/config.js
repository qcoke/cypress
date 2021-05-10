module.exports = {
  title: 'Cypress.io',
  base: '/cypress/',
  head: [
    ['link', { rel: 'icon', href: '/imgs/logo.png' }]
  ],
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/get-started' },
      { text: '常用API', link: '/guide/API' },
      { text: '官方API', link: 'https://docs.cypress.io/api/api/table-of-contents.html' },
      { text: '官网', link: 'https://www.cypress.io/' },
      { text: 'Github地址', link: 'https://github.com/cypress-io/cypress' }
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            { title: '背景、发展、介绍', path: '/guide/get-started' },
            { title: '环境参数与安装', path: '/guide/install' },
            { title: '简介', path: '/guide/concept' },
            { title: '开始编码测试', path: '/guide/first-test' },
            { title: '常见问题总结', path: '/guide/FAQ' },
            { title: '常用API', path: '/guide/API' }
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