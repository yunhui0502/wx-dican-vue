<template>
  <!-- --------------------------------回收站-------------------------------------- -->
  <div>
    <el-row class="f10" :gutter="10">
      <el-col :span="6">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2"></el-input>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" prop="bossId" label="ID"></el-table-column>
      <el-table-column align="center" prop="name" label="注册账号">
        <template slot-scope="scope">
          <div>{{scope.row.appletName.phone}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="address" :label="labelName">
        <template slot-scope="scope">
          <div>{{scope.row.appletName.name}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="address2" label="所属账户">
        <template slot-scope="scope">
          <div>{{scope.row.openAccount.type=='2'?'代理':'员工'}}</div>
          <div>{{scope.row.openAccount.phoneType}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="address6" label="操作">
        <template slot-scope="scope" width="200">
          <el-button size="mini" @click="Delete(scope.row,0)" type="primary">恢复</el-button>
          <el-button size="mini" @click="Delete(scope.row,2)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000"
    ></el-pagination> -->
  </div>
</template>

<script>
import api from '@/service/store.js'
export default {
  props: ['labelName', 'tableData'],
  name: '',
  data () {
    return {
      currentPage3: 5,
      input2: ''
    }
  },
  methods: {

    // 删除 恢复
    Delete (row, e) {
      console.log(row)
      const params = {
        isDeleted: e,
        bossId: row.bossId,
        type: 'Applet'
      }
      if (this.labelName === '网站名称') {
        params.type = 'Web'
      } else if (this.labelName === 'UniApp名称') {
        params.type = 'UniApp'
      } else {
        params.type = 'Applet'
      }
      api.deleted(params, (res) => {
        console.log(res)
        this.$emit('recyclebin')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
</style>
