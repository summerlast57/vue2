<template>
  <div class="box">
    <h2>Son1 子组件</h2>
    从vuex中获取的值: <label>{{ count }}</label>
    <br>
    <button @click='handleAdd(1)'>值 + 1</button>
    <button @click='handleAdd(5)'>值 + 5</button>
    <button @click='handleAdd(10)'>值 + 10</button>
    <button @click="changeCount">一秒后变为666</button>
    <button @click='changeFn'>改标题</button>

    <hr>
    <!-- 计算属性getters -->
    <div>{{ $store.state.list }}</div>
    <div>{{ $store.getters.filterList }}</div>

    <hr>
    <!-- 测试访问模块中的state--原生 -->
    <div>{{ $store.state.user.userInfo.name }}</div>
    <button @click="UpdateUser">更新用户信息</button>
    <button @click="UpdateUser2">一秒后更新用户信息</button>
    <div>{{ $store.state.setting.theme }}</div>
    <button @click="UpdateTheme">更新主题</button>

    <hr>
    <!-- 测试访问模块中的getters--原生 -->
    <div>{{ $store.getters['user/UpperCaseName'] }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Son1Com',
  created () {
    // 验证仓库是否创建好
    // console.log(this.$store)
    // 组件逻辑中 访问store中数据
    // console.log(this.$store.state.count)
  },
  computed: {
    ...mapState(['title', 'count'])
  },
  methods: {
    // 组件调用提交mutations
    handleAdd (n) {
      // 不传参时提交调用
      // this.$store.commit('addCount')
      // 提交调用
      this.$store.commit('addCount', n)
    },
    changeFn () {
      this.$store.commit('changeTitle', '夏末')
    },
    changeCount () {
      // 调用action
      // this.$store.dispatch('action名字', 额外参数)
      this.$store.dispatch('changeCountAction', 666)
    },
    // 调用子模块mutations
    UpdateUser () {
      // this.$store.commit('模块名/mutation名', 额外传参）
      this.$store.commit('user/setUser', {
        name: 'zhangsan',
        age: 24
      })
    },
    // 调用子模块actions dispatch
    UpdateUser2 () {
      this.$store.dispatch('user/setUserSecond', {
        name: 'diba',
        age: 10
      })
    },
    UpdateTheme () {
      this.$store.commit('setting/setTheme', '仙侠')
    }
  }
}
</script>

<style lang="css" scoped>
.box {
  border: 3px solid #ccc;
  width: 400px;
  padding: 10px;
  margin: 20px;
}

h2 {
  margin-top: 10px;
}
</style>
