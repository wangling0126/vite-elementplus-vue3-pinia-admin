<template>
  <div class="Navbar-container">
    <div class="narbar-left">
      <hamburger />
      <Breadcrumb />
    </div>
    <div class="narbar-right">
      <!-- 全屏软件 -->
      <screenfull class="mr10" />
      <!-- 主题切换 -->
      <ThemeSeleteVue class="mr10" />
      <!-- 语言切换 -->
      <LanguageSelect class="language-select-container mr10" />
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
import hamburger from './components/hamburger.vue'
import Breadcrumb from './components/Breadcrumb/index.vue'
import LanguageSelect from '@/components/LanguageSelect/index.vue'
import ThemeSeleteVue from '@/components/ThemeSelete/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
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
.narbar-left {
  display: flex;
  align-items: center;
}
.narbar-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.language-select-container {
  font-size: 20px;
  margin-right: 8px;
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
.mr10 {
  margin-right: 10px;
}
</style>
