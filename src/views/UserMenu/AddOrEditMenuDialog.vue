<template>
  <el-dialog v-model="visible" :title="dialogTitle" width="50%">
    <el-form
      ref="formRef"
      :model="formData"
      label-width="100px"
      :rules="formRules"
    >
      <el-form-item label="路由名称" prop="routerName">
        <el-input v-model="formData.routerName" />
      </el-form-item>
      <el-form-item label="名称" prop="label">
        <el-input v-model="formData.label" />
      </el-form-item>
      <el-form-item label="节点状态" prop="status">
        <el-select v-model="formData.status" style="width: 100%">
          <el-option label="开启" :value="1" />
          <el-option label="停用" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="父节点" prop="plabel" v-if="!isRoot || isAdd">
        <el-input v-model="formData.plabel" :disabeld="true" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="visible = false"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default { name: 'addOrEditMenuDialog' }
</script>

<script setup lang="ts">
import { Auth } from '@/api/interface/auth'
import { computed, reactive, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  operationType?: string
  parentNodeDetail: Partial<Auth.ResMenu>
  currentEditNodeDetail: Partial<Auth.ResMenu>
}>()
const emit = defineEmits(['update:visible'])

const visible = computed({
  get: () => props.visible,
  set: (value) => {
    emit('update:visible', value)
  }
})

const isRoot = computed(() => {
  const parent_id = props.parentNodeDetail?.parent_id
  return !parent_id && parent_id !== 0
})

const isAdd = computed(() => {
  return props.operationType === 'add'
})

const dialogTitle = computed(() => {
  const titleType = props.operationType === 'add' ? '新增' : '编辑'
  const titleNodeType = isRoot.value ? '根' : '子'
  return titleType + titleNodeType + '节点弹窗'
})

const formData = reactive({
  routerName: '',
  label: '',
  status: 1,
  plabel: ''
})
const formRules = reactive({
  routerName: [{ required: true, message: '节点名字不为空', trigger: 'blur' }]
})

watch(
  () => props.visible,
  (newVal) => {
    if (!newVal) {
      return
    }
    if (isAdd.value) {
      const { label } = props.parentNodeDetail
      !isRoot.value && (formData.plabel = label || '')
    } else {
      const { routerName, label, status } = props.currentEditNodeDetail
      Object.assign(formData, {
        routerName,
        label,
        status
      })
    }
  },
  {
    deep: true
  }
)
</script>
<style scoped lang="scss"></style>
