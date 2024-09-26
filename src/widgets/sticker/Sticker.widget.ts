import { Widget, WidgetKeyword } from '@widget-js/core'

const StickerWidget = new Widget({
  name: '.sticker',
  title: { 'zh-CN': '大头贴', 'en-US': 'Sticker' },
  description: { 'zh-CN': '将照片贴在桌面上', 'en-US': 'Stick photos on the desktop' },
  keywords: [WidgetKeyword.RECOMMEND],
  lang: 'zh-CN',
  categories: ['photo'],
  width: 3,
  height: 4,
  minWidth: 2,
  maxWidth: 6,
  minHeight: 2,
  maxHeight: 6,
  previewImage: '/images/preview_sticker.png',
  path: '/widget/sticker',
  configPagePath: '/widget/config/sticker?width=600&height=400frame=true&transparent=false',
})

export default StickerWidget
