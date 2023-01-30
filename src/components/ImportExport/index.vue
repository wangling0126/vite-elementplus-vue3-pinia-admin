<template>
  <div class="import-export-container">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        上传
      </el-button>
      <input
        ref="excelUploadInput"
        class="excel-upload-input"
        type="file"
        accept=".xlsx, .xls"
        @change="handleChange"
      />
    </div>
    <div
      class="drop-upload"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <span>拖拽导入</span>
    </div>
  </div>
  <div class="show-file" v-if="currentFileName">
    <div class="file-name">当前文件名称：{{ currentFileName }}</div>
    <el-table :data="currentExcelTableData">
      <el-table-column v-for="item in tableHeader" :key="item" :label="item">
        <template #default="{ row }"> {{ row[item] }} </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
export default { name: 'ImportExport' }
</script>

<script setup lang="ts">
import { isExcel } from '@/utils'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { getHeaderRow } from './xlsxUtils'
const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 成功回调
  onSuccess: Function
})
const loading = ref(false)
const currentFileName = ref('')
const currentExcelTableData = ref([])
const tableHeader = ref<string[]>([])
const excelUploadInput = ref<HTMLInputElement | null>(null)
const handleUpload = () => {
  excelUploadInput.value && excelUploadInput.value.click()
}

const readerData = (file: File) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    const reader = new FileReader()
    // 该事件在读取操作完成时触发
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
    reader.onload = (e) => {
      // 1. 获取解析到的数据
      const data = (e.target as FileReader).result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      // generateData({ header, results })
      currentExcelTableData.value = results
      tableHeader.value = header
      props.onSuccess && props.onSuccess({ header, results })
      // 8. loading 处理
      loading.value = false
      // 9. 异步完成
      // resolve()
    }
    // 启动读取指定的 Blob 或 File 内容
    reader.readAsArrayBuffer(file)
  })
}
const upload = (file: File) => {
  // excelUploadInput.value = null
  if (!props.beforeUpload) {
    return readerData(file)
  }

  // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作
  const before = props.beforeUpload(file)
  if (before) {
    readerData(file)
  }
}
const handleChange = (e: Event) => {
  if (!e.target) {
    return
  }
  const files = (e.target as HTMLInputElement).files
  let file = files?.[0]
  if (!file) return
  currentFileName.value = file.name
  upload(file)
}

const handleDrop = (e: DragEvent) => {
  // 上传中跳过
  if (loading.value) return
  const files = (e.dataTransfer as DataTransfer).files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  currentFileName.value = rawFile.name
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return false
  }
  // 触发上传事件
  upload(rawFile)
}
const handleDragover = (e: DragEvent) => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置生成源项的副本
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'copy'
  }
}
</script>

<style scoped lang="scss">
.import-export-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop-upload {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop-upload {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #bbb;
    .el-icon--upload {
      font-size: 60px;
      display: block;
    }
  }
}
.show-file {
  width: 700px;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  .file-name {
    margin-bottom: 10px;
  }
}
</style>
