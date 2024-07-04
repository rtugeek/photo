import type { RouteRecordRaw } from 'vue-router'
import StickerWidgetRoutes from '@/widgets/sticker/StickerWidgetRoutes'
import PhotoWidgetRoutes from '@/widgets/photo/PhotoWidgetRoutes'

// FBI WANING! IMPORT PLACE, DONT DELETE THIS LINE
const WidgetRouter: RouteRecordRaw[] = [
  ...StickerWidgetRoutes,
  ...PhotoWidgetRoutes,
  // FBI WANING! ROUTE PLACE, DONT DELETE THIS LINE
]
export default WidgetRouter
