import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import Tinymce from 'tinymce'

import './assets/skins/ui/oxide/skin.css'
import './assets/font/iconfont.css'
import './style/index.css'

Vue.config.productionTip = false
Vue.prototype.$tinymce = Tinymce
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
