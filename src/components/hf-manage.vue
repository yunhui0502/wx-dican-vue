<template>
  <!-- ------------------------------网站（web/h5）管理--------------------------------- -->
  <div>
    <el-row class="f10" :gutter="10">
      <el-col :span="6">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2"></el-input>
      </el-col>

      <el-col :span="3">
        <el-button size="small" @click="addApplet" type="primary">新建{{labelName}}</el-button>
        <!-- <el-button size="mini" type="primary" @click="uploadOpen">上传测试文件</el-button> -->
      </el-col>

      <el-col :span="4">
        <div style="font-size:9px;color:rgba(207,207,207,1);">可创建小程序数量：1000</div>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" prop="bossId" label="ID"></el-table-column>
      <el-table-column align="center" :label="labelName+'名称'">
        <template slot-scope="scope">
          <div>{{scope.row.appletName.name}}</div>
          <div>{{scope.row.appletName.phone}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="数量统计">
        <template slot-scope="scope">
          <div>用户数:{{scope.row.statistics.userNum}}</div>
          <div>订单数:{{scope.row.statistics.orderNum}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="expireTime" label="有效期"></el-table-column>
      <el-table-column align="center" label="所属账户">
        <template slot-scope="scope">
          <div>{{scope.row.openAccount.type=='2'?'代理':'员工'}}</div>
          <div>{{scope.row.openAccount.phoneType}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="address6" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)" type="primary">编辑</el-button>
          <el-button size="mini" @click="Delete(scope.row)" type="warning">回收</el-button>
          <el-button size="mini" @click="centerDialogEdit= true" type="primary">版权</el-button>
          <el-button size="mini" @click="disable(scope.row)" style="margin-left: 0" type="danger">禁用</el-button>
          <el-button size="mini" @click="transfer(scope.row)" type="primary">迁移</el-button>
          <el-button size="mini" style="opacity:0;">占位</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000"
    ></el-pagination>-->

    <el-dialog :title="'新建'+labelName" :visible.sync="centerDialogVisible" width="40%" center>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="formName"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item :label="labelName+'名称'" prop="name">
          <el-input size="small" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item v-if="hide" label="手机号" prop="name">
          <el-input size="small" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item :label="labelName+'有效期'" prop="expireTime">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="ruleForm.expireTime"
            type="datetime"
            placeholder="选择时间"
            align="right"
            default-time="12:00:00"
          ></el-date-picker>
        </el-form-item>
        <el-form-item v-if="labelName=='网站'" label="访问域名'" prop="region">
          <el-input size="small" v-model="ruleForm.region2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Determine('formName')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改版权" :visible.sync="centerDialogEdit" width="40%" center>
      <el-form :model="copyrightForm" :rules="rules" label-width="140px" class="demo-ruleForm">
        <el-form-item label="底部版权文字" prop="Copyright">
          <el-input size="small" v-model="copyrightForm.Copyright"></el-input>
        </el-form-item>
        <el-form-item label="底部版权图标" prop="region">
          <el-row class="mb20" :gutter="20">
            <el-upload
              ref="doctypeCrfile"
              :file-list="uploadform.docType.crFile"
              :data="copyrightForm"
              name="multipartFile"
              :auto-upload="false"
              action="/api/api/user/hf-auth/updateCopyright"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="9999"
              :on-exceed="handleExceed"
              :on-success="handleSuccess"
            >
              <el-button size="mini" type="primary">点击上传</el-button>
            </el-upload>

            <!-- <div>
              <icon name="caozuo-shangchuan-upload"></icon>
              <input
                name="file"
                @change="readImg($event)"
                style=" opacity: 0;  position:absolute;clip:rect(0 0 0 0);"
                type="file"
                id="file"
                value
                accept="image/*"
                capture="camera"
              />
              <label for="file" class="btn btn-success">原始单据上传</label>
            </div> -->

          </el-row>
          <el-row :gutter="20">
            <img src="../assets/images/log.png" alt />
            <!-- <el-upload
              action
              list-type="picture-card"
              :on-exceed="handleExceed"
              :before-upload="handleBeforeUpload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog>
              <img width="100%" :src="copyrightForm.multipartFile" alt />
            </el-dialog>-->
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="uploadConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="选择所属账户" :visible.sync="centerDialogRemoval" width="50%" center>
      <div>
        <span>当前迁移的商城：</span>
        <span>思维商城1</span>
      </div>
      <el-row class="f10" :gutter="10">
        <el-col :span="6">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2"></el-input>
        </el-col>
      </el-row>

      <el-table :data="accountlist" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名"></el-table-column>
        <el-table-column prop="address6" label="操作">
          <template slot-scope="scope" width="200">
            <el-button size="mini" @click="transferConfirm(scope.row)" type="primary">选择</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogRemoval = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogRemoval = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 弹框 -->
    <el-dialog
      title="上传测试文件"
      :visible.sync="uploadVisible"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="uploadform"
        :model="uploadform"
        label-width="110px"
        :label-position="labelPosition"
        size="small"
      >
        <el-form-item label="上传测试文件" prop="docType.crFile" ref="crFile">
          <el-upload
            ref="doctypeCrfile"
            :file-list="uploadform.docType.crFile"
            :data="{text:'测试数据'}"
            :auto-upload="false"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="9999"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
          >
            <el-button size="mini" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="uploadConfirm">确 定</el-button>
        <el-button size="mini" @click="uploadVisible= false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import managememt from '@/service/managememt.js'
import api from '@/service/store.js'
export default {
  props: ['labelName', 'tableData'],
  name: '',
  data () {
    return {
      uploadVisible: false,
      labelPosition: 'left',
      uploadform: {
        docType: {
          crFile: []
        }
      },

      total: 1,
      hide: true,
      bossId: '', // 迁移 id
      dialogVisible: false,
      centerDialogVisible: false,
      centerDialogEdit: false,
      centerDialogRemoval: false,
      // currentPage3: 5,
      input2: '',
      accountlist: [],
      ruleForm: {
        accountId: '',
        phone: '',
        expireTime: '', // 失效时间
        isPerpetual: '0', // 是否永久 -1永久0不是
        type: 'Applet',
        name: '',
        domain: '', // 网站访问名

        bossId: ''
      },

      copyrightForm: {
        Copyright: '', // 底部版权文字
        bossId: '2',
        // multipartFile: '', // 图片
        type: 'Applet'
      },

      // compileForm: {
      //   bossId: '',
      //   domain: '',
      //   expireTime: '',
      //   isPerpetual: '',
      //   name: '',
      //   type: 'Applet'
      // },

      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        expireTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    readImg (event) {
      console.log('上传文件', event)
      // const that = this
      // const file = event.target.files[0]

      // that.uploadImgName = file.name

      // const param = new FormData() // 创建form对象
      // param.append('file', file, file.name) // 通过append向form对象添加数据
      // param.append('order_no', that.order.order_no) // 添加form表单中其他数据
      // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进

      // //  添加请求头
      // api.migration(params, res => {
      //   console.log('迁移', res)
      //   this.$emit('fatherMethod')
      //   this.$message({
      //     message: '迁移成功',
      //     type: 'success'
      //   })
      // })
    },

    uploadOpen () {
      var vm = this
      vm.uploadform.docType.crFile = []
      vm.uploadVisible = true
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
    handleExceed (files, fileList) {
      this.$message.warning(`最多上传 ${this.limit} 个文件`)
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
    // 上传测试文件
    uploadConfirm () {
      var vm = this
      vm.$refs.doctypeCrfile.submit()
      this.centerDialogEdit = false
    },
    handleSuccess (response) {
      // eslint-disable-next-line eqeqeq
      if (response.code == 200) {
        this.$message.success('上传成功')
        this.uploadVisible = false
      }
    },

    // 迁移弹窗
    transfer (row) {
      console.log(row)
      this.centerDialogRemoval = true
      this.bossId = row.bossId
    },
    transferConfirm (row) {
      console.log(row.id)
      const params = {
        accountId: row.id,
        bossId: this.bossId,
        type: 'Applet'
      }
      if (this.labelName === '网站') {
        params.type = 'Web'
      } else if (this.labelName === 'UniApp') {
        params.type = 'UniApp'
      } else {
        params.type = 'Applet'
      }
      api.migration(params, res => {
        console.log('迁移', res)
        this.$emit('fatherMethod')
        this.$message({
          message: '迁移成功',
          type: 'success'
        })
      })
    },
    // handleExceed (files, fileList) {
    //   this.$message.warning(`最多上传${this.limit}个文件`)
    // },
    handleBeforeUpload (file) {
      console.log(file)
      this.copyrightForm.multipartFile = file.name

      return false
    },
    // Sass账号列表
    SassList () {
      managememt.SassList({}, res => {
        console.log('Sass账号列表', res.data.data)
        this.accountlist = res.data.data.list
      })
    },

    // 编辑
    edit (row) {
      console.log(row)
      console.log(row.bossId)
      this.ruleForm.name = row.appletName.name
      this.ruleForm.bossId = row.bossId
      // this.ruleForm.expireTime = row.appletName.name
      this.centerDialogVisible = true
      this.hide = false
    },
    // 新建
    addApplet () {
      this.centerDialogVisible = true
      this.hide = true
    },
    // 回收
    Delete (row) {
      console.log(row)
      const params = {
        isDeleted: '1',
        bossId: row.bossId,
        type: 'Applet'
      }
      if (this.labelName === '网站') {
        params.type = 'Web'
      } else if (this.labelName === 'UniApp') {
        params.type = 'UniApp'
      } else {
        params.type = 'Applet'
      }
      api.deleted(params, res => {
        console.log(res)
        this.$emit('fatherMethod')
        this.$message({
          message: '已回收',
          type: 'warning'
        })
      })
    },
    // 禁用
    disable (row) {
      console.log(row)
      const params = {
        isDeleted: '3',
        bossId: row.bossId,
        type: 'Applet'
      }
      if (this.labelName === '网站') {
        params.type = 'Web'
      } else if (this.labelName === 'UniApp') {
        params.type = 'UniApp'
      } else {
        params.type = 'Applet'
      }
      api.deleted(params, res => {
        console.log(res)
        this.$emit('fatherMethod')
        this.$message({
          message: '已禁用',
          type: 'warning'
        })
      })
    },
    Determine (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.labelName === '网站') {
            this.ruleForm.type = 'Web'
          } else if (this.labelName === 'UniApp') {
            this.ruleForm.type = 'UniApp'
          } else {
            this.ruleForm.type = 'Applet'
          }
          this.ruleForm.accountId = store.getUser().account
          if (this.hide) {
            console.log('新建')
            api.AddApplet(this.ruleForm, res => {
              console.log(res)
              this.centerDialogVisible = false
              this.$emit('fatherMethod')
            })
          } else {
            console.log('编辑')
            api.updateApp(this.ruleForm, res => {
              console.log(res)
              this.centerDialogVisible = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  created () {
    this.SassList()
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
@color2: #2ca6e0;
.upload {
  margin: 20px;
  font-size: 18px;
  color: @color2;
  display: flex;
  justify-content: space-between;

  .up-img {
    color: #333;
  }
}

</style>
