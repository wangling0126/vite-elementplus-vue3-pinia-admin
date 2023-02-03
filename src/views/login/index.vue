<template>
  <div class="login-container">
    <el-form :model="formData" :rules="loginRules" ref="formRef">
      <h2 class="title">{{ $t('login.登录界面') }}</h2>
      <LanguageSelect />
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="formData.username"
          :placeholder="$t('login.用户名')"
          class="input"
        >
          <template v-slot:prefix>
            <svg-icon icon="user" :color="iconColor"></svg-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :type="showPassword ? `text` : 'password'"
          v-model="formData.password"
          :placeholder="$t('login.密码')"
          class="input"
        >
          <template v-slot:prefix>
            <svg-icon icon="password" :color="iconColor"></svg-icon>
          </template>
          <template v-slot:suffix>
            <svg-icon
              :icon="showPassword ? 'showPassword' : 'hidePassword'"
              style="cursor: pointer"
              :color="iconColor"
              @click="toggleShowPassword"
            ></svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-button type="primary" style="width: 100%" @click="doLogin">{{
        $t('login.登录')
      }}</el-button>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import type { ElForm } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSelect from '@/components/LanguageSelect/index.vue'
const i18n = useI18n()
const router = useRouter()

const userStore = useUserStore()
const formData = reactive({
  username: '',
  password: ''
})
const iconColor = '#adaebd'

const showPassword = ref(false)
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

const validatePassword = () => {
  return (rule: any, value: any, callback: any) => {
    if (value.length < 6) {
      callback(new Error(i18n.t('login.密码不能少于6位')))
    } else {
      callback()
    }
  }
}

// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: computed(() => {
        return i18n.t('login.用户名为必填项')
      })
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()
const doLogin = () => {
  if (!formRef.value) {
    return
  }
  formRef.value.validate((valid) => {
    if (valid) {
      userStore.login(formData).then((res) => {
        if (res.code === 200) {
          router.replace({
            name: 'layout'
          })
        }
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #2f394b;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    text-align: center;
    color: white;
    margin-bottom: 30px;
  }
  :deep(.el-form) {
    width: 600px;
    padding: 48px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    .el-input__wrapper {
      background-color: #293441;
      box-shadow: none;
    }
    .el-input__inner {
      color: #adaebd;
    }
  }
  .user-icon {
    color: v-bind(iconColor);
  }
}
// 解决输入框自动填充
.input :deep(.el-input__inner) {
  box-shadow: inset 0 0 0 1000px transparent !important;
  color: #fff !important;
  &:-internal-autofill-previewed {
    -webkit-text-fill-color: #ffffff !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }
  &:-internal-autofill-selected {
    -webkit-text-fill-color: #ffffff !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }
}
</style>
