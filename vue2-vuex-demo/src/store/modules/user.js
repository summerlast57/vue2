const state = {
  userInfo: {
    name: 'lisi',
    age: 18
  },
  score: 80
}
const mutations = {
  setUser (state, newUser) {
    state.userInfo = newUser
  }
}
const actions = {
  setUserSecond (context, newUser) {
    // 将异步在action中封装
    setTimeout(() => {
      // 调用mutation context上下文 默认提交的就是自己模块的mutation和action
      context.commit('setUser', newUser)
    }, 1000)
  }
}
const getters = {
  // 分模块后，state指的是子模块的state
  UpperCaseName (state) {
    return state.userInfo.name.toUpperCase()
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
