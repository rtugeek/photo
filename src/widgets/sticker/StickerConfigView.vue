<script lang="ts" setup>
import { WidgetConfigOption, useWidgetParams } from '@widget-js/vue3'
import { useStorage } from '@vueuse/core'
import { DialogApi } from '@widget-js/core'
import consola from 'consola'
import { AppConfig } from '@/common/AppConfig'

const widgetParams = useWidgetParams()
consola.log('widgetId', widgetParams.id)
const image = useStorage(`image-${widgetParams.id}`, AppConfig.DEFAULT_IMAGE)
// 修改成需要设置组件参数配置
const widgetConfigOption = new WidgetConfigOption({
})
function save() {
  window.close()
}

async function onPickFolderFocus() {
  const pickedFile = await DialogApi.pickFile(['jpg', 'jpeg', 'gif', 'png'])
  if (pickedFile) {
    image.value = pickedFile
  }
}
</script>

<template>
  <widget-edit-dialog
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    @confirm="save"
  >
    <template #custom>
      <ElFormItem label="图片地址">
        <ElInput
          v-model="image"
          clearable
          placeholder="请输入图片地址"
        >
          <template #append>
            <el-button @click="onPickFolderFocus">
              从本地选取
            </el-button>
          </template>
        </ElInput>
      </ElFormItem>
    </template>
  </widget-edit-dialog>
</template>

<style scoped></style>
