<template>
  <div>
    <p>发现音乐</p>
    <p>发现音乐</p>
    <p>发现音乐</p>
    <p>发现音乐</p>
    <h2>查询参数传参</h2>
    <div>
      <p>搜索：</p>
      <router-link to="/My?key=我的音乐">我的音乐</router-link>
    </div>
    <h2>动态路由传参</h2>
    <div>
      <p>搜索：</p>
      <router-link to="/friend/我的朋友">我的朋友</router-link>
    </div>
    <h2>编程式导航</h2>
    <div>
      <input v-model="inpValue" type="text">
      <button @click="goFriend">搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FindMusic',
  data(){
    return {
      inpValue:''
    }
  },
  methods: {
    goFriend(){
      // 1.path路径跳转及传参 【简写】
      // this.$router.push(`/friend?key=${this.inpValue}`)

      // path路径跳转及传参 【完整写法】
      // this.$router.push({
      //   path:'/friend',
      //   query:{
      //     key:this.inpValue,
      //     key2:this.inpValue
      //   }
      // })

      // path路径跳转及动态路由传参
      // this.$router.push({
      //   path:`/friend/${this.inpValue}`,
      // })

      //2. name命名路由跳转及query传参,适合长路径
      // this.$router.push({
      //   name:'friend',
      //   query:{
      //     key:this.inpValue
      //   }
      // })

      // name命名路由跳转及动态路由传参
      this.$router.push({
        name:'friend',
        params:{
          words:this.inpValue
        }
      })
    }
  },
}
</script>

<style></style>