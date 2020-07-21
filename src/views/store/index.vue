<template>
  <div class="typepage">
    <el-card class="box-card">
      <el-radio-group v-model="radiobutton" @change="Tabs" size="medium">
        <el-radio-button class="p13" label="1">用户列表</el-radio-button>
        <el-radio-button class="p13" label="2">管理员设置</el-radio-button>
      </el-radio-group>
    </el-card>
    <!-- ------------------------------小程序商城管理--------------------------------- -->

    <!-- <el-card v-if="criteria==1" class="box-card"> -->
    <el-card v-if="criteria==1" class="box-card">
      <div style="display:flex;justify-content : space-between;margin: 10px;">
        <el-button size="small" @click="Derived" type="primary">点击下载</el-button>

        <el-upload
          class="upload-demo"
          action="api/api/dichan/company"
          name="file"
          :on-change="onchange"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID"></el-table-column>
        <el-table-column align="center" prop="name" label="用户名称"></el-table-column>
        <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
        <el-table-column align="center" prop="address6" label="操作">
          <template slot-scope="scope" width="200">
            <el-button size="mini" @click="dialogFormVisible = true" type="primary">添加用户</el-button>
            <el-button size="mini" @click="Delete(scope)" type="danger">删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="ruleForm" :model="form">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- --------------------------------回收站-------------------------------------- -->

    <el-card v-if="criteria==2" class="box-card">

    <el-button style="margin: 10px;" @click="dialogFormSetting = true" type="primary">添加用户</el-button>

      <el-table :data="tableData2" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID"></el-table-column>
        <el-table-column align="center" prop="name" label="用户名称"></el-table-column>
        <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
        <el-table-column align="center" prop="address6" label="操作">
          <template slot-scope="scope" width="200">
            <el-button size="mini" @click="Delete2(scope)" type="danger">删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="添加管理员" :visible.sync="dialogFormSetting">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID"></el-table-column>
        <el-table-column align="center" prop="name" label="用户名称"></el-table-column>
        <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
        <el-table-column align="center" prop="address6" label="操作">
          <template slot-scope="scope" width="200">
            <el-button size="mini" @click="DeleteManage(scope)" type="danger">设置成管理员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import store from '@/service/store.js'
export default {
  name: '',
  data () {
    return {
      dialogFormSetting: false,
      dialogFormVisible: false,
      form: {
        name: '',
        phone: ''
      },
      fileList: [],
      radiobutton: '1',
      criteria: 1, // 判断显示那个表格
      currentPage3: 5,
      input2: '',
      tableData: [],
      tableData2: [],
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请填写手机号', trigger: 'blur' }]
      }
    }
  },
  methods: {

    DeleteManage (scope) {
      console.log(scope)
      store.addAdmin(scope.row.id, res => {
        console.log(res)
        this.selectAdmin()
        this.$message({
          type: 'success',
          message: `已把${scope.row.name}设置为管理员`
        })
      })
    },

    selectAdmin () {
      store.selectAdmin(res => {
        console.log(res)
        this.tableData2 = res.data.data
      })
    },
    onchange (file, fileList) {
      console.log(file, fileList)
      this.AppletList()
    },
    // 删除
    Delete (scope) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          store.deletedUser({ userId: scope.row.id }, res => {
            console.log(res)
            this.AppletList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      console.log(scope.row.id)
    },
    // 删除 后台管理员
    Delete2 (scope) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          store.deleteAdmin(scope.row.id, res => {
            console.log(res)
            this.selectAdmin()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      console.log(scope.row.id)
    },
    // 添加用户
    add (ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          store.addUser(this.form, res => {
            console.log(res)
            this.AppletList()
            this.dialogFormVisible = false
            this.$refs[ruleForm].resetFields()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    Tabs (e) {
      this.criteria = e
    },
    AppletList () {
      store.selectUser(res => {
        console.log(res)
        this.tableData = res.data.data
      })
    },
    Derived () {
      var url2 = 'api/api/dichan/company/selectTests'
      window.location.href = url2
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  },
  created () {
    this.AppletList()
    this.selectAdmin()
    // this.recyclebin()
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
</style>
