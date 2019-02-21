import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import MovieDetail from '../pages/movieDetail.vue'
import NewDetail from '../pages/newDetail.vue'
import MovieList from '../pages/moviesList.vue'
import LoginPage from '../pages/loginPage.vue'
import UserInfo from '../pages/userInfo.vue'
import RegisterPage from '../pages/registerPage.vue'
import FindPasswordPage from '../pages/findPasswordPage.vue'
import SendEmail from '../pages/sendEmail.vue'
import AdminPage from '../pages/adminPage.vue'
// import Home from '../pages/index'
Vue.use(Router)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
const routes = [
  {
    path: '/',
    component: resolve => require(['../pages/index'], resolve),
    meta: {
      title: 'home'
    }
  },
  {
    path: '/movieDetail',
    component: MovieDetail
  },
  {
    path: '/newDetail',
    component: NewDetail
  },
  {
    path: '/movieList',
    component: MovieList
  },
  {
    path: '/loginPage',
    component: LoginPage
  },
  {
    path: '/userInfo',
    component: UserInfo
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/findPassword',
    component: FindPasswordPage
  },
  {
    path: '/sendEmail',
    component: SendEmail
  },
  {
    path: '/admin',
    component: AdminPage,
    beforeEnter: (to, from, next) => {
      // ...
      let isAdmin = localStorage.getItem('userAdmin')
      console.log(isAdmin)
      if (isAdmin == null || isAdmin === 0) {
        alert('Access Denied')
        router.push({path: '/'})
      } else {
        next()
      }
    }

  }
]
const router = new Router({
  routes,
  // base: '/www/wwwroot/v.cumt-cs.cn/',
  mode: 'history'
})
// router.beforeEach((to, from, next) => {
//
// })
export default router
