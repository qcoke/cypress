module.exports = {
  title: 'Cypress.io',
  description: 'Cypress 培训文档',
  navbar: [
    { text: '指南', link: '/start' }
  ],
  sidebar: [
    '/',
    '/start/'
  ],
  homepage: "/",
  extraWatchFiles: [
    '/start/*.md'
  ],
  markdown: {
    extractHeaders: ['h2', 'h3', 'h4']
  }
}