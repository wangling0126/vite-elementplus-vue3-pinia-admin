<template>
  <div class="user-manage-container">
    <div class="button-group">
      <el-button type="danger" @click="handlerBatchDelete">
        {{ $t('common.batchDelete') }}
      </el-button>
      <el-button type="primary" @click="goImportPage">
        {{ $t('excel.importExcel') }}</el-button
      >
      <el-button type="success">
        {{ $t('excel.exportExcel') }}
      </el-button>
    </div>
    <el-table :data="tableData" border @selection-change="handleSelectionChange"
      >>
      <el-table-column type="selection" width="55" />
      <el-table-column
        :label="$t('userManage.name')"
        prop="username"
      ></el-table-column>
      <el-table-column
        :label="$t('userManage.mobile')"
        prop="mobile"
      ></el-table-column>
      <el-table-column :label="$t('userManage.roles')">
        <template v-slot="{ row }">
          {{ getRoleName(row.roles) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('userManage.openTime')"
        prop="openTime"
      ></el-table-column>
      <el-table-column :label="$t('common.operate')">
        <template v-slot="{ row }">
          <el-popconfirm
            :title="$t('userManage.deleteTips', { name: row.username })"
            @confirm="deleteUser(row.id)"
          >
            <template #reference>
              <el-button type="danger">{{ $t('common.delete') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
        :total="pageTotal"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[1, 2, 5, 10, 20, 50]"
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
import {
  deleteUserById,
  getUserManageList,
  batchDeleteUserByIds
} from '@/api/modules/userManage'
import { ElMessage } from 'element-plus'
import { onActivated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const tableData = ref<UserMange.UserManage[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
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
// 处理导入用户后数据不重新加载的问题
onActivated(getData)
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

const deleteUser = async (id: number) => {
  deleteUserById(id).then((res) => {
    if (res.code === 200) {
      ElMessage.success(i18n.t('tips.deleteSuccess'))
      handleCurrentPage(1)
    }
  })
}

// 多选操作
const multipleSelection = ref<UserMange.UserManage[]>([])
const handleSelectionChange = (val: UserMange.UserManage[]) => {
  multipleSelection.value = val
}

// 批量删除

const handlerBatchDelete = () => {
  if (!multipleSelection.value.length) {
    ElMessage.warning(i18n.t('tips.multipleSelectionTips'))
    return
  }
  const ids = multipleSelection.value.map((item) => item.id)
  batchDeleteUserByIds(ids).then((res) => {
    if (res.code === 200) {
      ElMessage.success(i18n.t('tips.deleteSuccess'))
      handleCurrentPage(1)
    }
  })
}
</script>

<style scoped lang="scss">
.button-group {
  margin-bottom: 10px;
  text-align: right;
}
</style>
