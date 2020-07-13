<template>
  <div class="typepage">
    <!-- <el-card v-if="criteria==1" class="box-card"> -->
    <el-card class="box-card">

      <el-button style="float: right;" @click="dialogVisible = true" type="purple">+添加类目</el-button>
      <el-table
        :data="tableData1"
        style="width: 100%"
        row-key="categoryId"
        border
        lazy
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="categoryId" label="id" width="180"></el-table-column>
        <el-table-column prop="categoryName" label="类目" width="180"></el-table-column>
        <el-table-column label="图" width="180">
          <template slot-scope="scope">
            <img :src="'/api/api/dichan/category/getPicture?id='+ scope.row.fileId" alt />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="address6" label="操作">
          <template slot-scope="scope" width="200">
            <el-button size="mini" @click="editing(scope)" type="primary">编辑</el-button>
            <el-button size="mini" @click="Delete(scope)" type="danger">删除</el-button>
            <el-button size="mini" @click="addDetails(scope)" type="danger">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.category" autocomplete="off"></el-input>
        </el-form-item>
        <el-upload
          ref="doctypeCrfile"
          :data="form"
          name="fileInfo"
          :auto-upload="false"
          :on-change="onchange"
          action="/api/api/dichan/category/updateCategory"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="9999"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadConfirm(1)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新建类目" :visible.sync="dialogVisible" width="40%">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <div style="margin-left: 100px;">
          <div>
            选择填加目录
            <el-select
              @change="categshijan"
              v-model="form1.levelId1"
              placeholder="请选择"
              style="margin-left: 38px;"
            >
              <el-option
                change="categshijan"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div>
            新建类目名称
            <el-input
              v-model="form1.category"
              placeholder="请输入类目名称"
              style="width:40%;margin-left:40px;"
            ></el-input>
          </div>
          <br />
          <div></div>
          <span slot="footer" class="dialog-footer">
            <div style="width: 300px;height: 80px ;margin: 0 auto;">
              <el-button @click="dialogVisible = false" style="float: left;width:140px;">取 消</el-button>
              <el-button
                @click="addCategory"
                type="primary"
                style="float: right;width:140px;background: #A6A3FB;"
              >确 定</el-button>
            </div>
          </span>
        </div>
      </el-tabs>
    </el-dialog>

    <el-dialog title="添加类目" :visible.sync="dialogFormcategory">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="添加类目" name="first">
          <el-form :model="form2">
            <el-form-item label="名称">
              <el-input v-model="form2.category" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>

          <el-upload
            ref="doctypeCrfile"
            :data="form2"
            name="file"
            :auto-upload="false"
            :on-change="onchange"
            action="/api/api/dichan/category/addCategory"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
           <div style="margin: 10px;">
            <el-button @click="dialogFormcategory = false">取 消</el-button>
            <el-button type="primary" @click="uploadConfirm(2)">确 定</el-button>
           </div>

        </el-tab-pane>
        <el-tab-pane label="添加详情" name="second">
           <el-upload
            ref="doctypeCrfile2"
            :data="{id:id}"
            name="file"
            :auto-upload="false"
            action="/api/api/dichan/category/addCategoryDetail"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
           <div style="margin: 10px;">
            <el-button @click="dialogFormcategory = false">取 消</el-button>
            <el-button type="primary" @click="uploadConfirm2()">确 定</el-button>
           </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import api from '@/service/store.js'
export default {
  name: '',
  data () {
    return {
      id: '', // 添加详情 id
      activeName: 'first',
      ifUrl: false,
      project: '',
      form1: {
        category: '', // 类目名称
        levelId: '0', // 类目级别, 顶层类目的类目级别是0, 紧跟顶层类目的类目级别是1,
        parentCategoryId: '-1', // 上级类目id, 如果顶级类目, 上级类目ID, 设置为-1
        projectId: 1,
        levelId1: 0
      },
      // 判断一级目录选择的东西控制2 3 目录显示隐藏
      controlCatalogue: '0',
      options: [
        {
          value: 0,
          label: '一级目录'
        }
      ],
      dialogVisible: false,
      dialogFormVisible: false,
      dialogFormcategory: false,
      form: {
        category: '',
        categoryId: ''
      },
      form2: {
        category: '',
        parentCategoryId: '',
        projectId: ''
      },
      fileList: [],
      radiobutton: '1',
      criteria: 1, // 判断显示那个表格
      currentPage3: 5,
      input2: '',
      tableData1: []
    }
  },
  methods: {
    // 添加类目或添加详情
    addDetails (scope) {
      this.dialogFormcategory = true
      this.form2.projectId = store.getUser().projectId
      this.form2.parentCategoryId = scope.row.categoryIdid
      this.id = scope.row.categoryId
    },
    onchange (file, fileList) {
      console.log(file, fileList)
      this.ifUrl = true
    },
    // 编辑
    editing (scope) {
      this.dialogFormVisible = true
      this.form.category = scope.row.categoryName
      this.form.categoryId = scope.row.categoryId
    },
    // 编辑确定按钮
    compile () {
      api.updateCategory(this.form, res => {
        console.log(res)
        this.ifUrl = false
        this.dialogFormVisible = false
        this.AppletList()
      })
    },
    addCategory () {
      this.form1.projectId = store.getUser().projectId
      api.addCategory(this.form1, res => {
        console.log(res)
        this.dialogVisible = false
        this.AppletList()
      })
    },
    // 一级 下拉触发事件
    categshijan (e) {
      // this.controlCatalogue = e
    },
    handleClick (row) {
      console.log(row)
    },

    load (tree, treeNode, resolve) {
      console.log(tree, treeNode, resolve)
      // categoryId
      api.findDownCategory(
        { parentCategoryId: tree.categoryId, projectId: store.getUser().projectId },
        res => {
          console.log(res)
          resolve(res.data.data)
        }
      )
    },
    // 删除
    Delete (scope) {
      console.log(scope.row.categoryId)
      var params = {
        categoryId: scope.row.categoryId
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteCategory(params, res => {
          console.log(res)
          this.AppletList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    Tabs (e) {
      this.criteria = e
    },
    uploadConfirm (e) {
      if (this.ifUrl) {
        var vm = this
        vm.$refs.doctypeCrfile.submit()
        this.dialogFormVisible = false
        this.AppletList()
        this.ifUrl = false
      } else {
        if (e === 1) {
          this.compile()
        } else {
          this.$message.error('请选择图片')
        }
      }
    },
    uploadConfirm2 () {
      var vm = this
      vm.$refs.doctypeCrfile2.submit()
      this.AppletList()
    },
    AppletList () {
      api.findDownCategory(
        { parentCategoryId: '-1', projectId: store.getUser().projectId },
        res => {
          console.log(res)
          this.tableData1 = res.data.data
        }
      )
    },
    handlePreview (file) {
      console.log(file)
      // eslint-disable-next-line no-undef
      // var fileUrl = library.isEmpty(file.url) ? file.response.url : file.url
      // eslint-disable-next-line no-undef
      // fileUrl = fileUrl.indexOf(apis.api_file_urlNew) >= 0 ? fileUrl : (apis.api_file_urlNew + fileUrl)
      // window.open(fileUrl)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      for (var i = 0; i < this.fileList.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (this.fileList[i].uid == file.uid) {
          this.fileList.splice(i, 1)
          break
        }
      }
    },
    beforeRemove (file, fileList) {
      // eslint-disable-next-line eqeqeq
      if (this.Qualified == '') {
        return this.$confirm(`确定移除 ${file.name}？`)
        // eslint-disable-next-line eqeqeq
      } else if (this.Qualified == '1') {
        return true
      }
    },
    handleExceed (files, fileList) {
      console.log(1)
      this.$message.warning(`最多上传 ${this.limit} 个文件`)
    },
    handleSuccess (response) {
      // eslint-disable-next-line eqeqeq
      console.log(response)
      // this.photographUrllist.push(response.data)
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.uploadVisible = false
      }
    },
    recyclebin () {
      api.getProject(res => {
        console.log(res)
        this.project = res.data.data
      })
    }
  },
  created () {
    this.AppletList()
    this.recyclebin()
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
</style>
