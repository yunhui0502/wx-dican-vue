<template>
  <!------------------------------------------账户管理-------------------------------------------------------------->
  <div>
    <div class="typepage">
      <el-card  class="box-card">
        <el-radio-group v-model="radiobutton" @change="Tabs" size="medium">
          <el-radio-button class="p13" label="1">富文本</el-radio-button>
          <el-radio-button class="p13" label="2">富文本列表</el-radio-button>
        </el-radio-group>
      </el-card>

      <el-card v-show="criteria" class="box-card">
        <div style="display:flex;justify-content : space-between;">
          <el-upload
            ref="doctypeCrfile"
            :file-list="uploadform.docType.crFile"
            name="file"
            :auto-upload="false"
            action="/api/api/dichan/company/fileUpLoad"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="9999"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
          >
            <el-button size="mini" type="primary">选择本地图片</el-button>
          </el-upload>
          <el-button type="primary" @click="uploadConfirm">生产URL地址</el-button>
          <div>
            <div v-for="(itme,i) in photographUrllist" :key="i" >{{itme}}</div>
          </div>
           <div>

             <div>富文本类型</div>
             <el-select v-model="form.textType" placeholder="项目类型">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </div>
        </div>

        <!-- <edito :catchData="catchData" :val="val"></edito> -->
        <!-- <edito :catchData="catchData"></edito> -->
         <tinymce style="margin: 10px;" ref="bzlc" :id="'tinymceBzlc'" ></tinymce>
            <el-button style="display:block;margin:0 auto" type="primary" @click="uploading">上传</el-button>
      </el-card>

      <el-card v-show="!criteria" class="box-card">
        <el-button @click="scclick" type="danger" plain>删除</el-button>
        <el-button @click="edit" type="danger" plain>编辑 </el-button>
           <div v-html="selectList"></div>
      </el-card>

    </div>
  </div>
</template>

<script>
import store from '@/store'
import api from '@/service/managememt.js'
// import log from '@/service/login.js'
import tinymce from '@/components/tinymce.vue'

export default {
  components: { tinymce },
  name: '',
  data () {
    return {
      radiobutton: '',
      uploadform: {
        docType: {
          crFile: []
        }
      },
      selectList: '',
      form: {
        richText: '', // 文本
        projectId: '', // 项目id
        textType: 'general' // 富文本类型
      },
      options: [{
        value: 'general',
        label: '项目概况'
      }, {
        value: 'details',
        label: '详情'
      }],
      photographUrllist: [],
      criteria: true

    }
  },
  created () {
    this.selectText()
  },
  methods: {
    scclick () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          productId: 1,
          type: 'general'
        }
        api.deletedText(params, (res) => {
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
    edit () {
      this.criteria = !this.criteria

      this.$refs.bzlc.setData(this.selectList)
    },
    // catchData (value) {
    //   this.form.richText = value // 在这里接受子组件传过来的参数，赋值给data里的参数
    //   this.form.richText = encodeURI(
    //     this.form.richText
    //       .replace(/&quot;|&#39;|&lt;|&gt;/g, '‘')
    //       .replace(/&nbsp;/g, '')
    //       .replace(/《/g, '《')
    //       .replace(/》/g, '》')
    //   )
    //   console.log('this.form.richText', this.form.richText)
    //   console.log('value', value)
    // }, selectList
    uploading () {
      this.form.richText = this.$refs.bzlc.release()
      this.form.projectId = store.getUser().projectId
      // console.log(this.selectList)
      // this.$refs.bzlc.setData()
      api.addText(this.form, (res) => {
        console.log(res)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      })
    },

    selectText () {
      this.form.projectId = store.getUser().projectId
      api.selectText(this.form, (res) => {
        console.log(res)
        this.selectList = res.data.data
      })
    },
    Tabs (e) {
      console.log(e)
      // eslint-disable-next-line eqeqeq
      if (e == 1) {
        this.criteria = true
      } else {
        this.criteria = false
      }
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
    uploadConfirm () {
      var vm = this
      vm.$refs.doctypeCrfile.submit()
      this.centerDialogEdit = false
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
      this.$message.warning(`最多上传 ${this.limit} 个文件`)
    },
    handleSuccess (response) {
      // eslint-disable-next-line eqeqeq
      console.log(response)
      this.photographUrllist.push(response.data)
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.uploadVisible = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
</style>
