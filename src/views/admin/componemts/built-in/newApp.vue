<template>
  <!-- 新建APP -->
  <div class="window-new-app">
    <div class="item">
      <div class="title">应用类型</div>
      <div class="input">
        <select v-model="type">
          <option value="html">网页链接</option>
          <option value="vue">VUE组件</option>
        </select>
      </div>
    </div>
    <div class="item">
      <div class="title">应用名称</div>
      <div class="input">
        <input
          type="text"
          v-model="name"
          :disabled="type!='html'"
          :placeholder="type=='html'?'输入应用名称':'该类型应用需要技术工程师添加'"
        />
      </div>
    </div>
    <div class="item">
      <div class="title">
        <select v-model="isImg">
          <option value="img">图片链接</option>
          <option value="icon">icon图标</option>
        </select>
      </div>
      <div class="input">
        <div class="icon" v-if="isImg=='icon'">
          <span class="iconfont" v-html="icon" @click="showIcomList" />
          <div class="click" @click="showIcomList">
            <span v-text="'选择图标'"></span>
            <span class="iconfont">&#xe71a;</span>
          </div>
          <my-icon v-show="isShowIconList" :onIcon="onIcon" />
        </div>
        <div class="img" v-else-if="isImg=='img'">
          <input
            type="text"
            v-model="img"
            :disabled="type!='html'"
            :placeholder="type!='html'?'该类型应用需要技术工程师添加':'请输入网络图片地址'"
          />
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">应用地址</div>
      <div class="input">
        <input
          type="text"
          v-model="content"
          :disabled="type!='html'"
          :placeholder="type=='html'?'请输入要添加的完整地址 ! 例如: https://www.baidu.com':'该类型应用需要技术工程师添加'"
        />
      </div>
    </div>
    <div class="item">
      <div class="title">桌面显示</div>
      <div class="input">
        <my-on-off :toOnOff="onShow" :isOnOff="isShow" />
      </div>
    </div>
    <div class="item">
      <div class="title">是否可删除</div>
      <div class="input">
        <my-on-off :toOnOff="onIsDel" :isOnOff="isDel" />
      </div>
    </div>
    <div class="btns">
      <button class="btn" :class="themeColor" @click="yes" :disabled="isAjax">
        <div class="loading-box" v-if="isAjax">
          <span class="iconfont loading">&#xe6ab;</span>
        </div>
        <span class="text" v-else>确定</span>
      </button>
    </div>
  </div>
</template>

<script>
import myIcon from "./iconfontList.vue"; //icon图标选择
import myOnOff from "./onOff";
export default {
  components: { myIcon, myOnOff },
  props: {
    addNewAPP: Function, //添加APP
    themeColor: String
  },
  data() {
    return {
      isAjax: false,
      type: "html",
      name: "",
      isImg: "img",
      icon: "",
      isShowIconList: false,
      img: "",
      content: "",
      isShow: true,
      isDel: true
    };
  },
  methods: {
    // 是否在桌面显示
    onShow(isShow) {
      this.isShow = isShow;
    },
    //是否可删除快捷方式
    onIsDel(isDel) {
      this.isDel = isDel;
    },
    // 弹出icon图标列表
    showIcomList() {
      this.isShowIconList = !this.isShowIconList;
    },
    // 选择icon图标
    onIcon(icon) {
      this.icon = icon;
      this.isShowIconList = false;
    },
    yes() {
      if (this.type != "html") {
        this.myApp.alert({
          title: "提示",
          content: "只能添加HTML应用"
        });
        return;
      } else if (!this.name) {
        this.myApp.alert({
          title: "提示",
          content: "应用名称不能为空"
        });
        return;
      } else if (!this.img && !this.icon) {
        this.myApp.alert({
          title: "提示",
          content: "应用图标不能为空"
        });
        return;
      } else if (!/^https?:\/\/\w+\.\w+/i.test(this.content)) {
        this.myApp.alert({
          title: "提示",
          content: "应用网址格式错误"
        });
        return;
      }
      let option = {
        name: this.name,
        content: this.content,
        type: this.type,
        isShow: this.isShow,
        isDel: this.isDel
      };
      if (this.isImg == "icon") {
        option.icon = this.icon;
      } else if (this.isImg == "img") {
        option.img = this.img;
      }
      if (this.isAjax) {
        return;
      }
      this.isAjax = true;
      this.addNewAPP(option, () => {
        this.isAjax = false;
        this.myApp.alert({
          title: "提示",
          content: "添加完成"
        });
        this.type = "html";
        this.name = "";
        this.isImg = "img";
        this.img = "";
        this.content = "";
        this.isShow = 1;
        this.isDel = true;
      });
    }
  }
};
</script>
