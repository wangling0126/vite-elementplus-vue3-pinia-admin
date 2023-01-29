<template>
  <div class="user-manage-container">
    <div class="button-group">
      <el-button type="primary" @click="goImportPage">
        {{ $t('excel.importExcel') }}</el-button
      >
      <el-button type="success">
        {{ $t('excel.exportExcel') }}
      </el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="联系方式" prop="mobile"></el-table-column>
      <el-table-column label="角色">
        <template v-slot="{ row }">
          {{ getRoleName(row.roles) }}
        </template>
      </el-table-column>
      <el-table-column label="开通时间" prop="openTime"></el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
        :total="pageTotal"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[1, 2, 5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'UserManage' }
</script>

<script setup lang="ts">
import { UserMange } from '@/api/interface/userManage'
import { getUserManageList } from '@/api/modules/userManage'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const tableData = ref<UserMange.UserManage[]>([])
const currentPage = ref(1)
const pageSize = ref(1)
const pageTotal = ref(0)
const getData = async () => {
  const res = await getUserManageList({
    current: currentPage.value,
    size: pageSize.value
  })
  const { data, current, size, total } = res.data
  tableData.value = data
  currentPage.value = current
  pageSize.value = size
  pageTotal.value = total
}
getData()

const handleCurrentPage = (current: number) => {
  currentPage.value = current
  getData()
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  getData()
}
const getRoleName = (roles: UserMange.Roles[]) => {
  return roles.map((item) => item.rolesName).join(',')
}

const router = useRouter()
const goImportPage = () => {
  router.push({ name: 'import' })
}
</script>

<style scoped lang="scss">
.button-group {
  margin-bottom: 10px;
  text-align: right;
}
</style>
