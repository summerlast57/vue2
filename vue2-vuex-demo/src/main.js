import Vue from 'vue'
import App from './App.vue'
import store from '@/store/index.js'
// JS访问store中数据
// console.log(store.state.count)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
