<script lang="ts" setup>
import {
  WidgetWrapper,
  useWidget,
  useWidgetSize,
} from '@widget-js/vue3'
import shuffle from 'lodash-es/shuffle'
import { nextTick, onMounted, ref, watch } from 'vue'
import {
  FileApi,
  WidgetApi,
} from '@widget-js/core'
import { useStorage } from '@vueuse/core'
import { PhotoConfig } from '@/widgets/photo/model/PhotoConfig'

const photos = ref<string[]>([])
const showGuide = ref(false)
const {
  widgetParams,
} = useWidget()

const photoConfig = useStorage(`photo-config-${widgetParams.id}`, new PhotoConfig())
function reloadData() {
  if (photoConfig.value.directory) {
    FileApi.readDirectory(photoConfig.value.directory, { ignoreDir: true, onlyFiles: true, deep: 1, pattern: '**/*.{jpg,jpeg,gif,png,webp}' }).then((rootFile) => {
      const pathArr = rootFile.children?.map(file => file.absolutePath) ?? []
      photos.value = photoConfig.value.random ? shuffle(pathArr) : pathArr
    })
    showGuide.value = false
  }
  else {
    showGuide.value = true
  }
}
const widgetSize = useWidgetSize()

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
</script>

<template>
  <WidgetWrapper>
    <div class="">
      <div class="photo">
        <el-carousel
          :height="`${widgetSize.height.value}px`"
          indicator-position="none"
          :interval="photoConfig.duration"
        >
          <el-carousel-item v-for="(item, index) in photos" :key="`${item}${index}`">
            <el-image fit="cover" class="photo-item" :src="item" alt="" />
          </el-carousel-item>
          <el-carousel-item v-if="showGuide" @click="showConfig">
            <h4 style="justify-content: center">
              点击设置图片文件
            </h4>
          </el-carousel-item>
          <el-carousel-item v-else-if="photos.length == 0">
            <h4 class="justify-center">
              文件夹内没有找到图片
            </h4>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </WidgetWrapper>
</template>

<style scoped>
*{
  user-select: none;
}
.photo {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: var(--widget-border-radius);
  background-color: rgba(0, 0, 0, 0.2);
}

.photo .guide {
  position: fixed;
  top: 50%;
}

.photo .photo-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-carousel__item h4 {
  display: flex;
  color: #fff;
  opacity: 0.75;
  height: 100%;
  place-items: center;
  margin: 0;
}
</style>
