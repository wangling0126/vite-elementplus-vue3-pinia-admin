<template>
  <div class="role-list">
    <div class="page-header-button">
      <el-button type="success"> 新增角色 </el-button>
    </div>
    <el-table :data="roleList" style="width: 100%" border>
      <el-table-column prop="rolesName" label="名称" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status === '1' ? 'success' : 'info'">{{
            row.status === '1' ? '开启' : '关闭'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" />
    </el-table>
  </div>
</template>

<script lang="ts">
export default { name: 'RoleList' }
</script>

<script setup lang="ts">
import { Auth } from '@/api/interface/auth'
import { getAllRolesList } from '@/api/modules/auth'
import { ref } from 'vue'

const roleList = ref<Auth.ResRoles[]>([])
const getList = async () => {
  const res = await getAllRolesList()
  roleList.value = res.data
}
getList()
</script>

<style scoped lang="scss"></style>
