import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/loogin',
      name: 'loogin',
      component: (resolve) => require(['@/views/loogin/index.vue'], resolve)

    },

    {
      path: '/',
      component: (resolve) => require(['@/views/home/index.vue'], resolve),
      children: [
        {
          path: '/',
          name: 'management',
          component: (resolve) => require(['@/views/management/index.vue'], resolve)
        },
        {
          path: '/store',
          name: 'store',
          component: (resolve) => require(['@/views/store/index.vue'], resolve)
        },
        {
          path: '/web',
          name: 'web',
          component: (resolve) => require(['@/views/web/index.vue'], resolve)
        },
        {
          path: '/uni-app',
          name: 'uni-app',
          component: (resolve) => require(['@/views/uni-app/index.vue'], resolve)
        },
        {
          path: '/set',
          name: 'set',
          component: (resolve) => require(['@/views/set/index.vue'], resolve)
        },
        {
          path: '/news',
          name: 'news',
          component: (resolve) => require(['@/views/news/index.vue'], resolve)
        },
        {
          path: '/passwd',
          name: 'passwd',
          component: (resolve) => require(['@/views/home/passwd.vue'], resolve)
        }
      ]
    }
  ]
})

// 前置守卫
router.beforeEach((to, from, next) => {
  // // 1. 去的路径是登录的时候  放行
  // if (to.path === '/login') return next()
  // // 2. 不是登录的时候 且 并没有登录  拦截 登录页面
  // if (!store.getUser().token) return next('/login')
  // // 3. 其他情况 放行
  // next()
  console.log(to)

  console.log('路由', store.getUser())
  if (to.path !== '/loogin' && !store.getUser().token) {
    return next('/loogin')
  }
  next()
})
export default router
