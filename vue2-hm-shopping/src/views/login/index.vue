<template>
  <div class="login">
    <!-- 头部导航栏 -->
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" alt="" @click="getPicCode">
        </div>
        <div class="form-item">
          <input v-model='msgCode' class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{ second === totalSecond ? '获取验证码' : second + '秒后重新发送' }}</button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
// import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 将来请求传递的图形验证码唯一标识
      picUrl: '', // 存储请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数，开定时器对second--
      timer: null, // 定时器 id
      mobile: '', // 用户输入的手机号
      msgCode: '' // 短信验证码
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64// 存储地址
      this.picKey = key// 存储唯一标识

      // Toast('图形刷新成功')// 导入调用（组件内或非组件）
      this.$toast.success('图形刷新成功') // 通过this直接调用（必须组件内）
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        // 如果没通过校验，没必要往下走了
        return
      }
      // 目前没有倒计时开着且secone与totalSecond一致才可以倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求
        // 预期：如果响应的status非200，最好抛出一个错误，await只会等待成功的Promise
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast.success('短信发送成功')

        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 校验手机号和验证码
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast.fail('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast.fail('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 校验登录
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^[0-9]{6}$/.test(this.msgCode)) {
        this.$toast.fail('请输入正确的短信验证码')
        return
      }

      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast.success('登录成功')

      // 判断地址栏是否有无回调地址
      // 如果有   => 说明是其他页面，拦截到登录来的，需要回调
      // 如果没有 =>正常去首页
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  },
  // 离开页面时销毁定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
