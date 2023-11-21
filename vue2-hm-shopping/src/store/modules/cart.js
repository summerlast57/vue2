import { changeCount, delSelect, getCartList } from '@/api/cart'
import { Toast } from 'vant'

export default ({
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 设置一个提供cartList的mutation
    setCartList (state, newList) {
      state.cartList = newList
    },
    // 让对应的id的选项 的选中状态取反
    toggleCheck (state, goodsId) {
      const good = state.cartList.find(item => item.goods_id === goodsId)
      good.isChecked = !good.isChecked
    },
    // 让所有的小选框,同步设置
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    // 更新购物车商品数量
    changeCount (state, { goodsId, value }) {
      const obj = state.cartList.find(item => item.goods_id === goodsId)
      obj.goods_num = value
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 后台返回的数据里面没有复选框选中状态,为了实现将来的功能
      // 需要手动维护数据,给每一项,添加一个isChecked状态(标记当前商品是否选中)
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsId, value, skuId } = obj
      context.commit('changeCount', {
        goodsId,
        value
      })
      await changeCount(goodsId, value, skuId)
    },
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delSelect(cartIds)
      Toast('删除成功')
      // 重新拉取最新的购物车数量
      context.dispatch('getCartAction')
    }
  },
  getters: {
    // 求所有的商品累加总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的商品总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    // 是否全选中
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
})
