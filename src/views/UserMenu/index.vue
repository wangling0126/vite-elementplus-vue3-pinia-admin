<template>
  <div class="UserMenu">
    <div class="page-header-button">
      <el-button type="success" @click="handleAddRootNode">
        {{ $t('auth.addRootNode') }}
      </el-button>
    </div>
    <el-card>
      <el-tree :data="menuTree" :props="defaultProps" default-expand-all>
        <template #default="{ node, data }">
          <div class="menu-item">
            <span>{{ node.label }}</span>
            <span class="btn-group">
              <el-tooltip :content="$t('auth.AppendChildNode')" placement="top">
                <svg-icon
                  icon="add"
                  @click.stop="addChildNode(data)"
                ></svg-icon>
              </el-tooltip>
              <el-tooltip :content="$t('auth.EditNode')" placement="top">
                <svg-icon icon="edit"></svg-icon>
              </el-tooltip>
            </span>
          </div>
        </template>
      </el-tree>
    </el-card>
    <AddOrEditMenuDialog
      v-model:visible="dialogVisible"
      :operationType="operationType"
      :parentNodeDetail="parentNodeDetail"
    />
  </div>
</template>

<script lang="ts">
export default { name: 'UserMenu' }
</script>

<script setup lang="ts">
import { Auth } from '@/api/interface/auth'
import { getAllMenuList } from '@/api/modules/auth'
import AddOrEditMenuDialog from './AddOrEditMenuDialog.vue'
import { ref } from 'vue'

const menuTree = ref<Auth.ResMenu[]>([])
const getMenuTree = async () => {
  const res = await getAllMenuList()
  menuTree.value = res.data
}
const defaultProps = {
  children: 'children',
  label: 'name'
}
getMenuTree()

const dialogVisible = ref(false)
type OperationType = 'add' | 'edit'
const operationType = ref<OperationType>('add')
const parentNodeDetail = ref({})
// 新增根节点
const handleAddRootNode = () => {
  operationType.value = 'add'
  parentNodeDetail.value = {}
  dialogVisible.value = true
}

// 新增子节点
const addChildNode = (data: Auth.ResMenu) => {
  operationType.value = 'add'
  parentNodeDetail.value = data
  dialogVisible.value = true
}
</script>

<style scoped lang="scss">
:deep() {
  .el-tree-node__label {
    flex: 1;
  }
}
.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .btn-group {
    display: none;
    .svg-icon {
      margin-left: 8px;
    }
  }
  &:hover .btn-group {
    display: block;
  }
}
</style>
