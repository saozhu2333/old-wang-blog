module.exports = {
  title: '王路平',
  description: '这是一个博客',
  head: [
    ['link', { rel: 'icon', href: '/header.jpg' }]
  ],
  themeConfig: {
    logo: '/header.jpg',
    lastUpdated:'上次更新',
    search: true,
    searchMaxSuggestions: 5,
    nav: [{ text: '首页', link: '/' },
    {
      text: '前端-面试题',link: '/blog/interview/',
      items: [
        { text: 'HtmlCss', link: '/blog/interview/html/' },
        { text: 'Js', link: '/blog/interview/js/' }
      ]
    },
    { text: '前端-案例', link: '/blog/case/' },
    { text: '掘金', link: 'https://juejin.cn/user/4330325551357245' },
    { text: '简历', link: 'https://www.tutouguai.cn/resume/index.html' },
      // {
      //   text: '语言', ariaLabel: 'Language Menu',
      //   items: [{ text: '中文', link: '/' }, { text: '英文', link: '/' }
      //   ]
      // },
    ],
    // sidebar:{
    //   '/blog/case/' : [
    //     ['','目录'],
    //     ['one','图片裁剪'],
    //   ]
    // }
    sidebar:[{
      title:'目录',
      collapsable:true,
      children:[
        ['/blog/case/one','1、背景颜色跟随图片一起动'],
        ['/blog/case/two','2、拖拽排序'],
        ['/blog/case/three','3、Flip动画效果'],
      ]
    }]
  }
}