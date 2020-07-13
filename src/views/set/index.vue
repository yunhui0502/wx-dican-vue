<template>
  <div class="typepage">
    <el-card class="box-card">
      <el-radio-group v-model="radiobutton" @change="Tabs" size="medium">
        <el-radio-button class="p13" label="1">系统设置</el-radio-button>
        <!-- <el-radio-button class="p13" label="2">账户上传管理</el-radio-button> -->
        <el-radio-button class="p13" label="3">清空缓存</el-radio-button>
        <el-radio-button class="p13" label="4">超限设置</el-radio-button>
        <!-- <el-radio-button class="p13" label="5">队列设置</el-radio-button> -->
        <el-radio-button class="p13" label="6">公告</el-radio-button>
        <!-- <el-radio-button class="p13" label="7">网站设置</el-radio-button> -->
        <el-radio-button class="p13" label="8">证书上传</el-radio-button>
      </el-radio-group>
    </el-card>
    <!-- ------------------------------系统设置--------------------------------- -->

    <el-card v-if="criteria==1" class="box-card">
      <div class="input-item2">
        <div style="display:flex;">
          <h5 class="mr70">站点配置</h5>
          <div>
            <el-form class label-width="100px" :model="formLabelAlign">
              <el-form-item label="站点logo">
                <el-row :gutter="20">
                  <el-col :span="17">
                    <div>
                      <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                    </div>
                    <div>
                      <p>仅支持上传.ico格式文件</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <el-button size="small" type="primary">上传logo</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div style="display:flex;">
          <h5 style="width:53.13px" class="mr70">站点配置</h5>
          <div>
            <el-form label-width="100px" :model="formLabelAlign">
              <el-form-item label="网站名称">
                <el-row :gutter="20">
                  <el-col :span="17">
                    <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="网站简称">
                <el-row :gutter="20">
                  <el-col :span="17">
                    <el-input size="mini" class="input-item" v-model="formLabelAlign.region"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="网站关键词">
                <el-row :gutter="20">
                  <el-col :span="17">
                    <div>
                      <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                    </div>
                    <div style="100%">
                      <p>多个关键字用英文,号隔开 例如:衣服,包包,鞋子</p>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="网站域名配置">
                <el-row :gutter="20">
                  <el-col :span="17">
                    <div>
                      <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                    </div>
                    <div style="100%">
                      <p>多个关键字用英文,号隔开 例如: 衣服,包包,鞋子</p>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="logo图片url">
                <el-row :gutter="20">
                  <el-col :span="17">
                    <div>
                      <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                    </div>
                    <div style="width:100%;">
                      <p>建议尺寸150*100，图片大小请小于1M</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <el-button size="small" type="primary">上传图片</el-button>
                  </el-col>
                </el-row>
                <img class="el-img2" src="../../assets/images/log.png" alt />
              </el-form-item>

              <el-form-item label="底部版权信息">
                <el-row :gutter="20">
                  <el-col :span="17">
                    <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="登录页背景图">
                <el-row :gutter="20">
                  <el-col :span="17">
                    <div>
                      <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                    </div>
                    <div style="width:100%;">
                      <p>建议尺寸150*100，图片大小请小于1M</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <el-button size="small" type="primary">上传图片</el-button>
                  </el-col>
                </el-row>
                <img class="el-img" src="../../assets/images/head.png" alt />
              </el-form-item>

              <el-form-item label="管理页背景图">
                <el-row :gutter="20">
                  <el-col :span="17">
                    <div>
                      <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                    </div>
                    <div style="width:100%;">
                      <p>建议尺寸150*100，图片大小请小于1M</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <el-button size="small" type="primary">上传图片</el-button>
                  </el-col>
                </el-row>
                <img class="el-img" src="../../assets/images/head.png" alt />
              </el-form-item>

              <el-form-item label-width="130" label="是否开启注册功能">
                <el-row :gutter="20">
                  <el-col :span="17">
                    <el-radio v-model="radio" label="1">是</el-radio>
                    <el-radio v-model="radio" label="2">否</el-radio>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label-width="130" label="证件信息是否必填">
                <el-row :gutter="20">
                  <el-col :span="17">
                    <el-radio v-model="radio2" label="1">是</el-radio>
                    <el-radio v-model="radio2" label="2">否</el-radio>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="注册页二维码">
                <el-row :gutter="20">
                  <el-col :span="17">
                    <h5 class="tu-text">图片1</h5>
                    <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                  </el-col>
                </el-row>

                <el-row class="el-row-p" :gutter="20">
                  <el-col :span="17">
                    <div>
                      <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                    </div>
                    <div style="width:100%;">
                      <p>建议尺寸150*100，图片大小请小于1M</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <el-button size="small" type="primary">上传图片</el-button>
                  </el-col>
                </el-row>
                <img class="el-img2" src="../../assets/images/log.png" alt />

                <el-row class="el-row-p" :gutter="20">
                  <el-col :span="17">
                    <h5 class="tu-text">图片2</h5>
                    <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                  </el-col>
                </el-row>

                <el-row class="el-row-p" :gutter="20">
                  <el-col :span="17">
                    <div>
                      <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                    </div>
                    <div style="width:100%;">
                      <p>建议尺寸150*100，图片大小请小于1M</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <el-button size="small" type="primary">上传图片</el-button>
                  </el-col>
                </el-row>
                <img class="el-img2" src="../../assets/images/log.png" alt />
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="edito" style="display:flex">
          <!-- <div style=" width: 238px;">注册协议</div> -->
          <edito></edito>
        </div>
      </div>
    </el-card>

    <el-card v-if="criteria==1" style="margin-top: 10px;" class="box-card">
      <div class="input-item2">
        <div>
          <h4 class="div-h4">短信配置（阿里云）</h4>
          <span>用于发送(注册、重置密码)短信验证码、注册结果短信通知</span>
        </div>

        <div class="mt30">
          <el-form class label-width="140px" :model="formLabelAlign">
            <el-form-item label="AccessKeyId">
              <el-row :gutter="20">
                <el-col :span="17">
                  <div>
                    <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="AccessKeySecret">
              <el-row :gutter="20">
                <el-col :span="17">
                  <div>
                    <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="短信签名">
              <el-row :gutter="20">
                <el-col :span="17">
                  <div>
                    <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                  </div>
                  <div>
                    <p>仅支持上传.ico格式文件</p>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="验证码模板ID">
              <el-row :gutter="20">
                <el-col :span="17">
                  <div>
                    <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                  </div>
                  <div>
                    <p>模板示例: 您的验证码是${code}</p>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="注册审核成功模板ID">
              <el-row :gutter="20">
                <el-col :span="17">
                  <div>
                    <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                  </div>
                  <div>
                    <p>用于用户注册审核成功的通知，模板示例：您注册的账户${name}审核已通过。</p>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="注册审核失败模板ID">
              <el-row :gutter="20">
                <el-col :span="17">
                  <div>
                    <el-input size="mini" class="input-item" v-model="formLabelAlign.name"></el-input>
                  </div>
                  <div>
                    <p>用于用户注册审核成功的通知，模板示例：您注册的账户${name}审核未通过。</p>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="17">
                  <el-button class="major-button" type="primary">保存</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    <!-- --------------------------------账户上传管理-------------------------------------- -->

    <!-- <el-card v-if="criteria==2" class="box-card">
      <el-button @click="dialogVisible = true" class="mb20" size="small" type="primary">添加存储位置</el-button>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="date" label="储存位置"></el-table-column>
        <el-table-column align="center" prop="name" label="默认储存"></el-table-column>
        <el-table-column align="center" prop="address6" label="操作">
          <template slot-scope="scope" width="200">
            <el-button size="mini" @click="aaa(scope)" type="primary">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>-->

    <el-dialog title="存储位置编辑" :visible.sync="dialogVisible" width="50%">
      <h3 class="mb20">* 存储位置</h3>
      <el-radio-group v-model="radio">
        <el-radio border size="small" :label="6">本地服务器</el-radio>
        <el-radio border size="small" :label="7">阿里云OSS</el-radio>
        <el-radio border size="small" :label="8">腾讯云COS</el-radio>
        <el-radio border size="small" :label="9">七牛云储存</el-radio>
      </el-radio-group>
      <!-- ----------------------------阿里云oss------------------------------------ -->
      <div v-if="radio==7">
        <el-form label-position="top" label-width="80px" :model="formLabelAlign">
          <el-form-item label="存储空间名称（Bucket）">
            <el-input v-model="formLabelAlign.name"></el-input>
            <el-switch v-model="value1" inactive-text="使用自定义域名"></el-switch>
          </el-form-item>
          <el-form-item label="Endpoint或自定义域名">
            <el-input v-model="formLabelAlign.region"></el-input>
            <div>
              示例:
              <span style="color:#FF0E5D">http://oss-xx-xxx-1.aliyuncs.com</span> 或
              <span style="color:#FF0E5D">http://mydomain.com</span>
            </div>
          </el-form-item>
          <el-form-item label="Access Key ID">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="Access Key Secret">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="图片样式接口（选填）">
            <el-input v-model="formLabelAlign.type"></el-input>
            <div>
              示例:
              <span style="color:#FF0E5D">?x-oss-process=style/stylename</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- ----------------------------腾讯云cos------------------------------------ -->
      <div v-if="radio==8">
        <el-form label-position="top" label-width="80px" :model="formLabelAlign">
          <el-form-item label="存储空间名称（Bucket）">
            <el-input v-model="formLabelAlign.name"></el-input>
            <div>
              示例:
              <span style="color:#FF0E5D">xxxxxx-125000000</span>
            </div>
          </el-form-item>
          <el-form-item label="所属地域">
            <el-input v-model="formLabelAlign.region"></el-input>
            <div>
              示例:
              <span style="color:#FF0E5D">ap-shanghai</span>或
              <span style="color:#FF0E5D">ap-shenzhen</span>或
              <span style="color:#FF0E5D">ap-xxxxxx</span>
            </div>
          </el-form-item>
          <el-form-item label="自定义域名">
            <el-input v-model="formLabelAlign.type"></el-input>
            <div>
              示例:
              <span style="color:#FF0E5D">http://mydomain.com</span>
            </div>
          </el-form-item>
          <el-form-item label="SecretId">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="SecretKey">
            <el-input v-model="formLabelAlign.type"></el-input>
            <div>
              示例:
              <span style="color:#FF0E5D">?x-oss-process=style/stylename</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- ---------------------------七牛云储存----------------------------------- -->
      <div v-if="radio==9">
        <el-form label-position="top" label-width="80px" :model="formLabelAlign">
          <el-form-item label="存储空间名称（Bucket）">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="绑定域名">
            <el-input v-model="formLabelAlign.region"></el-input>
            <div>
              示例:
              <span style="color:#FF0E5D">http://mydomain.com</span>或
              <span style="color:#FF0E5D">http://xxxxxx.bkt.clouddn.com</span>
            </div>
          </el-form-item>
          <el-form-item label="AccessKey（AK）">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="SecretKey（SK）">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="图片样式接口（选填）">
            <el-input v-model="formLabelAlign.type"></el-input>
            <div>
              示例:
              <span style="color:#FF0E5D">?imageView2/0/w/1080/h/1080/q/85|imageslim</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>

    <!-- -------------------------------清空缓存------------------------------------- -->

    <el-card v-if="criteria==3" class="box-card">
      <div class="checkbox">
        <el-checkbox v-model="checked">数据缓存</el-checkbox>
        <el-checkbox v-model="checked">临时文件</el-checkbox>
        <el-checkbox v-model="checked">更新文件</el-checkbox>
        <el-button class="elbutt" v-model="checked">确认清理</el-button>
      </div>
    </el-card>

    <!-- -------------------------------超限设置------------------------------------- -->

    <el-card v-if="criteria==4" class="box-card">
      <div class="input-item2" style="margin: 0 auto;">
        <el-form
          label-position="left"
          :model="numberValidateForm"
          ref="numberValidateForm"
          label-width="160px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="上传图片限制"
            prop="age"
            :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
          >
            <el-row :gutter="20">
              <el-col :span="16">
                <el-input
                  size="mini"
                  type="age"
                  class="input-item"
                  v-model.number="numberValidateForm.age"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-checkbox v-model="checked">无限制</el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            label="上传视频限制"
            prop="age"
            :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
          >
            <el-row :gutter="20">
              <el-col :span="16">
                <el-input
                  size="mini"
                  type="age"
                  class="input-item"
                  v-model.number="numberValidateForm.age"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-checkbox v-model="checked">无限制</el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            label="平台装修组件限制"
            prop="age"
            :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
          >
            <el-row :gutter="20">
              <el-col :span="16">
                <el-input
                  size="mini"
                  type="age"
                  class="input-item"
                  v-model.number="numberValidateForm.age"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-checkbox v-model="checked">无限制</el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- <el-card v-if="criteria==5" class="box-card">
      <div style>
        <div
          class="input-item2"
          style=" margin: 0 auto;flex-direction:column;display:flex;justify-content : flex-start;"
        >
          <h5 style=" margin: 10px 0;">启动服务</h5>
          <p style=" margin: 10px 0;">Linux使用SSH远程登录服务器，运行命令：</p>
          <el-input class="input-item2" placeholder="请输入内容" v-model="input" :disabled="true"></el-input>
          <h5 style=" margin: 10px 0;">测试服务</h5>
          <el-button class="button-item2" size="medium">开始测试</el-button>
        </div>
      </div>
    </el-card>-->

    <!-- <el-card v-if="criteria==6" class="box-card">
      <div style>
        <div class="input-item2" style="margin: 0 auto;flex-direction:column;display:flex;">
          <h5>域名设置</h5>
          <div style="display:flex;margin:  20px 0">
            <span style="margin-right: 10px;">小程序业务域名校验文件</span>
            <el-upload
              action="/"
              ref="upload"
              accept=".txt"
              :before-upload="beforeUpload"
              :disabled="this.fileList.length !== 0"
              :default-file-list="this.fileList"
            >
              <el-button size="small" type="primary" :disabled="this.fileList.length !== 0">上传文件</el-button>
            </el-upload>
          </div>
        </div>
      </div>
    </el-card>-->
    <!-- ----------------------------------证书上传------------------------------------------------------- -->
    <el-card v-if="criteria==8" class="box-card">
      <el-form ref="form" :model="clientcertForml" label-width="80px">
        <el-form-item label="appid">
          <el-input v-model="clientcertForml.appid"></el-input>
        </el-form-item>
        <el-form-item label="密钥">
          <el-input v-model="clientcertForml.payKey"></el-input>
        </el-form-item>

        <el-form-item label="mchid">
          <el-input v-model="clientcertForml.mchid"></el-input>
        </el-form-item>
        <el-form-item label="miniappid">
          <el-input v-model="clientcertForml.miniappid"></el-input>
        </el-form-item>

        <el-form-item label="secret">
          <el-input v-model="clientcertForml.secret"></el-input>
        </el-form-item>
        <el-form-item label="publicappid">
          <el-input v-model="clientcertForml.publicappid"></el-input>
        </el-form-item>
        <el-form-item label="grantType">
          <el-input v-model="clientcertForml.grantType"></el-input>
        </el-form-item>
        <el-form-item label="证书">
           <el-upload
              ref="doctypeCrfile"
              :data="clientcertForml"
              name="uploadFile"
              :auto-upload="false"
              action="/api/api/cart/PayBoss/payment"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="9999"
              :on-exceed="handleExceed"
              :on-success="handleSuccess"
            >
              <el-button size="mini" type="primary">上传证书</el-button>
            </el-upload>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>

        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

// import api from '@/service/store.js'
import edito from '@/components/edito.vue'
export default {
  components: { edito },
  name: '',
  data () {
    return {
      value1: '',
      dialogVisible: false,
      radiobutton: '1',
      radio: '1',
      radio2: '1',
      clientcertForml: {
        apiclientCert: '', // 证书

        mchid: '',
        miniappid: '',
        payKey: '', // 密钥
        appid: '',
        bossId: '2',
        id: '29',
        lastModifier: '29',
        userId: '1033',
        grantType: '',
        secret: '',
        publicappid: ''
        // uploadFile: ''
      },
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      fileList: [],
      input: '',
      numberValidateForm: {
        age: ''
      },
      checked: true,
      criteria: 1, // 判断显示那个表格
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created () {},
  methods: {
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

    onSubmit () {
      var vm = this
      vm.$refs.doctypeCrfile.submit()
      // api.payment(this.clientcertForml, (res) => {
      //   console.log(res)
      // })
    },
    Tabs (e) {
      this.criteria = e
    },
    // ----------------------------------上传文件--------------------------------------
    beforeUpload (file) {
      this.fileList = [file]
      console.log('选择了文件beforeUpload')
      // 读取数据
      this.read(file)
      return false
    },
    read (f) {
      const rd = new FileReader()
      rd.onload = e => {
        // this.readAsArrayBuffer函数内，会回调this.onload函数。在这里处理结果
        const cont = rd.reading({ encode: 'GBK' })
        console.log(cont)
        const formerData = this.textData
        this.textData = formerData + '\n' + cont
      }
      rd.readAsBinaryString(f)
    }
    // ----------------------------------------------------------------------------------------
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
</style>
