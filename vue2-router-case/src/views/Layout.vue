<template>
  <div class="h5-wrapper">
    <div class="content">
      <router-view></router-view>
    </div>
    <nav class="tabbar">
      <!-- 导航高亮
          1.将a标签替换为router-link标签（to）
          2. 结合高亮类名实现高亮效果（router-link-active 模糊匹配）-->
      <router-link to="/article">面经</router-link>
      <router-link to="/collect">收藏</router-link>
      <router-link to="/like">喜欢</router-link>
      <router-link to="/user">我的</router-link>
    </nav>
  </div>
</template>

<script>

export default {
  // 组件名，如果没有配置name才会找文件名作为组件名
  name: "LayoutPage",
  // 组件缓存了，就不会执行created，mounted，destroyed钩子函数了
  // 所以提供了activated 和deavtived
  created() {
    console.log('created组件被加载了');
  },
  mounted() {
    console.log('mpunted dom渲染完了');
  },
  destroyed() {
    console.log('destroyed组件被销毁了');
  },
  activated() {
    console.log('activated 组件被激活了，看到页面');
  },
  deactivated() {
    console.log('deactivated 组件失活，离开页面了');
  },
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
<style lang="less" scoped>
.h5-wrapper {
  .content {
    margin-bottom: 51px;
  }
  .tabbar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: flex;
    background: #fff;
    border-top: 1px solid #e4e4e4;
    a {
      flex: 1;
      text-decoration: none;
      font-size: 14px;
      color: #333;
      -webkit-tap-highlight-color: transparent;
    }
    a.router-link-active{
      color:orange
    }
  }
}
</style>