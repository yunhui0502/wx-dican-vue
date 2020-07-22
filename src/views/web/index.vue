<template>
  <div class="typepage">
    <el-card class="box-card">
      <el-radio-group v-model="radiobutton" @change="Tabs" size="medium">
        <el-radio-button class="p13" label="1">首页
        </el-radio-button>
        <el-radio-button class="p13" label="2">项目概况</el-radio-button>
        <el-radio-button class="p13" label="3">类目管理</el-radio-button>
      </el-radio-group>
    </el-card>

    <!-- ------------------------------轮播--------------------------------- -->
    <el-card v-if="criteria==1" class="box-card">
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
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <div class="personal">
        <div class="content">
          <!-- 1.标题及图像说明 -->
          <!-- 2.图像区域 -->
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
    </el-card>

    <!-- --------------------------------项目概况-------------------------------------- -->
    <!-- <el-card v-if="criteria==2" class="box-card"> -->
      <!-- <el-upload
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
      </div> -->
      <manageme v-if="criteria==2"></manageme>
    <!-- </el-card> -->
    <!-- --------------------------------类目管理------------------------------------- -->
    <el-card v-if="criteria==3" class="box-card">
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
        <el-table-column prop="categoryName" label="详情" width="180">
          <template slot-scope="scope" width="200">
            <el-button size="mini" @click="particulars(scope)" type="danger">编辑详情</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="address6" label="操作">
          <template slot-scope="scope" width="200">
            <el-button size="mini" @click="addDetails(scope)" type="danger">添加子类目</el-button>
            <el-button size="mini" @click="editing(scope)" type="primary">编辑</el-button>
            <el-button size="mini" @click="Delete(scope)" type="danger">删除</el-button>
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

    <el-dialog title="编辑详情" :visible.sync="dialogDetails" width="90%">
         <el-upload
            ref="doctypeCrfile"
            name="file"
            :auto-upload="false"
            action="/api/api/dichan/company/fileUpLoad"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="9999"
            :on-success="handleSuccess"
          >
            <el-button size="mini" type="primary">选择本地图片</el-button>
          </el-upload>
          <el-button type="primary" @click="uploadURL">生产URL地址</el-button>
          <div>
            <div v-for="(itme,i) in photographUrllist" :key="i" >{{itme}}</div>
          </div>
      <!-- <el-upload
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
      </el-upload>-->

      <tinymce @fatherMethod="fatherMethod" v-if="dialogDetails" style="margin: 10px;" ref="blc" :id="'tinymceBzlc'"></tinymce>

      <div style="margin: 10px;">
        <el-button @click="dialogDetails = false">取 消</el-button>
        <el-button type="primary" @click="uploadConfirm2()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog style title="添加类目" width="40%" :visible.sync="dialogFormcategory">
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
      </el-tabs>
    </el-dialog>
    <div v-html="selectList"></div>
  </div>
</template>

<script>
import tinymce from '@/components/tinymce.vue'
import manageme from '@/views/management'
import store from '@/store'
import managememt from '@/service/managememt.js'
import api from '@/service/store.js'
export default {
  components: { tinymce, manageme },
  name: '',
  data () {
    return {
      photographUrllist: [],
      projectId: '',
      tableDataUrl: [],
      tableDataUrl2: [],
      selectList: '',
      DetailsForm: {
        richText: '', // 文本
        projectId: '60', // 项目id
        textType: 'category' // 富文本类型
      },
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
      dialogshow: true,
      dialogDetails: false,
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
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    uploadURL () {
      var vm = this
      vm.$refs.doctypeCrfile.submit()
    },
    AppletList2 () {
      api.selectProject('1', res => {
        this.tableDataUrl = res.data.data
      })
    },
    getRatation () {
      api.getRatation('1', res => {
        this.tableDataUrl2 = res.data.data
      })
    },
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
      this.photographUrllist.push(response.data)
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.uploadVisible = false
      }
      this.AppletList2()
      this.getRatation()
      this.fileList = []
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
            this.AppletList2()
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
    // ----------------------------------------------------
    // 添加类目
    addDetails (scope) {
      console.log()
      this.dialogFormcategory = true
      this.form2.projectId = store.getUser().projectId
      this.form2.parentCategoryId = scope.row.categoryId
      // this.DetailsForm.projectId = scope.row.categoryId
      this.id = scope.row.categoryId
    },
    // 添加详情
    particulars (scope) {
      console.log(scope.row)
      this.DetailsForm.projectId = scope.row.categoryId
      this.id = scope.row.categoryId
      this.dialogDetails = true
      managememt.selectText(this.DetailsForm, res => {
        console.log(res)
        this.selectList = res.data.data
        if (res.data.data != null) {
          console.log('不为空')
          setTimeout(() => {
            this.$refs.blc.setData(res.data.data)
          }, 10)
        } else {
          console.log('空')
          setTimeout(() => {
            this.$refs.blc.setData('')
          }, 10)

          // this.dialogDetails = true
        }
      })

      //
    },
    fatherMethod () {
      console.log(12)
      this.dialogDetails = true
      this.dialogshow = true
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
        {
          parentCategoryId: tree.categoryId,
          projectId: store.getUser().projectId
        },
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
      })
        .then(() => {
          api.deleteCategory(params, res => {
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
    },
    Tabs (e) {
      this.criteria = e
      // eslint-disable-next-line eqeqeq
      if (e == 3) {
        // this.dialogDetails = true
        // this.dialogshow = false
      }
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
      this.DetailsForm.richText = this.$refs.blc.release()
      // this.DetailsForm.projectId = store.getUser().projectId
      // console.log(this.selectList)
      // this.$refs.bzlc.setData()
      managememt.addText(this.DetailsForm, res => {
        console.log(res)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      })
      // var vm = this
      // vm.$refs.doctypeCrfile2.submit()
      // this.AppletList()
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
    // handlePreview (file) {
    //   console.log(file)
    //   // eslint-disable-next-line no-undef
    //   // var fileUrl = library.isEmpty(file.url) ? file.response.url : file.url
    //   // eslint-disable-next-line no-undef
    //   // fileUrl = fileUrl.indexOf(apis.api_file_urlNew) >= 0 ? fileUrl : (apis.api_file_urlNew + fileUrl)
    //   // window.open(fileUrl)
    // },
    // handleRemove (file, fileList) {
    //   console.log(file, fileList)
    //   for (var i = 0; i < this.fileList.length; i++) {
    //     // eslint-disable-next-line eqeqeq
    //     if (this.fileList[i].uid == file.uid) {
    //       this.fileList.splice(i, 1)
    //       break
    //     }
    //   }
    // },
    // beforeRemove (file, fileList) {
    //   // eslint-disable-next-line eqeqeq
    //   if (this.Qualified == '') {
    //     return this.$confirm(`确定移除 ${file.name}？`)
    //     // eslint-disable-next-line eqeqeq
    //   } else if (this.Qualified == '1') {
    //     return true
    //   }
    // },
    // handleExceed (files, fileList) {
    //   console.log(1)
    //   this.$message.warning(`最多上传 ${this.limit} 个文件`)
    // },
    // handleSuccess (response) {
    //   // eslint-disable-next-line eqeqeq
    //   console.log(response)
    //   // this.photographUrllist.push(response.data)
    //   if (response.status === 200) {
    //     this.$message.success('上传成功')
    //     this.uploadVisible = false
    //   }
    // },
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
    // this.selectText()
    this.projectId = store.getUser().projectId
    this.AppletList2()
    this.getRatation()
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
