<template>
  <div>
    <!-- 头部 -->
    <div class="head">
      <div class="img">
        <img style="width:100%" src="../../assets/images/head-log.png" alt />
      </div>
      <div class="center box">
        <el-select @change="categshijan"  size="mini" style="position:absolute" v-model="projectId" placeholder="请选择">
          <el-option
            change="categshijan"
            class="qqqwe"
            v-for="item in project"
            :key="item.id"
            :label="item.projectName"
            :value="item.id"
          ></el-option>
        </el-select>
        <h1>管理中心</h1>

        <el-dropdown>
          <span class="el-dropdown-link">
            用名称
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="amend">修改密码</div>
            </el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/">富文本模块</el-menu-item>
          <el-menu-item index="/store">用户中心</el-menu-item>
          <!-- <el-menu-item index="/web">分类模块</el-menu-item> -->
          <el-menu-item index="/uni-app">项目管理</el-menu-item>
          <!-- <el-menu-item index="/news">消息管理</el-menu-item>
          <el-menu-item index="/set">设置</el-menu-item> -->
        </el-menu>
      </div>
    </div>
    <!-- 内容部分 -->
    <router-view></router-view>
  </div>
</template>

<script>
import api from '@/service/store.js'
import store from '@/store'
export default {
  data () {
    return {
      projectId: 1,
      project: [],
      content: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    amend () {
      console.log(1)
      this.$router.push({ path: '/passwd' })
    },
    categshijan (e) {
      console.log(e)
      const data = store.getUser()
      data.projectId = e
      store.setUser(data)
    },
    recyclebin () {
      api.getProject(res => {
        console.log(res)
        this.project = res.data.data
        const data = store.getUser()
        data.projectId = res.data.data[0].id
        store.setUser(data)
      })
    }
  },
  created () {
    this.recyclebin()
  },
  mounted () {
    this.content = store.getUser()
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
</style>
