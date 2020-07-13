// 配置一个符合项目需要的axios  导出去进行全局的配置
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 2. 请求头 token
axios.defaults.headers.token = store.getUser().token

// 修改配置  加token
// 请求拦截器（在每一次请求前）
axios.interceptors.request.use((config) => {
  // 修改配置  加token
  const token = store.getUser().token
  if (token) {
    config.headers.token = token // 将token放到请求头发送给服务器
    return config
  }
}, (err) => Promise.reject(err))

// 响应拦截器(每一次响应后)
// res => { return res } ==== res => res
axios.interceptors.response.use((res) => res, (err) => {
  console.log('响应拦截器', err)

  // 自己逻辑
  // 1. 获取状态码
  // const status = err.response.status
  // 2. 判断401
  // eslint-disable-next-line no-magic-numbers
  if (status === 401) {
    // 3. 清除无效token
    store.delUser()
    // 4. 跳转登录
    router.push('/login')
  }
  // eslint-disable-next-line no-magic-numbers
  if (status === 403) {
    // this.$message({
    //   message: '警告哦，这是一条警告消息',
    //   type: 'warning',
    // });
    // 4. 跳转登录
    router.push('/set')
  }
  return Promise.reject(err)
})

export default axios
