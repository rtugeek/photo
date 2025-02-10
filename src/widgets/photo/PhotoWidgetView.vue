<script lang="ts" setup>
import {
  WidgetWrapper,
  useWidget,
} from '@widget-js/vue3'
import shuffle from 'lodash-es/shuffle'
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { Left, Right } from '@icon-park/vue-next'
import {
  FileApi,
  WidgetApi,
} from '@widget-js/core'
import { useIntervalFn, useStorage, useTimeoutFn } from '@vueuse/core'
import { PhotoConfig } from '@/widgets/photo/model/PhotoConfig'

const photos = ref<string[]>([])
const showGuide = ref(false)
const {
  widgetParams,
} = useWidget()

const bufferSize = 10
const imageRef = useTemplateRef<HTMLImageElement>('imageRef')
const photoRef = useTemplateRef<HTMLDivElement>('photoRef')
const photoConfig = useStorage(`photo-config-${widgetParams.id}`, new PhotoConfig())
const visiblePhotos = ref<string[]>([])
const currentUrl = ref('')
const currentIndex = ref(0)
const startIndex = 0
const endIndex = bufferSize
function reloadData() {
  if (photoConfig.value.directory) {
    FileApi.readDirectory(photoConfig.value.directory, { ignoreDir: true, onlyFiles: true, deep: 1, pattern: '**/*.{jpg,jpeg,gif,png,webp}' }).then((rootFile) => {
      const pathArr = rootFile.children?.map(file => file.absolutePath) ?? []
      photos.value = photoConfig.value.random ? shuffle(pathArr) : pathArr
      currentUrl.value = photos.value[0]
    })
    showGuide.value = false
  }
  else {
    showGuide.value = true
  }
}
async function showConfig() {
  WidgetApi.openConfigPage(widgetParams.id!)
}

watch(photoConfig, () => {
  reloadData()
})

onMounted(async () => {
  await nextTick()
  reloadData()
})

function update(next: boolean = true) {
  const oldImage = imageRef.value!.cloneNode() as HTMLImageElement
  oldImage.style.zIndex = '1001'
  photoRef.value?.appendChild(oldImage)
  const animation = oldImage.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 800, fill: 'forwards' })
  animation.addEventListener('finish', () => {
    oldImage.remove()
  })
  let currentIndex = photos.value.indexOf(currentUrl.value)
  if (next) {
    currentIndex++
  }
  else {
    currentIndex--
  }
  if (currentIndex > photos.value.length - 1) {
    currentIndex = 0
  }
  else if (currentIndex < 0) {
    currentIndex = photos.value.length - 1
  }
  currentUrl.value = photos.value[currentIndex]
}

const updateInterval = useIntervalFn(() => {
  update()
}, photoConfig.value.duration)

const mouseMoveTimeout = useTimeoutFn(() => {
  updateInterval.resume()
}, 3000)

function onMouseMove() {
  updateInterval.pause()
  mouseMoveTimeout.start()
}
</script>

<template>
  <WidgetWrapper>
    <div ref="photoRef" class="photo" @mousemove="onMouseMove">
      <template v-if="showGuide">
        <div class="tip" style="justify-content: center" @click="showConfig">
          点击设置图片文件夹
        </div>
      </template>
      <template v-else-if="photos.length == 0">
        <div class="tip" @click="showConfig">
          文件夹内没有图片
        </div>
      </template>
      <template v-else>
        <img ref="imageRef" class="photo-item" :src="currentUrl">
        <div class="previous" @click="update(false)">
          <Left />
        </div>
        <div class="next" @click="update(true)">
          <Right />
        </div>
      </template>
    </div>
  </WidgetWrapper>
</template>

<style scoped lang="scss">
.photo {
  position: relative;
  width: 100%;
  color: white;
  height: 100%;
  overflow: hidden;
  border-radius: var(--widget-border-radius);
  background-color: rgba(0, 0, 0, 0.2);

  .tip{
    display: flex;
    place-items: center;
    justify-content: center;
    height: 100%;
    line-height: 1.5;
    text-align: center;
    box-sizing: border-box;
    padding: 12px;
    font-size: 14px;
    cursor: pointer;
  }

  .next,.previous {
    width: 32px;
    background-color: rgba(0, 0, 0, 0.3);
    height: 32px;
    z-index: 2000;
    color: white;
    border-radius: 50%;
    display: flex;
    place-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);
    opacity: 0;
    transition: all 0.5s ease-out;
  }

  .previous{
    left: 8px;
  }

  .next{
    right:8px;
  }
  &:hover{
    .next,.previous {
      opacity: 1;
    }
  }

  .guide {
    position: fixed;
    top: 50%;
  }
}

.photo-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1000;
  position: absolute;
}
</style>
