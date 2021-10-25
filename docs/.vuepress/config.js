module.exports = {
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
      },
    ],
  ],
  title: '欢迎来到我的博客', // 设置网站标题
  description: '我的技术站',
  base: '/docs/',
  head: [
    ['link', {rel: 'icon', href: '/images/favicon.ico'}] // 网站图标
  ],
  themeConfig: {// 主题设置
    // darkMode: false,
    navbar: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '笔记',
        children: [
          {
            text: 'markdown笔记',
            link: '/markdown'
          },
          {
            text: 'git笔记',
            link: '/git'
          },
          {
            text: 'vuejs笔记',
            link: '/vuejs'
          }
        ]
      }
    ]
  }
}