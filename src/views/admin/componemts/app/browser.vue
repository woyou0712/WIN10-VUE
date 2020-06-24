<template>
  <!-- 浏览器 -->
  <div class="window-browser">
    <div class="browser-top">
      <div class="ipt">
        <input type="text" v-model="url" @keydown="enter" />
      </div>
    </div>
    <div class="iframe">
      <iframe :src="htmlLocalhost" frameborder="0" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "www.baidu.com",
      htmlLocalhost: "http://www.baidu.com"
    };
  },
  methods: {
    enter(e) {
      if (e.key != "Enter") {
        return;
      }
      if (/^https?:\/\//.test(this.url)) {
        this.htmlLocalhost = this.url;
      } else {
        this.htmlLocalhost = "http://" + this.url;
      }
    }
  }
};
</script>
