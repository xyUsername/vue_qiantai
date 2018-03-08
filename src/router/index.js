import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/account/login/Login'
import shop from '../components/shop/Shop'
import detail from '../components/shop/goods/Detail'
import list from '../components/shop/goods/List'
import complete from '../components/shop/order/Complete'
import pay from '../components/shop/order/Pay'
import site from '../components/shop/order/Site'
import shopcart from '../components/shop/shopcart/Shopcart'
import header from '../components/shop/subcom/Header'

let goods = [
  { name: 'detail', path: 'goods/detail/:id', component: detail },
  { name: 'list', path: 'goods/list', component: list }
]
let order =[
  { name: 'complete', path: 'order/complete', component: complete },
  { name: 'pay', path: 'order/pay/:id', component: pay },
  { name: 'site', path: 'order/site/:ids', component: site },
]
let Shopcart=[
  { name: 'shopcart', path: 'shopcart', component: shopcart }
]

Vue.use(Router)

 let router = new Router({
  //去除地址栏里的#/
  mode:'history',
  routes: [
    { name: 'login', path: '/login', component: login },
    { name: 'mode', path: '*', redirect: login },
    { name: 'mode1', path: '/', component: login },
    { name: 'shop', path: '/shop', component: shop, children: [ ...goods, ...order, ...Shopcart]}
  ]
})
// 路由守卫 router的实例对象的一个方法;
router.beforeEach((to, from, next) => {
  //to表示要去到的页面,from表示从哪个页面开始的,next表示接下来的做法;
  //在vue原型上已经配置了$http和$api对象了;因为是js文件,不是组件,所以这里的this找不到;
  Vue.prototype.$http.get(Vue.prototype.$api.isLogin).then(res => {
    let islogin = false;
    //已登录
    if (res.data.code == "logined") {
      islogin = true;
    }
    //如果请求的是登录页面;
    if (to.name == "login") {
      if (islogin) {
        next({ name: 'list' })
      } else {
        next();
      }
    }
    //如果请求的是其他页面,
    if (to.name != "login") {
      if (islogin) {
        next();
      } else {
        next({ name: 'login', query: { next: to.fullPath } });
      }
    }
  })
})
export default router