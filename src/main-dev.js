import Vue from 'vue'
import App from './App.vue'
// import './plugins/element.js'
import axios from 'axios'
import store from './store'
// import 'element-ui/lib/theme-chalk/index.css'
// 设置axios的基地址
axios.defaults.baseURL = 'https://autumnfish.cn'
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
