import { WidgetPackage } from '@widget-js/core'

export default new WidgetPackage({
  author: 'WidgetJS',
  description: {
    'zh-CN': '相册组件包',
  },
  entry: '/',
  hash: true,
  homepage: '',
  remote: {
    hostname: 'widgetjs.cn',
    entry: 'https://widgetjs.cn/photo',
    base: '/photo',
  },
  name: 'widgetjs.cn.photo',
  title: {
    'zh-CN': '相册组件包',
  },
  devOptions: {
    folder: './src/widgets/',
  },
})
