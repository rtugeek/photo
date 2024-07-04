<script lang="ts" setup>
import { useWidget } from '@widget-js/vue3'
import { useStorage, useWindowSize } from '@vueuse/core'
import { nextTick, onMounted, ref } from 'vue'
import { AppConfig } from '@/common/AppConfig'

const { widgetParams } = useWidget()
const url = useStorage(`image-${widgetParams.id}`, AppConfig.DEFAULT_IMAGE)
const windowSize = useWindowSize()
const imgRef = ref<HTMLImageElement>()

/**
 * 将一个矩形居中缩放到另一个矩形中
 * @param width
 * @param height
 * @param targetWidth
 * @param targetHeight
 * @return  返回新的宽高数组
 */
function centerInsideRect(width: number, height: number, targetWidth: number, targetHeight: number): number[] {
  const aspectRatio = width / height
  let newWidth = width
  let newHeight = height
  if (width > targetWidth) {
    newWidth = targetWidth
    newHeight = newWidth / aspectRatio
  }
  if (newHeight > targetHeight) {
    newHeight = targetHeight
    newWidth = newHeight * aspectRatio
  }
  return [Math.round(newWidth), Math.round(newHeight)]
}

function reloadImageSize() {
  const img = imgRef.value
  if (img) {
    const { naturalWidth, naturalHeight } = img
    const ratio = naturalWidth / naturalHeight
    const size = centerInsideRect(naturalWidth, naturalHeight, windowSize.width.value, windowSize.height.value)
    console.log(size)
    img.style.width = `${size[0] - 64}px`
  }
}

window.onresize = () => {
  reloadImageSize()
}

onMounted(async () => {
  await nextTick()
  if (imgRef.value) {
    imgRef.value!.onload = () => {
      reloadImageSize()
    }
  }
})
</script>

<template>
  <widget-wrapper>
    <div class="wrapper" style="background: transparent">
      <div class="sticker">
        <img ref="imgRef" :src="url">
      </div>
    </div>
  </widget-wrapper>
</template>

<style>
*{
  user-select: none;
}

.wrapper{
 display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: none;
}

.sticker {
  --c: 50px;
  --p: 30px;
  --d: 10px;
  background: red;
  display: inline-block;
  padding: var(--p);
  background:
      radial-gradient(farthest-side at 0 0, #000, #0000) 0 0 / var(--c) var(--c),
      radial-gradient(farthest-side at 100% 100%, #000, #0000) 100% 100% / var(--c) var(--c),
      linear-gradient(#fff 0 0) 50% 50% / calc(100% - var(--p)) calc(100% - var(--p)),
      linear-gradient(#0000, #000 25% 75%, #0000) 50% 50% / calc(100% - var(--p)) calc(100% - var(--d)),
      linear-gradient(90deg, #0000, #000 25% 75%, #0000) 50% 50% / calc(100% - var(--d)) calc(100% - var(--p)),
      radial-gradient(farthest-side at 0 100%, #00000018, #0000) calc(100% - var(--d) * 0.5) calc(var(--d) * 0.5) / var(--d) var(--d),
      radial-gradient(farthest-side at 100% 0, #00000018, #0000) calc(var(--d) * 0.5) calc(100% - var(--d) * 0.5) / var(--d) var(--d)
;
  background-repeat: no-repeat;
  clip-path: polygon(0 var(--c), var(--c) 0, 100% 0, 100% calc(100% - var(--c)), calc(100% - var(--c)) 100%, 0 100%);
}

img {
  width: 55vw;
  object-fit: cover;
}
</style>
