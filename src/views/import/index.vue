<template>
  <div class="import">
    <ImportExport :onSuccess="onSuccess">
      <template #fileList>
        <div class="show-file" v-if="currentFileName">
          <div class="file-name">
            {{ $t('excel.fileName') }}：{{ currentFileName }}
          </div>
          <el-table :data="currentExcelTableData">
            <el-table-column
              v-for="item in tableHeader"
              :key="item"
              :label="item"
            >
              <template #default="{ row }"> {{ row[item] }} </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </ImportExport>
  </div>
</template>

<script lang="ts">
export default { name: 'import' }
</script>

<script setup lang="ts">
import { userBatchImport } from '@/api/modules/userManage'
import ImportExport from '@/components/ImportExport/index.vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from './utils'
import { useI18n } from 'vue-i18n'
export interface IExcelData {
  [propName: string]: string
}
/**
 * 导入数据对应表
 */
const USER_RELATIONS: { [propName: string]: string } = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'rolesId',
  开通时间: 'openTime'
}
interface IExcel {
  header: string[]
  results: IExcelData[]
  fileName: string
}

const currentFileName = ref('')
const currentExcelTableData = ref<IExcelData[]>([])
const tableHeader = ref<string[]>([])
/**
 * 筛选数据
 */
const generateData = (results: IExcelData[]) => {
  const arr: IExcelData[] = []
  results.forEach((item) => {
    const userInfo: { [propName: string]: string } = {}
    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
      } else {
        userInfo[USER_RELATIONS[key]] = item[key]
      }
    })
    arr.push(userInfo)
  })
  return arr
}
const router = useRouter()
const i18n = useI18n()
const onSuccess = async ({ results, header, fileName }: IExcel) => {
  const uploadData = generateData(results)
  currentFileName.value = fileName
  currentExcelTableData.value = uploadData
  tableHeader.value = header
  await userBatchImport(uploadData).then((result) => {
    if (result.code === 200) {
      ElMessage.success({
        message: `${i18n.t('excel.importSuccess')} ${results.length}${i18n.t(
          'excel.bar'
        )}`,
        type: 'success'
      })
      router.push('/user/manage')
    }
  })
}
</script>

<style scoped lang="scss">
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
