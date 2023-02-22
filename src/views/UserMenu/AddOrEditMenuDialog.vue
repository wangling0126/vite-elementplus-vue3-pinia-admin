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
        <el-input
          v-model="formData.label"
          @keydown.enter.prevent="submitForm(formRef)"
        />
      </el-form-item>
      <el-form-item label="节点状态" prop="status">
        <el-select v-model="formData.status" style="width: 100%">
          <el-option label="开启" :value="1" />
          <el-option label="停用" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="父节点" prop="plabel" v-if="!isRoot && isAdd">
        <el-input v-model="formData.plabel" :disabeld="true" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="submitForm(formRef)"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default { name: 'addOrEditMenuDialog' }
</script>

<script setup lang="ts">
import { Auth } from '@/api/interface/auth'
import {
  addMenu,
  checkRepeatMenuRouterName,
  updateMenu
} from '@/api/modules/auth'
import { ElMessage, FormInstance } from 'element-plus'
import { computed, nextTick, reactive, ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  operationType?: string
  parentNodeDetail: Partial<Auth.ResMenu>
  currentEditNodeDetail: Partial<Auth.ResMenu>
}>()
const emit = defineEmits(['update:visible', 'successCallback'])

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
const validateRouterName = async (rule: any, value: any, callback: any) => {
  if (!/[a-zA-Z]/.test(value)) {
    callback(new Error('只能输入英文'))
  } else {
    const res = await checkRepeatMenuRouterName(value)
    const repeatList = res.data
    const isNotRepeat = !repeatList.length
    const isEditNotRepeat =
      !isAdd.value &&
      repeatList.length === 1 &&
      repeatList[0].id === props.currentEditNodeDetail.id

    isNotRepeat || isEditNotRepeat
      ? callback()
      : callback(new Error('routerName不能重复，请重新输入'))
  }
}
const formRules = reactive({
  routerName: [
    { required: true, message: '节点名字不为空', trigger: 'blur' },
    { validator: validateRouterName, trigger: 'blur' }
  ]
})

watch(
  () => props.visible,
  (newVal) => {
    if (!newVal) {
      return
    }
    nextTick(() => {
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
    })
  },
  {
    deep: true
  }
)

const formRef = ref()
//  点击确定按钮
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      sendRequest()
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const sendRequest = () => {
  isAdd.value ? addMenuRequest() : updateMenuRequest()
}

const loading = ref(false)
const addMenuRequest = () => {
  const { routerName, label, status } = formData
  let params = {
    routerName,
    label,
    status,
    parent_id: isRoot.value ? 0 : props.parentNodeDetail.id,
    parent_path: isRoot.value ? '' : props.parentNodeDetail.path
  }
  loading.value = true
  addMenu(params)
    .then(() => {
      emit('update:visible', false)
      emit('successCallback')
      ElMessage.success('创建菜单成功')
      resetForm(formRef.value)
    })
    .finally(() => {
      loading.value = false
    })
}
const updateMenuRequest = () => {
  const { routerName, label, status } = formData
  const params = {
    id: props.currentEditNodeDetail.id,
    routerName,
    label,
    status
  }
  updateMenu(params)
    .then(() => {
      emit('update:visible', false)
      emit('successCallback')
      ElMessage.success('更新菜单成功')
      resetForm(formRef.value)
    })
    .finally(() => {
      loading.value = false
    })
}

const cancel = () => {
  resetForm(formRef.value)
  emit('update:visible', false)
}
</script>
<style scoped lang="scss"></style>
