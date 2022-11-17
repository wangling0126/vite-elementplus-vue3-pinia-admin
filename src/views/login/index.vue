<template>
  <div class="login-container">
    <el-form :model="formData">
      <h2 class="title">登录界面</h2>
      <el-form-item>
        <el-input type="text" v-model="formData.userName" placeholder="用户名">
          <template v-slot:prefix>
            <el-icon :color="iconColor"><User /></el-icon>
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
            <el-icon :color="iconColor"><Lock /></el-icon>
          </template>
          <template v-slot:suffix>
            <el-icon
              :color="iconColor"
              style="cursor: pointer"
              @click="toggleShowPassword"
            >
              <Hide v-if="showPassword" />
              <View v-else />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-button type="primary" style="width: 100%">登录</el-button>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { User, Lock, View, Hide } from '@element-plus/icons-vue'
const formData = reactive({
  userName: '',
  password: ''
})

const iconColor = '#817a7a'
const showPassword = ref(false)
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #1e1e1e;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    text-align: center;
    color: white;
    margin-bottom: 30px;
  }
  :deep .el-form {
    width: 600px;
    padding: 48px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
}
</style>
