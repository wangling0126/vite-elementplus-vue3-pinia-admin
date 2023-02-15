<template>
  <el-dialog v-model="visible" :title="dialogTitle" width="50%">
    <el-form
      ref="formRef"
      :model="formData"
      label-width="100px"
      :rules="formRules"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="描述" prop="descripition">
        <el-input v-model="formData.descripition" />
      </el-form-item>
      <el-form-item label="节点状态" prop="status">
        <el-select v-model="formData.status" style="width: 100%">
          <el-option label="开启" :value="1" />
          <el-option label="停用" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="父节点" prop="pname" v-if="!isRoot || isAdd">
        <el-input v-model="formData.pname" :disabeld="true" />
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
  parentNodeDetail: Auth.ResMenu
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
  name: '',
  descripition: '',
  status: 1,
  pname: ''
})
const formRules = reactive({
  name: [{ required: true, message: '节点名字不为空', trigger: 'blur' }]
})

watch(
  () => props.visible,
  (newVal) => {
    if (!newVal) {
      return
    }
    const { name, descripition, status } = props.parentNodeDetail
    if (isAdd.value) {
      !isRoot.value && (formData.pname = name)
    } else {
      Object.assign(formData, {
        name,
        descripition,
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
