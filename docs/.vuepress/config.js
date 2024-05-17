module.exports = {
  title: '王路平',
  description: '这是一个博客',
  head: [
    ['link', { rel: 'icon', href: '/header.jpg' }]
  ],
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN',
      title: '王路平',
      description: '这是一个博客',
    },
    '/us/': {
      lang: 'zh-US',
      title: 'LuPing Wang',
      description: 'Is blog',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        nav: [{ text: '首页', link: '/' },
        {
          text: '前端-面试题', link: '/blog/interview/',
          items: [
            { text: 'HtmlCss', link: '/blog/interview/html/' },
            { text: 'Js', link: '/blog/interview/js/' }
          ]
        },
        { text: '前端-案例', link: '/blog/case/' },
        { text: '掘金', link: 'https://juejin.cn/user/4330325551357245' },
        { text: '简历', link: 'https://www.tutouguai.cn/resume/index.html' },
        ],
        sidebar: [{
          title: '目录',
          collapsable: true,
          children: [
            ['/blog/case/one', '1、背景颜色跟随图片一起动'],
            ['/blog/case/two', '2、拖拽排序'],
            ['/blog/case/three', '3、Flip动画效果'],
            ['/blog/case/four', '4、websocket心跳检测'],
            ['/blog/case/five', '5、github/gitee webhooks+node进行vue简单热部署'],
          ]
        }]
      },
      '/us/': {
        selectText: 'Languages',
        label: 'English',
        nav: [{ text: 'HOME', link: '/us/' },
        {
          text: 'WEB-Interview questions', link: '/us/blog/interview/',
          items: [
            { text: 'HtmlCss', link: '/us/blog/interview/html/' },
            { text: 'Js', link: '/us/blog/interview/js/' }
          ]
        },
        { text: 'WEB-DEMO', link: '/us/blog/case/' },
        { text: 'Juejin', link: 'https://juejin.cn/user/4330325551357245' },
        { text: 'resume', link: 'https://www.tutouguai.cn/resume/index.html' },
        ],
        sidebar: [{
          title: 'catalogue',
          collapsable: true,
          children: [
            ['/us/blog/case/one', '1、The background color moves with the image'],
            ['/us/blog/case/two', '2、Drag and drop sorting'],
            ['/us/blog/case/three', '3、Flip animation effects'],
            ['/us/blog/case/four', '4、WebSocket Heartbeat Detection'],
            ['/us/blog/case/five', '5、github/gitee Github/gitee webhooks+node for hot deployment of Vue'],
          ]
        }]
      },
    },
    logo: '/header.jpg',
    lastUpdated: '上次更新',
    search: true,
    searchMaxSuggestions: 5,
    // nav: [{ text: '首页', link: '/' },
    // {
    //   text: '前端-面试题', link: '/blog/interview/',
    //   items: [
    //     { text: 'HtmlCss', link: '/blog/interview/html/' },
    //     { text: 'Js', link: '/blog/interview/js/' }
    //   ]
    // },
    // { text: '前端-案例', link: '/blog/case/' },
    // { text: '掘金', link: 'https://juejin.cn/user/4330325551357245' },
    // { text: '简历', link: 'https://www.tutouguai.cn/resume/index.html' },
    // ],
    // sidebar: [{
    //   title: '目录',
    //   collapsable: true,
    //   children: [
    //     ['/blog/case/one', '1、背景颜色跟随图片一起动'],
    //     ['/blog/case/two', '2、拖拽排序'],
    //     ['/blog/case/three', '3、Flip动画效果'],
    //     ['/blog/case/four', '4、websocket心跳检测'],
    //   ]
    // }]
  }
}