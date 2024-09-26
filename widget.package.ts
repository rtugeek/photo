import { WidgetPackage } from '@widget-js/core'

export default new WidgetPackage({
  author: 'WidgetJS',
  description: {
    'zh-CN': '在桌面展示您的精彩照片',
    'en-US': 'Show your wonderful photos on the desktop',
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
    'en-US': 'Photo widget package',
  },
  devOptions: {
    folder: './src/widgets/',
  },
})
