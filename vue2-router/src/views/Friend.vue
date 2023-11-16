<template>
  <div>
    <p>我的朋友</p>
    <p>我的朋友</p>
    <p>我的朋友</p>
    <p>我的朋友</p>
    <h2>动态路由传参</h2>
    <div>
      <p>传过来的值：{{ $route.params.words }}</p>
    </div>
    <h2>路由跳转传参</h2>
    <div>
      <p>搜索关键字：{{ $route.params.words }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyFriend',
  created() {
    // this.$route.params.参数名 获取动态路由传参
    console.log(this.$route.params.words);

  }
}
</script>

<style></style>