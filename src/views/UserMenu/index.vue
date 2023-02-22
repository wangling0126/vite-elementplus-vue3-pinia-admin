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
            <div>
              <span
                >{{ node.label }}
                <span class="router-name">{{ data.routerName }}</span></span
              >
              <svg-icon
                :icon="data.status === 0 ? 'disabled' : 'able'"
                class="icon-status"
                :class="data.status === 0 ? 'disabled-class' : 'able-class'"
              ></svg-icon>
            </div>

            <span class="btn-group">
              <el-tooltip :content="$t('auth.AppendChildNode')" placement="top">
                <svg-icon
                  icon="add"
                  @click.stop="handleAddChildNode(data)"
                ></svg-icon>
              </el-tooltip>
              <el-tooltip :content="$t('auth.EditNode')" placement="top">
                <svg-icon
                  icon="edit"
                  @click.stop="handleEditChildNode(node, data)"
                ></svg-icon>
              </el-tooltip>
              <el-tooltip :content="$t('auth.deleteNode')" placement="top">
                <el-popconfirm
                  :title="$t('auth.deleteNodeTips', { nodeName: data.label })"
                  @confirm="handleDeleteNode(data.id)"
                >
                  <template #reference>
                    <svg-icon icon="delete" @click.stop></svg-icon>
                  </template>
                </el-popconfirm>
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
      :currentEditNodeDetail="currentEditNodeDetail"
      @successCallback="getMenuTree"
    />
  </div>
</template>

<script lang="ts">
export default { name: 'UserMenu' }
</script>

<script setup lang="ts">
import { Auth } from '@/api/interface/auth'
import { deleteMenuById, getAllMenuList } from '@/api/modules/auth'
import AddOrEditMenuDialog from './AddOrEditMenuDialog.vue'
import { ref } from 'vue'

const menuTree = ref<Auth.ResMenu[]>([])
const getMenuTree = async () => {
  const res = await getAllMenuList()
  menuTree.value = res.data
}
const defaultProps = {
  children: 'children',
  label: 'label'
}
getMenuTree()

const dialogVisible = ref(false)
type OperationType = 'add' | 'edit'
const operationType = ref<OperationType>('add')
const parentNodeDetail = ref({})
const currentEditNodeDetail = ref({})
// 新增根节点
const handleAddRootNode = () => {
  operationType.value = 'add'
  parentNodeDetail.value = {}
  currentEditNodeDetail.value = {}
  dialogVisible.value = true
}

// 新增子节点
const handleAddChildNode = (data: Auth.ResMenu) => {
  operationType.value = 'add'
  parentNodeDetail.value = data
  currentEditNodeDetail.value = {}
  dialogVisible.value = true
}

const handleEditChildNode = (
  node: { parent: { data: {} } },
  data: Auth.ResMenu
) => {
  operationType.value = 'edit'
  parentNodeDetail.value = data.parent_id === 0 ? {} : node.parent.data
  currentEditNodeDetail.value = data
  dialogVisible.value = true
}

const handleDeleteNode = async (id: number) => {
  await deleteMenuById(id)
  getMenuTree()
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
.icon-status {
  margin-left: 5px;
}
.disabled-class {
  color: red;
}
.able-class {
  color: green;
}
.router-name {
  color: #a7a5a5;
  font-size: 12px;
}
</style>
