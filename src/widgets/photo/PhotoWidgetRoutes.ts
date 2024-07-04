import type { RouteRecordRaw } from 'vue-router'
import PhotoWidget from './Photo.widget'

const url = PhotoWidget.path
const name = PhotoWidget.name

const configUrl = PhotoWidget.configPagePath!.split('?')[0]

const PhotoWidgetRoutes: RouteRecordRaw[] = [
  {
    path: url,
    name: `${name}`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.photo" */ './PhotoWidgetView.vue'),
  },
  {
    path: configUrl!,
    name: `${name}.config`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.photo.config" */ './PhotoConfigView.vue'),
  },
]

export default PhotoWidgetRoutes
