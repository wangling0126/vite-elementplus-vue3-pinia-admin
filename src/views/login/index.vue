<template>
  <div class="login-container">
    <el-form :model="formData">
      <h2 class="title">登录界面</h2>
      <el-form-item>
        <el-input type="text" v-model="formData.userName" placeholder="用户名">
          <template v-slot:prefix>
            <svg-icon icon="user" :color="iconColor"></svg-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-input
          :type="showPassword ? `text` : 'password'"
          v-model="formData.password"
          placeholder="密码"
        >
          <template v-slot:prefix>
            <svg-icon icon="password" :color="iconColor"></svg-icon>
          </template>
          <template v-slot:suffix>
            <svg-icon
              :icon="!showPassword ? 'showPassword' : 'hidePassword'"
              style="cursor: pointer"
              :color="iconColor"
              @click="toggleShowPassword"
            ></svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-button type="primary" style="width: 100%">登录</el-button>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
const formData = reactive({
  userName: '',
  password: ''
})

const iconColor = '#adaebd'
const showPassword = ref(false)
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
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
</style>
