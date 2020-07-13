<template>
  <div class="body">
    <div class="box1">
      <div style="display:flex;">
        <div class="clear">
          <div class="box-log clearfloat">
            <div class="log">
              <img src="../../assets/images/log.png" alt />
            </div>
            <div class="log1">
              <img src="../../assets/images/box3.png" alt />
            </div>
          </div>
        </div>

        <div class="Login">
          <h3 class="font-shadow">管理员登录</h3>
          <div class="div-form">
            <el-form
              v-if="loginmethod"
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              class="demo-ruleForm"
            >
              <el-form-item prop="username">
                <el-input
                  class="bottom"
                  placeholder="请输入用户名"
                  prefix-icon="el-icon-user"
                  v-model="ruleForm.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="captcha">
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-input
                      placeholder="请输入验证码"
                      v-model="ruleForm.captcha"
                      prefix-icon="el-icon-unlock"
                      autocomplete="off"
                    ></el-input>
                  </el-col>
                  <el-col :span="14">
                    <!-- <img src="data:image/jpeg;base64, authCodeurl"/> -->
                    <div>
                      <img :src="authCodeurl" @click="authCode" alt />
                    </div>
                    <!-- <div><img :src="authCodeurl" @click="codeGit" alt=""></div> -->
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  placeholder="请输入密码"
                  v-model="ruleForm.password"
                  prefix-icon="el-icon-unlock"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item style="text-align: center;">
                <el-link @click="Switch" v-if="loginmethod" type="success">手机号登录</el-link>
                <el-checkbox style="margin-left: 10px;" v-model="checked">记住我，以后登录</el-checkbox>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" round @click="submitForm('ruleForm')">登录</el-button>
              </el-form-item>
            </el-form>

            <el-form
              v-if="!loginmethod"
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              class="demo-ruleForm"
            >
              <el-form-item prop="authKey">
                <el-input
                  class="bottom"
                  placeholder="请输入手机号"
                  prefix-icon="el-icon-user"
                  v-model="ruleForm.authKey"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="captcha">
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-input
                      placeholder="请输入验证码"
                      v-model="ruleForm.captcha"
                      prefix-icon="el-icon-unlock"
                      autocomplete="off"
                    ></el-input>
                  </el-col>
                  <el-col :span="14">
                    <!-- <img src="data:image/jpeg;base64, authCodeurl"/> -->
                    <div>
                      <img :src="authCodeurl" @click="authCode" alt />
                    </div>
                    <!-- <div><img :src="authCodeurl" @click="codeGit" alt=""></div> -->
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item prop="passwd">
                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-input
                      placeholder="请输入短信验证码"
                      v-model="ruleForm.passwd"
                      prefix-icon="el-icon-unlock"
                      autocomplete="off"
                    ></el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-button @click="getcode" type="success" round>获取验证码</el-button>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item style="text-align: center;">
                <el-link @click="Switch" v-if="!loginmethod" type="success">账号登录</el-link>
                <el-checkbox style="margin-left: 10px;" v-model="checked">记住我，以后登录</el-checkbox>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" round @click="submitForm('ruleForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import log from '@/service/login.js'
export default {
  data () {
    // 定义一个校验函数
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不合法'))
      }
      callback()
    }
    const validateCode = (rule, value, callback) => {
      if (!/^[1-9]\d{3}$/.test(value)) {
        return callback(new Error('验证码长度4位数'))
      }
      callback()
    }
    const validateCode2 = (rule, value, callback) => {
      if (!/^^.{4}$$/.test(value)) {
        return callback(new Error('验证码长度4位数'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      uuid: '',
      captcha: '1', // 存储对比验证码
      loginmethod: false,
      checked: true,
      authCodeurl: '',
      ruleForm: {
        authKey: '17612219999', // 手机号
        // authKey: '', // 手机号
        loginType: '2', // 登录类型
        passwd: '', // 验证码
        password: '', // 密码
        username: '', // 账号

        captcha: '' // 图片验证
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        authKey: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: checkMobile, trigger: 'change' }
        ],
        passwd: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change']
          },
          { validator: validateCode, trigger: ['blur', 'change'] }
        ],
        captcha: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change']
          },
          { validator: validateCode2, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    this.authCode()
  },
  methods: {
    // 切换登录方式
    Switch () {
      if (this.loginmethod) {
        console.log('手机')
        this.ruleForm.loginType = '2'
      } else {
        console.log('账号')
        this.ruleForm.loginType = '1'
      }
      this.loginmethod = !this.loginmethod
    },
    authCode () {
      this.uuid = store.getUuid(32, 16)
      // log.authCode(this.uuid, res => {
      // console.log('验证码图', res)
      this.authCodeurl = '/api' + '/api/user/hf-auth/code?uuid=' + this.uuid
      setTimeout(() => { this.codeGit() }, 10)
      // })
    },
    codeGit () {
      log.codeGit(this.uuid, res => {
        console.log('验证码', res)
        this.captcha = res.data
      })
    },
    // 获取验证码
    getcode () {
      console.log(this.ruleForm.authKey === /^1[3-9]\d{9}$/)
      const patrn = /^1[3-9]\d{9}$/
      log.codeGit(this.uuid, res => {
        console.log('验证码', res)
        this.captcha = res.data
        if (this.ruleForm.captcha === '') {
          this.$message.error('验证码不能为空')
          return
        }
        if (this.captcha !== this.ruleForm.captcha) {
          this.$message.error('验证码不正确')
          return
        }
        if (patrn.exec(this.ruleForm.authKey)) {
          const params = {
            phone: this.ruleForm.authKey,
            type: 'login'
          }
          log.code(params, res => {
            console.log(res)
            this.ruleForm.passwd = res.data.data
          })
        // this.$router.push('/');
        } else {
          return false
        }
      })
    },
    // 登录
    submitForm (formName) {
      this.codeGit()
      if (this.ruleForm.captcha === '') {
        this.$message.error('验证码不能为空')
        return
      }
      if (this.captcha !== this.ruleForm.captcha) {
        this.$message.error('验证码不正确')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          log.login(this.ruleForm, res => {
            console.log(res)
            const data = res.data.data
            store.setUser(data)
            this.$router.push('/')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
@import "./miain.css";
</style>
