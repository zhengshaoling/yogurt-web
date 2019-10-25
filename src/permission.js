import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration
// 白名单
const company_params = ''
const whiteList = [company_params+'/login', company_params+'/auth-redirect', company_params+'/dashboard/index', company_params+'/order/list']
router.beforeEach((to, from ,next) => {
  NProgress.start();
  next();
})
/*router.beforeEach((to, from, next) => {
  NProgress.start() // 开始进度条
  if (getToken()) { // 确定是否有令牌
    /!* has token*!/
    if (to.path === company_params+'/login') {
      next({ path: company_params+'/dashboard/index' })
      NProgress.done() // 如果当前页面是仪表板，则不会在每个钩子之后触发，因此请手动处理它
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const roles = res.vo.roles // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: company_params+'/dashboard/index' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    /!* has no token*!/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(company_params+'/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})*/
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
