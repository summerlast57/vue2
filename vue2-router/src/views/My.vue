<template>
  <div>
    <p>我的音乐</p>
    <p>我的音乐</p>
    <p>我的音乐</p>
    <p>我的音乐</p>
    <h2>查询参数传参</h2>
    <div>
      <p>传过来的值：{{ $route.query.key }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyMusic',
  created() {
    // 在created中，获取路由参数
    // this.$route.query.参数名 获取参数传参
    console.log(this.$route.query.key);

  }
}
</script>

<style></style>