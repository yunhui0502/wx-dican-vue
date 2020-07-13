<template>
  <div>
    <div class="typepage">
      <el-card class="box-card">
        <el-form
          :model="dataForm"
          label-width="260px"
          :rules="dataFormRules"
          ref="dataForm"
          :size="size"
          label-position="right"
        >
          <el-form-item label="旧密码" prop="oldPaddWord">
            <el-input class="p10" v-model="dataForm.oldPaddWord" placeholder="请输入旧密码" type="password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassWord">
            <el-input class="p10" v-model="dataForm.newPassWord" placeholder="请输入新密码" type="password" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="确认密码" prop="newPassword2">
            <el-input class="p10" type="password" placeholder="请确认新密码" v-model="dataForm.newPassword2"></el-input>
        </el-form-item>
           <el-form-item >
             <el-button  type="primary" @click.native="submitForm">修改</el-button>
          </el-form-item>
        </el-form>

      </el-card>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import log from '@/service/login.js'
export default {
  name: '',
  data () {
    const validateNewPassword = (rule, value, callback) => {
      if (value === this.dataForm.oldPaddWord) {
        callback(new Error('新密码不能与原密码相同!'))
      } else {
        callback()
      }
    }
    const validateNewPassword2 = (rule, value, callback) => {
      if (value !== this.dataForm.newPassWord) {
        callback(new Error('与新密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      size: 'small',
      cgpwdVisible: false, // 编辑界面是否显示
      editLoading: false, // 载入图标
      // 初始化数据
      dataForm: {
        oldPaddWord: '',
        newPassWord: '',
        newPassword2: ''
      },
      // 设置属性
      dataFormRules: {
        oldPaddWord: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassWord: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        newPassword2: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: validateNewPassword2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    // 设置可见性
    setCgpwdVisible: function (cgpwdVisible) {
      this.cgpwdVisible = cgpwdVisible
    },
    // 提交请求
    submitForm: function () {
      // this.$refs.XXX 获取ref绑定的节点
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.dataForm.AccountId = store.getUser().account
          this.$confirm(`确认要修改为 ${this.dataForm.newPassWord}`, '提示', {}).then(() => {
            log.updatePasswd(this.dataForm, res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.p10 {
  width: 300px;
}
</style>
