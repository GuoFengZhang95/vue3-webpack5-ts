import router from './router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getLoginStatus } from '@/api/index'
const noNeedLoginRoutes = ['Login', 'Password', 'LoginBind', 'Page403', 'Page404']
NProgress.configure({ showSpinner: false })
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // console.log(to)
  if (noNeedLoginRoutes.includes(to.name as string)) {
    next()
  } else {
    const loginRes = await getLoginStatus()
    if (loginRes.success) {
      next()
    } else {
      router.push({ name: 'Login' })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
