import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 用户权证信息
      userInfo: getInfo()
    }
  },
  mutations: {
    // 所有mutations中的第一个参数都是state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      // 清空个人信息
      context.commit('setUserInfo', {})
      // 清空购物车信息
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {

  }
}
