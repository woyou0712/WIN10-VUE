<template>
  <div class="window-login">
    <div class="bg">
      <img :src="bg" class="img" />
    </div>
    <div class="load-data" v-if="loadData">
      <div class="icon-box">
        <span class="iconfont">&#xe6ab;</span>
      </div>
      <div class="load-text">登陆成功! 正在加载个人配置, 请稍后!</div>
    </div>
    <div class="forms" @keypress="onKey" v-else>
      <div class="portrait">
        <img class="img" :src="portrait" />
      </div>
      <div class="ipt-item user-name">
        <input type="text" v-model="uname" placeholder="用户名" />
      </div>
      <div class="ipt-item user-pwd">
        <input type="password" v-model="upwd" placeholder="密码" />
        <span class="iconfont" @click="onLogin">&#xe71a;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { login: Function },
  data() {
    return {
      bg: require("../../images/bg_02.jpg"),
      portrait: require("../../images/user_portrait.png"), //假设本地有缓存的头像
      uname: "admin", //假设本地有缓存的用户名
      upwd: "123456",
      loadData: false
    };
  },
  methods: {
    onKey(e) {
      if (e.key != "Enter") {
        return;
      }
      this.onLogin();
    },
    onLogin() {
      this.login(this.uname, this.upwd, () => {
        this.loadData = true;
      });
    }
  }
};
</script>

