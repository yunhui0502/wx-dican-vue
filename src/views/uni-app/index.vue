<template>
  <!-- -----------------------------------uni-app商城管理--------------------------------------------------------------------------- -->
  <div class="typepage">
    <!-- <el-card class="box-card">
      <el-radio-group v-model="radiobutton" @change="Tabs" size="medium">
        <el-radio-button class="p13" label="1">轮播</el-radio-button>
        <el-radio-button class="p13" label="2">项目概况</el-radio-button>
        <el-radio-button class="p13" label="3">项目</el-radio-button>
      </el-radio-group>
    </el-card> -->
    <!-- ------------------------------轮播--------------------------------- -->
    <!-- <el-card v-if="criteria==1" class="box-card">
      <el-upload
        class="upload-demo"
        action="/api/api/dichan/ratation/addRatation"
        :data="{projectId:projectId,type:'homePage'}"
        name="file"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-remove="beforeRemove"
        multiple
        :limit="99"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="personal">
        <div class="content">
          1.标题及图像说明
          <div class="content-desc">
            <div class="title">轮播图</div>
          </div>
          2.图像区域
          <div class="content-image">
            <div v-for="(item,i) in tableDataUrl2" :key="i" class="upload-photo">
              <li v-on:mouseover="mouseoverImg()" v-on:mouseout="mouseoutImg()">
                <img ref="img" :src="'/api/api/dichan/category/getPicture?id='+ item.fileId" />
                <div ref="imgDelete" class="delete-img">
                  <i class="el-icon-delete" @click="deleteImg2(item)"></i>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </el-card> -->
    <!-- --------------------------------回收站-------------------------------------- -->
    <!-- <el-card v-if="criteria==2" class="box-card">
      <el-upload
        class="upload-demo"
        action="/api/api/dichan/company/addProject"
        :data="{projectId:projectId}"
        name="file"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-remove="beforeRemove"
        multiple
        :limit="99"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

      <div class="personal">
        <div class="content">
          1.标题及图像说明
          <div class="content-desc">
            <div class="title">项目概况图</div>
          </div>
          2.图像区域
          <div class="content-image">
            <div v-for="(item,i) in tableDataUrl" :key="i" class="upload-photo">
              <li v-on:mouseover="mouseoverImg()" v-on:mouseout="mouseoutImg()">
                <img ref="img" :src="item" />
                <div ref="imgDelete" class="delete-img">
                  <i class="el-icon-delete" @click="deleteImg(item)"></i>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </el-card> -->

    <!-- -------------------------------XM------------------------------------- -->
    <el-card  class="box-card">
      <el-button size="mini" @click="dialogFormVisible = true" type="primary">添加项目</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="address6" label="操作">
          <template slot-scope="scope" width="200">
            <el-button size="mini" @click="Details(scope)" type="primary">查看详情</el-button>
            <el-button size="mini" @click="Subtitle(scope)" type="primary">编辑</el-button>
            <el-button size="mini" @click="Delete(scope)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="添加项目" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="ruleForm" :model="form">
        <el-form-item label="项目名" prop="projectName">
          <el-input v-model="form.projectName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑项目" :visible.sync="editFormVisible">
      <el-form :rules="rules" ref="ruleForm" :model="form">
        <el-form-item label="项目名" prop="projectName">
          <el-input v-model="form.projectName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit('ruleForm')">确 定</el-button>
      </div>
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
      // ————————————————————————
      modal: { base64: '' },
      deleteFlag: false,
      uploadImage: '',
      // ------------
      dialogFormVisible: false,
      editFormVisible: false,
      tableDataUrl: [],
      tableDataUrl2: [],
      fileList: [], // 上传图
      projectId: '1',
      tableData: [],
      form: {
        projectName: '',
        id: ''
      },
      rules: {
        projectName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 1, message: '长度在 1 以上', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写手机号', trigger: 'blur' }
        ]
      },
      // -------------
      // ————————————————————————
      radiobutton: '1',
      criteria: 1,
      currentPage3: 1,
      pageNum: 1,
      pageNum2: 1,
      pageNum3: 1,
      total: 100,
      total2: 100,
      total3: 100
    }
  },
  methods: {
    // ------------------------------------------------------------------------------------------------
    // --------------------------图片--------------------------
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
    },
    handleSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      this.AppletList()
      this.getRatation()
      this.fileList = []
    },
    // ----------------------------------------------------
    Details () {
      this.$router.push({ path: '/web' })
    },
    // 删除
    Delete (scope) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(scope.row.id)
        api.deleteProject(scope.row.id, res => {
          console.log(res)
          this.getProject()
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
    add (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          api.addProject(this.form, res => {
            console.log(res)
            this.getProject()
            this.dialogFormVisible = false
            this.$refs[ruleForm].resetFields()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    Subtitle (scope) {
      console.log(scope)
      this.form.id = scope.row.id
      this.form.projectName = scope.row.projectName
      this.editFormVisible = true
    },
    edit (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          api.updateProject(this.form, res => {
            console.log(res)
            this.getProject()
            this.editFormVisible = false
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
      if (e === '1') {
        // this.AppletList()
      } else if (e === '2') {
        // this.recyclebin()
      } else {
      }
    },
    AppletList () {
      api.selectProject('1', res => {
        this.tableDataUrl = res.data.data
      })
    },
    getRatation () {
      api.getRatation('1', res => {
        this.tableDataUrl2 = res.data.data
      })
    },
    getProject () {
      api.getProject(res => {
        this.tableData = res.data.data
      })
    },
    // 鼠标移入图片
    mouseoverImg () {
      if (this.$refs.img.src === this.uploadImage) {
        // this.$refs.imgDelete.style.display = 'none'
      } else {
        // this.$refs.imgDelete.style.display = 'block'
      }
    },
    // 鼠标移出图片
    mouseoutImg () {
      // this.$refs.imgDelete.style.display = 'none'
    },
    // 本地上传头像
    uploadPhoto () {
      this.$refs.photoFile.click()
    },
    // 修改头像
    fileChange (e) {
      const file = this.$refs.photoFile.files[0]
      if (/.(png|jpg|jpeg)$/.test(file.name)) {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onload = e => {
          this.$refs.img.src = e.target.result
          this.$refs.photoFile.value = ''
          this.$set(this.modal, 'base64', e.target.result.split(',')[1])
        }
      } else {
        this.$message({
          message: '请选择符合格式要求的图片',
          type: 'warning'
        })
        this.$refs.photoFile.value = ''
      }
    },

    // 删除图片
    deleteImg (e) {
      console.log(e)

      this.$confirm('是否删除该照片?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var obj = e + ''
          var index = obj.lastIndexOf('=')
          obj = obj.substring(index + 1, obj.length)
          console.log(obj)
          api.deletedProject(obj, res => {
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
    },
    deleteImg2 (e) {
      console.log(e)

      this.$confirm('是否删除该照片?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.deleteRatation(e.id, res => {
            this.getRatation()
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
    }
    // ------------------------------------------------------------------------------------------------
  },
  created () {
    this.projectId = store.getUser().projectId
    this.AppletList()
    this.getRatation()
    this.getProject()
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
.personal {
  margin: 10px 0;
  padding: 10px;
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: hidden;
  border-radius: 3px;
  padding-bottom: 20px;
  .content {
    background-color: #fff;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    padding: 10px;
    // overflow-y: scroll;
    overflow: hidden;
    display: flex;
    padding: 10px 0;
    flex-direction: column;
    //  1.标题及图像说明
    .content-desc {
      margin: 0px 10px;
      .title {
        font-size: 16px;
        border-left: 5px solid #2d8cf0;
        padding-left: 10px;
        margin-bottom: 16px;
      }
      .desc {
        margin-left: 18px;
      }
    }
    // 2.图像区域
    .content-image {
      display: flex;
      flex-wrap: wrap;
      margin: 25px 28px;
      .upload-photo {
        width: 180px;
        height: 180px;
        box-sizing: border-box;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 20px;
        margin-top: 0px;
        padding-top: 0px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        li {
          width: 180px;
          height: 180px;
          margin-right: 15px;
          position: relative;
          .delete-img {
            display: block;
            position: absolute;
            width: 180px;
            height: 40px;
            line-height: 40px;
            left: 0px;
            top: 140px;
            background: rgba(59, 60, 61, 0.5);
            // box-sizing: content-box;
            z-index: 999;
            cursor: pointer;
            text-align: right;
            i {
              margin: 8px 10px 0 0;
              display: block;
              font-size: 24px;
              color: white;
            }
          }
          img {
            border: 1px dashed #d9d9d9;
            border-radius: 5px;
            box-sizing: border-box;
            width: 180px;
            height: 180px;
            margin-top: 0px;
            &:hover {
              border: 1px dashed #409eff;
            }
          }
        }
      }
    }
  }
}
</style>
