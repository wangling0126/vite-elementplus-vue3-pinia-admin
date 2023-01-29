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
</template>

<script lang="ts">
export default { name: 'ImportExport' }
</script>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'

const loading = ref(false)
const handleUpload = () => {
  console.log('上传')
}

const handleChange = () => {
  console.log('handleChange')
}

const handleDrop = () => {
  console.log('handleDrop')
}
const handleDragover = () => {
  console.log('handleDragover')
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
</style>
