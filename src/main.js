// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './utils/service'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "babel-polyfill"

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' });

Vue.prototype.axios = axios;


router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('admin');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    role === 'admin' ? next() : next('/403');
  } else {
 
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
