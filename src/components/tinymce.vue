<template>
    <div class="tinymceDiv">
        <textarea :id="id"></textarea>
    </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
// 这下面是tinymce的插件
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons'
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/code'// 显示源代码插件
import 'tinymce/plugins/advlist' // 这几条引入是因为我的导入不了，不知道为啥
import 'tinymce/plugins/link'
import '@/assets/tinymce/plugins/lineheight'
import '@/assets/tinymce/plugins/indent2em'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/contextmenu'

// 这里写你自己存放语言包的路径
import '@/assets/langs/zh_CN.js'
export default {
  name: '',
  props: {
    id: String,
    tinyVal: String // 内容绑定
  },
  data () {
    return {
      init: {
        selector: '#' + this.id,
        language: 'zh_CN',
        skin_url: '/assets/skins/ui/oxide',
        // 插件-实现插入图片等功能
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu indent2em lineheight nonbreaking',
        // 工具栏-根据自己需要增减功能
        toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | indent2em lineheight nonbreaking | undo redo | image code | removeformat ',
        branding: false,
        menubar: false, // 顶部菜单栏显示
        min_height: 300, // 高度
        statusbar: false,
        images_upload_url: '/api/api/dichan/company/fileUpLoad',
        images_upload_base_path: '/data'
      }
    }
  },
  methods: {
    /** 外部调用该方法，可以拿到绑定数据 */
    release () {
      // content 是文本内容带标签
      const content = tinymce.get(this.id).getContent()
      // getContent( { 'format' : 'text'} );//这是获取里面的文本文件，不带标签
      return content
    },
    /** 外部调用该方法，可以修改绑定数据 */
    setData (data) {
      tinymce.get(this.id).getContent(data)
    } // 数据回填
  },
  mounted () {
    // 配置的初始化
    tinymce.init(this.init)
  },
  beforeDestroy () {
    // 销毁
    tinymce.get(this.id).destroy()
  },
  watch: {
    tinyVal (val) {
      tinymce.get(this.id).setContent(val)// 动态设置内容
    }
  }
}
</script>
<style>
  .tinymceDiv{
      width:100%;
      height:100%;
  }
</style>
