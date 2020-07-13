<template>
    <!-- -------------------------------注册审核------------------------------------- -->
    <div>
      <el-row class="f10" :gutter="10">
        <el-col :span="6">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2"></el-input>
        </el-col>
      </el-row>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="date" label="申请账号"></el-table-column>
        <el-table-column align="center" prop="name" label="申请人信息"></el-table-column>
        <el-table-column align="center" prop="address" label="申请时间"></el-table-column>
        <el-table-column align="center" prop="address1" label="申请理由"></el-table-column>
        <el-table-column align="center" prop="address2" label="证件信息">
          <el-button @click="dialogVisible = true" type="text">查看详情</el-button>
        </el-table-column>
        <el-table-column align="center" prop="address6" label="操作">
          <template slot-scope="scope" width="200">
            <el-button size="mini" @click="aaa(scope)" type="primary">通过</el-button>
            <el-button size="mini" type="danger">拒绝</el-button>
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

   <el-dialog

  :visible.sync="dialogVisible"
  width="50%">
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in 4" :key="item">
      <!-- <h3>{{ item }}</h3> -->
    </el-carousel-item>
  </el-carousel>

</el-dialog>

    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      dialogVisible: false,
      currentPage3: 5,
      input2: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
</style>
