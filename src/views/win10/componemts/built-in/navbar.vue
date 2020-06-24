<template>
  <!-- 下方导航栏 -->
  <div class="window-nav" :class="themeColor">
    <div class="win-logo" title="开始" @click="onShowMemu">
      <span class="iconfont">&#xeba2;</span>
    </div>
    <div class="nav-app-list" @contextmenu.stop="windowRightHand($event,'navbar')">
      <div class="nav-app-item" v-for="(item,i) in appList" :key="i">
        <div class="btm-border" @click="unfold(item.id,i)" :class="priority==i?'priority':''">
          <span class="iconfont" v-if="item.icon" v-html="item.icon"></span>
          <img v-else :src="item.img" class="iconfont" />
        </div>
      </div>
    </div>
    <div class="nav-time-msg">
      <!-- 日期时间 -->
      <div class="nav-time">
        <p class="time-item" v-text="TimeMinute"></p>
        <p class="time-item" v-text="timeDay"></p>
      </div>
      <!-- 消息提示 -->
      <div class="nav-msg" @click="exMsg">
        <span class="iconfont" v-html="'&#xe69d;'"></span>
      </div>
    </div>
    <my-memu
      v-show="isShowMemu"
      :themeColor="themeColor"
      :onShowMemu="onShowMemu"
      :showSetUp="showSetUp"
      :showApp="showApp"
    />
  </div>
</template>

<script>
import myMemu from "./memu.vue";
export default {
  components: { myMemu },
  props: {
    themeColor: String, //主题
    windowRightHand: Function, //右键方法
    appList: Array, //打开的应用列表
    unfold: Function, //展开/置顶某个应用
    priority: Number, //当前置顶的应用下标
    isShowMemu: Boolean, //是否显示导航
    onShowMemu: Function, //控制导航栏显示/隐藏
    showSetUp: Function, //打开设置
    showApp: Function //打开一个APP窗口
  },
  data() {
    return {
      timeDay: "2020/6/20",
      TimeMinute: "17:43:21"
    };
  },
  created() {
    function onTime() {
      let time = new Date();
      this.timeDay = time.toLocaleDateString();
      this.TimeMinute = time.toTimeString().split(" ")[0];
    }
    onTime.call(this);
    setInterval(() => {
      onTime.call(this);
    }, 1000);
  },
  methods: {
    exMsg() {
      this.myApp.alert({
        title: "该组件请根据自身需求自主开发",
        content: "接口位置:/admin/components/built-in/navbar.vue"
      });
    }
  }
};
</script>
