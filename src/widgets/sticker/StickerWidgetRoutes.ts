import type { RouteRecordRaw } from 'vue-router'
import StickerWidget from './Sticker.widget'

const path = StickerWidget.path
const name = StickerWidget.name

const configPagePath = StickerWidget.configPagePath!.split('?')[0]

const StickerWidgetRoutes: RouteRecordRaw[] = [
  {
    path,
    name: `${name}`,
    component: () =>
      import(
        /* webpackChunkName: "widget.js.photo.sticker" */ './StickerWidgetView.vue'
      ),
  },
  {
    path: configPagePath,
    name: `${name}.config`,
    component: () =>
      import(
        /* webpackChunkName: "widget.js.photo.sticker.config" */ './StickerConfigView.vue'
      ),
  },
]

export default StickerWidgetRoutes
