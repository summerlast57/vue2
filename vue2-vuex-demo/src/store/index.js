// 这里面存放的就是vuex相关的核心代码
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import setting from './modules/setting'

// 插件安装
Vue.use(Vuex)

// 创建仓库(空仓库)
const store = new Vuex.Store({
  // 严格模式（有利于初学者，检测不规范的代码 =>上线时需要关闭）
  strice: true,
  // 通过state可以提供数据（所有组件共享的数据）
  state: {
    title: '大标题',
    count: 101,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  // 通过mutations可以提供修改数据的方法
  mutations: {
    // 所有mutations函数，第一个参数，都是state
    // 注意点：mutations参数有且只有一个，如果需要多个参数，包装成对象
    addCount (state, n) {
      state.count += n
    },
    subCount (state, n) {
      state.count -= n
    },
    changeCount (state, newCount) {
      state.count = newCount
    },
    changeTitle (state, newTitle) {
      state.title = newTitle
    }
  },
  actions: {
    // context 上下文 (此处未分模块，可以当成store仓库)
    // context.commit('mutations名字', 额外参数)
    changeCountAction (context, newCount) {
      setTimeout(() => {
        context.commit('changeCount', newCount)
      }, 1000)
    }
  },
  // getters类似于计算属性
  getters: {
    // 注意点：1.getters函数中的第一个参数是state
    // 2.getters函数必须有返回值
    filterList (state) {
      return state.list.filter(item => item > 5)
    }
  },
  modules: {
    user,
    setting
  }
})
// 导出给main.js使用
export default store
