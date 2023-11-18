<template>
  <div class="box">
    <h2>Son2 子组件</h2>
    从vuex中获取的值:<label>{{ count }}</label>
    <br />
    <button @click="subCount(1)">值 - 1</button>
    <button @click="subCount(5)">值 - 5</button>
    <button @click="subCount(10)">值 - 10</button>
    <button @click="changeCountAction(888)">一秒后变为888</button>
    <button @click="changeTitle('黑马程序员')">改标题</button>
    <hr>
    <div>{{ filterList }}</div>
    <hr>
    <!-- 测试访问模块中的state -->
    <div>{{ user.userInfo }}</div>
    <div>{{ setting.theme }}</div>
    <div>user模块的数据：{{ userInfo }}</div>
    <button @click="setUser({ name: 'wangwu', age: 20 })">更新用户信息</button>
    <button @click="setUserSecond({ name: 'langqun', age: 20 })">一秒后更新用户信息</button>
    <div>setting模块的数据：{{ theme }}-{{ color }}</div>
    <button @click="setTheme('玄幻')">更新主题</button>
    <hr>
    <!-- 访问模块中的getters -->
    <div>{{ UpperCaseName }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'Son2Com',
  computed: {
    ...mapState(['title', 'count', 'user', 'setting']),
    ...mapState('user', ['userInfo']),
    ...mapState('setting', ['theme', 'color']),
    ...mapGetters(['filterList']),
    ...mapGetters('user', ['UpperCaseName'])
  },
  methods: {
    // 全局级别的映射
    ...mapMutations(['subCount', 'changeTitle']),
    ...mapActions(['changeCountAction']),

    // 子模块级别的映射
    ...mapMutations('user', ['setUser']),
    ...mapMutations('setting', ['setTheme']),
    ...mapActions('user', ['setUserSecond'])
    // handleSub (n) {
    //   this.$store.commit('subCount', n)
    // }
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
