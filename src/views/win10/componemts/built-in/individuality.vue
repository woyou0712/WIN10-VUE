<template>
  <!-- 个性化 -->
  <div class="window-indiv">
    <div class="indiv-left">
      <div class="indiv-title">个性化</div>
      <div class="item set-bg" @click="xz=0">
        <span class="iconfont">&#xe61e;</span>
        <span class="text">背景</span>
      </div>
      <div class="item set-theme" @click="xz=1">
        <span class="iconfont">&#xe63d;</span>
        <span class="text">主题</span>
      </div>
    </div>
    <div class="indiv-right">
      <div class="item">
        <div class="title" v-text="xz==0?'背景':xz==1?'主题':''"></div>
        <div class="preview">
          <img :src="bgList[bgIndex]" class="bg" />
          <div class="ex-app">
            <div class="ex-app-title" :class="themeColors[themeIndex]">标题</div>
          </div>
          <div class="ex-nav" :class="themeColors[themeIndex]">
            <span class="ex-nav iconfont">&#xeba2;</span>
          </div>
        </div>
        <div class="text" v-text="xz==0?'选择背景':xz==1?'选择主题':''"></div>
        <div class="images" v-if="xz==0">
          <div
            class="item"
            v-for="(item,i) in bgList"
            :key="i"
            @click="upBg(i)"
            :class="bgIndex==i?'xz':''"
          >
            <img class="img" :src="item" />
          </div>
        </div>
        <div class="themes" v-else-if="xz==1">
          <div
            class="item"
            v-for="(item,i) in themeColors"
            :key="i"
            @click="upThemes(i)"
            :class="themeIndex==i?'xz':''"
          >
            <div class="color" :class="themeColors[i]">A</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgList: Array, //背景列表
    bgIndex: Number,
    onbg: Function, //更换背景
    themeColors: Array, //主题列表
    themeIndex: Number,
    ontheme: Function //更换主题
  },
  data() {
    return {
      xz: 0
    };
  },
  methods: {
    upBg(i) {
      this.bgIndex = i;
      this.onbg(i);
    },
    upThemes(i) {
      this.themeIndex = i;
      this.ontheme(i);
    }
  }
};
</script>
