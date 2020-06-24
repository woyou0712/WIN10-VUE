<template>
  <!-- 设置 -->
  <div class="window-setup">
    <div class="setup-left">
      <div class="setup-title">应用</div>
      <div class="item" v-for="(item,i) in windowsApp" :key="i" @click="index=i" :class>
        <span class="iconfont" v-if="item.icon" v-html="item.icon"></span>
        <div class="img" v-else>
          <img :src="item.img" />
        </div>
        <span v-text="item.name"></span>
      </div>
    </div>
    <div class="setup-right">
      <div class="app-item">
        <div class="title">应用名称</div>
        <div class="input">
          <input
            type="text"
            v-model="app.name"
            :placeholder="app.type=='html'?'输入应用名称':'该类型应用需要技术工程师添加'"
          />
        </div>
      </div>
      <div class="app-item">
        <div class="title">应用类型</div>
        <div class="input">
          <span v-text="app.type"></span>
        </div>
      </div>
      <div class="app-item">
        <div class="title">应用图标</div>
        <div class="input">
          <div class="image-box">
            <span class="iconfont" v-if="app.icon" v-html="app.icon" @click="showIcomList" />
            <img :src="app.img" class="img" v-else-if="app.img" />
          </div>
          <div class="clicks">
            <input type="text" v-model="app.img" placeholder="请输入网络图片地址" />
            <div class="click" @click="showIcomList">
              <span v-text="'点击选择本地图标'"></span>
              <span class="iconfont">&#xe71a;</span>
            </div>
            <my-icon v-show="isShowIconList" :onIcon="onIcon" />
          </div>
        </div>
      </div>
      <div class="app-item">
        <div class="title">应用地址</div>
        <div class="input" v-if="app.type=='html'">
          <input
            type="text"
            v-model="app.content"
            :placeholder="app.type=='html'?'请输入要添加的完整地址 ! 例如: https://www.baidu.com':'该类型应用需要技术工程师添加'"
          />
        </div>
        <div class="input" v-else-if="app.type=='vue'">
          <span>本地vue组件</span>
        </div>
      </div>
      <div class="app-item">
        <div class="title">桌面显示</div>
        <div class="input">
          <my-on-off :toOnOff="onShow" :isOnOff="app.isShow" />
        </div>
      </div>
      <div class="app-item">
        <div class="title">是否可从桌面删除</div>
        <div class="input">
          <my-on-off :toOnOff="onDel" :isOnOff="app.isDel" />
        </div>
      </div>
      <div class="app-btns">
        <button class="btn yes theme-d" @click="setWinApp(app)">保存修改</button>
        <button class="btn del theme-g" @click="delWinApp(app)">卸载应用</button>
      </div>
    </div>
  </div>
</template>

<script>
import myOnOff from "./onOff.vue";
import myIcon from "./iconfontList.vue";
export default {
  components: { myOnOff, myIcon },
  props: {
    windowsApp: Array, //所有应用列表
    setWinApp: Function, //保存设置到服务器
    delWinApp: Function //从系统中删除该应用
  },
  data() {
    return {
      index: 0, //当前是APP的下标
      isShowIconList: false //是否打开图标列表
    };
  },
  computed: {
    app() {
      return this.windowsApp[this.index];
    }
  },
  methods: {
    // 监听是否显示
    onShow(isShow) {
      this.app.isShow = isShow;
    },
    // 监听是否可删除
    onDel(isDel) {
      this.app.isDel = isDel;
    },
    // 弹出icon图标列表
    showIcomList() {
      this.isShowIconList = !this.isShowIconList;
    },
    // 选择icon图标
    onIcon(icon) {
      this.app.icon = icon;
      this.isShowIconList = false;
    }
  }
};
</script>