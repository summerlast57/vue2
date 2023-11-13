<template>
  <div class="App">
    <!-- 头部组件 -->
    <HmHeader></HmHeader>
    <!-- 主题组件 -->
    <HmMain></HmMain>
  </div>
</template>

<script>
import HmHeader from './components/HmHeader.vue'
import HmMain from './components/HmMain.vue'
export default {
  components: {
    HmHeader: HmHeader,
    HmMain:HmMain
  }
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