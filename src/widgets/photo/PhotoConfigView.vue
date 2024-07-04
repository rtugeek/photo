<script lang="ts" setup>
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidgetParams,
} from '@widget-js/vue3'
import {
  DialogApi,
} from '@widget-js/core'
import {
  computed,
} from 'vue'
import { useStorage } from '@vueuse/core'
import { PhotoConfig } from '@/widgets/photo/model/PhotoConfig'

const widgetParams = useWidgetParams()
const photoConfig = useStorage(`photo-config-${widgetParams.id}`, new PhotoConfig())

const durationModel = computed({
  get: () => {
    return Math.floor(photoConfig.value.duration / 1000)
  },
  set: (val) => {
    photoConfig.value.duration = val * 1000
  },
})

// 修改成需要设置组件参数配置
const widgetConfigOption = new WidgetConfigOption({
  custom: true,
  theme: {
    backgroundColor: false,
    borderRadius: true,
  },
})

async function onPickFolderFocus() {
  const pickedFolder = await DialogApi.pickFolder()
  if (pickedFolder) {
    photoConfig.value.directory = pickedFolder
  }
}

function save() {
  window.close()
}
</script>

<template>
  <WidgetEditDialog
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    @confirm="save"
  >
    <template #custom>
      <ElFormItem label="文件夹">
        <ElInput
          v-model="photoConfig.directory"
          placeholder="自动轮播文件夹内照片（jpg,gif,png,jpeg）"
          @click="onPickFolderFocus"
        />
      </ElFormItem>
      <el-form-item label="轮播时间（秒）">
        <el-input-number v-model="durationModel" :min="1" :max="1000" />
      </el-form-item>
      <el-form-item label="随机播放">
        <el-switch v-model="photoConfig.random" />
      </el-form-item>
    </template>
  </WidgetEditDialog>
</template>

<style scoped></style>
