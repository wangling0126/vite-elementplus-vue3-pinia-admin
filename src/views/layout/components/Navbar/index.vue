<template>
  <div class="Navbar-container">
    <div class="narbar-left"></div>
    <div class="narbar-right">
      <el-dropdown class="avatar-container" trigger="click">
        <template v-slot:default>
          <div class="avatar-wrapper">
            <el-avatar
              shape="circle"
              :size="40"
              :src="userStore.userInfo.avatar"
            />
            <!-- <arrow-down /> -->
          </div>
        </template>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页 </el-dropdown-item>
            </router-link>

            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'Navbar' }
</script>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

const logout = () => {
  userStore.logout()
}
</script>

<style scoped lang="scss">
.Navbar-container {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.narbar-right {
  display: flex;
  justify-content: flex-end;
}
:deep .avatar-container {
  cursor: pointer;
  .avatar-wrapper {
    margin-top: 5px;
    position: relative;
    display: flex;
    .el-avatar {
      --el-avatar-background-color: none;
      margin-right: 12px;
      flex-shrink: 0;
    }
  }
}
</style>
