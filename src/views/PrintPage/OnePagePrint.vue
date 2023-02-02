<template>
  <div class="OnePagePrint">
    <el-row justify="end"
      ><el-button type="primary" :loading="printLoading" v-print="printObj"
        >打印</el-button
      ></el-row
    >
    <div class="print-container" id="printContainer">
      <h2 class="title">员工信息</h2>
      <el-row class="header">
        <el-descriptions class="margin-top" :column="2" border>
          <el-descriptions-item label="姓名">赵丽颖</el-descriptions-item>
          <el-descriptions-item label="性别">女</el-descriptions-item>
          <el-descriptions-item label="居住他">北京</el-descriptions-item>
          <el-descriptions-item label="名族">汉</el-descriptions-item>
          <el-descriptions-item label="手机号"
            >18723357111</el-descriptions-item
          >
          <el-descriptions-item label="入职时间"
            >2018-08-08</el-descriptions-item
          >
          <el-descriptions-item label="备注" :span="2">
            <el-tag>漂亮</el-tag>
            <el-tag>演员</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="联系地址" :span="2">
            成都市高新区天府三街
          </el-descriptions-item>
        </el-descriptions>
        <div class="photo">
          <el-image
            src="https://img1.baidu.com/it/u=2266779465,3168865501&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=686"
            fit="fill"
            :lazy="true"
          ></el-image>
        </div>
      </el-row>
      <div class="content">
        <el-descriptions direction="vertical" :column="1" border>
          <el-descriptions-item label="描述">
            <p class="indent">
              赵丽颖，1987年10月16日出生于河北省廊坊市，中国内地影视女演员。
            </p>
            <p class="indent">
              2006年，因获得《雅虎搜星》比赛冯小刚组冠军而进入演艺圈 [2]
              ；同年，在冯小刚执导的《跪族篇》中担任女主角 [3]
              。2011年，因在古装剧《新还珠格格》中饰演晴儿被更多观众认识 [4]
              。2013年，凭借古装剧《陆贞传奇》收获更多关注。2014年，在第10届中国金鹰电视艺术节投票活动中被选为“金鹰女神”
              [5]
              ；同年，她还凭借爱情剧《杉杉来了》获得了第5届国剧盛典内地最具人气女演员奖；并成立了海润传媒赵丽颖工作室。
            </p>
            <p class="indent">
              2015年，主演的仙侠剧《花千骨》创下中国内地周播剧收视纪录 [6]
              ，其个人也因此赢得广泛关注，更是凭借该剧先后获得第6届澳门国际电视节金莲花最佳女主角奖、第6届国剧盛典最具收视号召力演员奖、第22届上海电视节白玉兰奖最佳女主角奖提名、第28届中国电视金鹰奖观众喜爱的女演员奖
              [7-9] [229] 。2016年，担任河北省旅游形象大使 [1]
              。2017年，凭借剧情片《乘风破浪》获得第24届北京大学生电影节最受大学生欢迎女演员奖
              [10]
              ；而其主演的古装剧《楚乔传》则成为了中国内地首部在播期间网络播放量突破400亿次的电视剧
              [11] 。2018年，主演的都市剧《你和我的倾城时光》播出 [12-13]
              。此后，她又凭借古装剧《知否知否应是绿肥红瘦》获得了第25届上海电视节白玉兰奖最佳女演员提名
              [14] 、第30届中国电视金鹰奖观众喜爱的女演员奖 [17]
              。2022年，主演电视剧《幸福到万家》和《风吹半夏》播出 [236] [282]
              ；同年担任河北省影视家协会副主席 [273] 。
            </p>
          </el-descriptions-item>
          <el-descriptions-item label="主要成就">
            <ul>
              <li>第28届中国电视金鹰奖观众喜爱的女演员奖</li>
              <li>第30届中国电视金鹰奖观众喜爱的女演员奖</li>
              <li>第24届北京大学生电影节最受大学生欢迎女演员奖</li>
              <li>
                第6届澳门国际电视节最佳女主角奖 第3届横店影视文荣奖最佳女主角奖
              </li>
            </ul>
          </el-descriptions-item>
          <el-descriptions-item label="代表作">
            知否知否应是绿肥红瘦、风吹半夏、花千骨、陆贞传奇、杉杉来了、楚乔传、幸福到万家、谁是凶手、老九门、青云志、乘风破浪、西游记女儿国
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'OnePagePrint' }
</script>

<script setup lang="ts">
import { ref } from 'vue'

const printLoading = ref(false)
const printObj = {
  // 打印区域
  id: 'printContainer',
  // 打印标题
  popTitle: '赵丽颖简历',
  // 打印前
  beforeOpenCallback() {
    printLoading.value = true
  },
  // 执行打印
  openCallback() {
    printLoading.value = false
  }
}
</script>
<style scoped lang="scss">
.header {
  display: flex;
  ::v-deep .el-descriptions {
    flex-grow: 1;
  }
}
.photo {
  width: 100px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  border-left: none;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.indent {
  text-indent: 2em;
}
.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
}
</style>
