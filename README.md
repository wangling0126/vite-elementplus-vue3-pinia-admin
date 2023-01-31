# 介绍
该项目是包括前端/后端/数据库
- 前端： 基于 vite + vue3 + element-plus + vue-router4 + pinia + vue-i18n + typescript的一套后台管理框架 - 持续更新 现在功能不是很多
- 后端: koa2
- 数据库： mysql

# 功能介绍
- 接口全是通过koa2写的，数据库用的mysql,(也是第一次用koa2+mysql,主要还是学习)
- 项目采用typescript(这个公司没有，也是学习)
- 支持主题切换
- 支持i18n国际化
- excel导入，解析excel,保存到服务器


# 安装步骤
Clone：
```bash
git clone git@github.com:wangling0126/vite-elementplus-vue3-pinia-admin.git
# or
git clone https://github.com/wangling0126/vite-elementplus-vue3-pinia-admin.git
```

Install：
``` js
// 前端
pnpm install

// 后端
cd server
pnpm install
```
mysql安装 

[mysql8安装](https://blog.csdn.net/kuailexiaomeng/article/details/123484763)

```
mysql使用的是 mysql8 注意设置密码的时候为Wang963.963.,因为我服务器连接的时候写的这个密码
mysql可视化工具用的DBeaver
导入sql文件就行了 - 后期完了在上传，这个项目应该没人来看吧
```

运行：
``` js
// 前端
pnpm dev

// 后端
cd server
pnpm dev
```

