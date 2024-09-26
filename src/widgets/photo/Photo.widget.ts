import {
  Widget,
  WidgetKeyword,
} from '@widget-js/core'

const name = '.photo'
// 组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
// 组件路由地址
const path = '/widget/photo'
// 配置页路由地址
// 组件关键词
const PhotoWidget = new Widget({
  previewImage: '/images/preview_photo.png',
  path,
  name,
  title: { 'zh-CN': '轮播相册', 'en-US': 'Carousel Gallery' },
  description: { 'zh-CN': '轮播文件夹内的图片', 'en-US': 'Carousel Images in the Folder' },
  keywords,
  lang: 'zh-CN',
  width: 2,
  categories: ['photo'],
  height: 2,
  minWidth: 1,
  maxWidth: 6,
  minHeight: 1,
  maxHeight: 6,
  configPagePath: '/widget/config/photo?width=600&height=400frame=true&transparent=false',
})

export default PhotoWidget
