// 文件核心作用：导入App.vue，基于App.vue创建结构渲染index.html
// 1.导入Vue核心包
import Vue from 'vue'

// 2.导入App.vue 根组件
import App from './App.vue'

// 导入全局组件
import HmButton from './components/HmButton'

// 全局注册
Vue.component('HmButton',HmButton)

// 提示当前处于什么环境（生产环境/开发环境）
Vue.config.productionTip = false

// 3.Vue实例化，提供render方法→基于App.vue创建结构渲染index.html
new Vue({
  // el:"#app",作用：和$mount('选择器')作用一致，用于指定Vue所管理容器
  render: h => h(App),
  // render:(createElement)=>{
  //   // 基于App创建元素结构
  //   return createElement(App)
  // }
}).$mount('#app')
