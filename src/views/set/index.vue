<template>
  <div class="typepage">
    <el-card class="box-card">
      <el-radio-group v-model="radiobutton" @change="Tabs" size="medium">
       <el-radio-button class="p13" label="1">富文本</el-radio-button>
          <el-radio-button class="p13" label="2">富文本列表</el-radio-button>
      </el-radio-group>
    </el-card>

          <el-card v-if="criteria==1" class="box-card">
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
        </div>

        <!-- <edito :catchData="catchData" :val="val"></edito> -->
        <!-- <edito :catchData="catchData"></edito> -->
         <tinymce style="margin: 10px;" ref="bzlc" :id="'tinymceBzlc'" ></tinymce>
            <el-button style="display:block;margin:0 auto" type="primary" @click="uploading">上传</el-button>
      </el-card>

      <el-card v-if="criteria==2" class="box-card">
        <el-button @click="scclick" type="danger" plain>删除</el-button>
           <div v-html="selectList"></div>
      </el-card>
  </div>
</template>

<script>

// import api from '@/service/store.js'
// import edito from '@/components/edito.vue'
import store from '@/store'
import api from '@/service/managememt.js'
import tinymce from '@/components/tinymce.vue'
export default {
  components: { tinymce },
  name: '',
  data () {
    return {
      radiobutton: '1',
      form: {
        richText: '', // 文本
        projectId: '', // 项目id
        textType: 'general' // 富文本类型
      }

    }
  },
  created () {},
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
      api.selectText(this.form, (res) => {
        console.log(res)
        this.selectList = res.data.data
      })
    },
    Tabs (e) {
      console.log(e)
      this.radiobutton = e
    },
    handlePreview (file) {
      console.log(file)
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
