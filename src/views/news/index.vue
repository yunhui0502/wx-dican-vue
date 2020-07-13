<template>
  <div class="typepage">
    <!-- ------------------------------消息管理--------------------------------- -->
    <el-card class="box-card">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="bossName" label="名字" width="180"></el-table-column>
        <el-table-column prop="content" label="模板内容" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="提交时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row,0)" type="text" size="small">同意</el-button>
            <el-button @click="handleClick(scope.row,1)" type="text" size="small">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="拒绝原因" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="拒绝原因" >
          <el-input v-model="form.refuseReason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Determine">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/service/news.js'
export default {
  name: '',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        refuseReason: '',
        applyId: ''
      },
      tableData: []
    }
  },
  methods: {
    handleClick (row, e) {
      console.log(row, e)
      if (e === 0) {
        console.log('同意')
        api.agreeMessageApply({ applyId: row.id }, (res) => {
          this.getMessageApplyList()
          this.$message({
            message: '已同意',
            type: 'success'
          })
        })
      } else {
        this.form.applyId = row.id
        console.log('拒绝')
        this.dialogFormVisible = true
      }
    },
    // 确定
    Determine () {
      api.refuseMessageApply(this.form, res => {
        this.$message('已拒绝')
        this.dialogFormVisible = false
        this.getMessageApplyList()
      })
    },
    // 列表
    getMessageApplyList () {
      api.getMessageApplyList(res => {
        console.log('查询', res.data.data)
        this.tableData = res.data.data
      })
    }
  },
  created () {
    this.getMessageApplyList()
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
</style>
