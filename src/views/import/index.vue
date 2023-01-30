<template>
  <div class="import">
    <ImportExport :onSuccess="onSuccess"></ImportExport>
  </div>
</template>

<script lang="ts">
export default { name: 'import' }
</script>

<script setup lang="ts">
import { userBatchImport } from '@/api/modules/userManage'
import ImportExport from '@/components/ImportExport/index.vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { formatDate } from './utils'

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
}
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
const onSuccess = async ({ results }: IExcel) => {
  const uploadData = generateData(results)
  console.log(uploadData, 'uploadData')
  await userBatchImport(uploadData)
    .then((result) => {
      if (result.code === 200) {
        ElMessage.success({
          message: results.length + '导入成功',
          type: 'success'
        })
        router.push('/user/manage')
      }
    })
    .catch(() => {
      console.log('失败了')
    })
}
</script>

<style scoped></style>
