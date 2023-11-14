<template>
  <div class="App">
    <!-- 父子组件传值案例 -->
      我是根组件
      <!-- 头部组件 -->
      <!-- a1.给组件标签，添加属性的方式，传值 -->
      <!-- b2.父组件监听事件 -->
      <HmHeader :title="myTitle" @changeTitle="changeFn"></HmHeader>
      <!-- 主题组件 -->
      <HmMain></HmMain>
  </div>
</template>

<script>
import HmHeader from './components/HmHeader.vue'
import HmMain from './components/HmMain.vue'

export default {
  data() {
    return {
      myTitle: '菜鸟程序员'
    }
  },
  components: {
    HmHeader,
    HmMain,
  },
  methods: {
    // b3.提供处理函数，形参中获取参数
    changeFn(newTitle) {
      this.myTitle = newTitle
    }
  },
}
</script>

<style>
.App {
  width: 400px;
  height: 600px;
  background-color: skyblue;
  margin: 50px 50px;
  overflow: hidden;
}
</style>