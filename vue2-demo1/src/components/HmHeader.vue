<template>
  <div class="hm-header">
    <!-- a3.渲染使用 -->
    我是头部组件 {{ title }}
    <button @click="handleClick">修改title</button>
    <Hm-Button></Hm-Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  //a2.通过props接收
  props:['title'],
  methods: {
    handleClick(){
      // b1.$emit触发事件，给父组件发送消息通知
      this.$emit('changeTitle','新东方')
    }
  },
}
</script>

<style>
.hm-header {
  width: 300px;
  height: 100px;
  background-color: pink;
  margin: 20px auto;
}
</style>
