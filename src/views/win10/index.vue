<template>
  <div
    class="window-admin"
    @contextmenu.stop="notRightHand"
    @click="windowClick"
    onselectstart="return false"
  >
    <div class="not-login" v-if="!isLogin">
      <my-login :login="login" />
    </div>
    <!-- 用户桌面 -->
    <div class="user-window" v-else>
      <div class="bg">
        <img class="img" :src="bg" alt />
      </div>
      <div class="windows" @contextmenu.stop="windowRightHand($event,'window')">
        <!-- 桌面图标列表 -->
        <div
          class="app-item"
          v-for="(item,i) in windowsApp"
          :key="i"
          @contextmenu.stop="windowRightHand($event,'app',item)"
          @dblclick="showApp(item)"
        >
          <div class="app-icon-item" v-if="item.isShow">
            <span v-if="item.icon" class="iconfont" v-html="item.icon"></span>
            <img v-else :src="item.img" class="iconfont" />
            <div class="name nowrap" v-text="item.name" :title="item.name"></div>
          </div>
        </div>
      </div>
      <!-- 底部导航 -->
      <my-navbar
        :themeColor="themeColor"
        :windowRightHand="windowRightHand"
        :appList="appList"
        :priority="priority"
        :unfold="unfold"
        :isShowMemu="isShowMemu"
        :onShowMemu="onShowMemu"
        :showSetUp="showSetUp"
        :showApp="showApp"
      />
      <!-- 右键菜单 -->
      <right-click-list
        :rightClickStyle="rightClickStyle"
        :rightClickData="rightClickData"
        :onRightList="onRightList"
      />
    </div>
  </div>
</template>
<script>
// 全局内置组件
import myLogin from "./componemts/built-in/login.vue"; //登陆组件
import rightClickList from "./componemts/built-in/rightClickList.vue"; //鼠标右键弹窗
import myNavbar from "./componemts/built-in/navbar.vue"; //桌面下方的导航
import individuality from "./componemts/built-in/individuality.vue"; //个性化
import setUp from "./componemts/built-in/setUp.vue"; //设置
import newApp from "./componemts/built-in/newApp.vue"; //新建(添加)应用

// 应用组件
import browser from "./componemts/app/browser.vue"; //浏览器

const $contextmenu = require("./js/contextmenu.js");
export default {
  components: { myLogin, rightClickList, myNavbar },
  data() {
    return {
      // 是否已经登陆
      isLogin: 0,

      // 数据配置
      bgList: [], // 背景图列表
      bgIndex: 0, // 当前显示的背景图下标
      themeColors: [], // 主题颜色列表
      themeIndex: 0, // 当前显示的主题颜色下标
      windowsApp: [], // 全部应用列表
      appList: [], // 打开的应用列表
      priority: null, // 展现在最前端的应用下标

      // 右键菜单style配置
      rightClickStyle: {},
      // 右键菜单内容
      rightClickDatas: {
        window: [
          { name: "新建", icon: "&#xe62f;" },
          { name: "个性化", icon: "&#xe63d;" },
          { name: "设置", icon: "&#xe654;" },
          { name: "进入全屏", icon: "&#xe6cc;" },
          { name: "退出全屏", icon: "&#xec13;" },
          { name: "关于", icon: "&#xe637;" }
        ],
        app: [
          { name: "打开", icon: "&#xe66a;" },
          { name: "删除", icon: "&#xe63a;" }
        ],
        navbar: [
          { name: "显示桌面", icon: "&#xe633;" },
          { name: "显示所有窗口", icon: "&#xe69f;" },
          { name: "关闭所有窗口", icon: "&#xe70d;" }
        ]
      },
      // 右键菜单的类型/window/app/navbar=>在桌面点击/在应用图标上点击/在底部导航栏点击
      rightClickIndex: "window",
      // 关于
      myIntro: {
        title: "vue-win10 1.0.0",
        content:
          "初次见面! 不喜勿喷! 本人菜鸟! 欢迎大神指点! 本项目使用的是VUE-4脚手架开发,无需任何外部UI组件支持, 拿来即用! 支持VUE组件弹窗和iframe弹窗!"
      },
      rightClickApp: null, //当前使用右键点击的APP
      isShowMemu: false //是否显示导航菜单
    };
  },
  computed: {
    // 背景
    bg() {
      return this.bgList[this.bgIndex];
    },
    // 主题颜色
    themeColor() {
      return this.themeColors[this.themeIndex];
    },
    // 右键菜单
    rightClickData() {
      return this.rightClickDatas[this.rightClickIndex];
    }
  },
  methods: {
    // 阻止右键默认效果
    notRightHand(e) {
      e.preventDefault();
    },
    // 左键点击桌面
    windowClick() {
      // 关闭右键菜单
      this.rightClickStyle = {
        display: "none"
      };
    },
    // 右键点击效果
    windowRightHand(e, type, app) {
      // 阻止默认事件
      e.preventDefault();
      // 显示对应的右键内容
      this.rightClickIndex = type;
      let obj = $contextmenu(e, type, app);
      this.rightClickStyle = obj.style;
      if (obj.app) {
        this.rightClickApp = obj.app;
      } else {
        this.rightClickApp = null;
      }
    },
    // 监听点击右键菜单
    onRightList(name) {
      if (name == "打开") {
        this.showApp(this.rightClickApp);
      } else if (name == "删除") {
        if (!this.rightClickApp.isDel) {
          this.myApp.alert({
            title: "提示",
            content: "该应用不允许被删除"
          });
          return;
        }
        // 获取id
        let id = this.rightClickApp.id;
        let appList = this.windowsApp;
        for (let i in appList) {
          if (appList[i].id == id) {
            let item = appList[i];
            item.isShow = false;
            // 调用splice,将改动渲染到页面
            this.windowsApp.splice(i, 1, item);
            return;
          }
        }
      } else if (name == "新建") {
        this.showApp({
          name: "新建",
          icon: "&#xe62f;",
          content: newApp,
          type: "vue",
          props: { addNewAPP: this.addNewAPP, themeColor: this.themeColor }
        });
      } else if (name == "个性化") {
        this.showApp({
          name: "设置",
          icon: "&#xe63d;",
          content: individuality,
          type: "vue",
          props: {
            bgList: this.bgList, //背景列表
            bgIndex: this.bgIndex, //当前显示的背景下标
            onbg: this.onbg, //更换背景
            themeColors: this.themeColors, //主题列表
            themeIndex: this.themeIndex, //当前显示的主题下标
            ontheme: this.ontheme //更换主题
          }
        });
      } else if (name == "设置") {
        this.showSetUp();
      } else if (name == "进入全屏") {
        // 判断浏览器内核
        function getBrowser() {
          var ua = navigator.userAgent.toLowerCase(),
            name = "";
          ua.match(/firefox\/([\d.]+)/)
            ? (name = "firefox")
            : ua.match(/chrome\/([\d.]+)/)
            ? (name = "chrome")
            : ua.match(/opera.([\d.]+)/)
            ? (name = "opera")
            : ua.match(/version\/([\d.]+).*safari/)
            ? (name = "safari")
            : (name = "ie");
          return name;
        }
        if (getBrowser() == "ie") {
          this.myApp.alert({
            title: "提示",
            content: "当前浏览器不支持该功能,请尝试手动按F11"
          });
          return;
        }
        if (
          !document.fullscreenElement &&
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement
        ) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(
              Element.ALLOW_KEYBOARD_INPUT
            );
          }
        }
      } else if (name == "退出全屏") {
        if (
          !!document.fullscreenElement ||
          !!document.mozFullScreenElement ||
          !!document.webkitFullscreenElement
        ) {
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
        }
      } else if (name == "关于") {
        this.myApp.alert({
          title: this.myIntro.title,
          content: this.myIntro.content
        });
      } else if (name == "显示桌面") {
        // 找到所有打开的窗口
        let appList = document.querySelectorAll(".my-app");
        // 为所有的组件添加最小化效果
        if (appList.length == 0) {
          return;
        }
        for (let i = 0; i < appList.length; i++) {
          appList[i].classList.add("min");
        }
        // 清除底部导航栏窗口置顶效果
        this.priority = null;
      } else if (name == "显示所有窗口") {
        // 找到所有打开的窗口
        let appList = document.querySelectorAll(".my-app");
        if (appList.length == 0) {
          return;
        }
        // 为所有的组件添加最小化效果
        for (let i = 0; i < appList.length; i++) {
          appList[i].classList.remove("min");
        }
        // 判断当前置顶的窗口
        this.isPriority();
      } else if (name == "关闭所有窗口") {
        // 找到所有打开的窗口
        let appList = document.querySelectorAll(".my-app");
        if (appList.length == 0) {
          return;
        }
        // 找到父元素
        let father = document.querySelector("#app>.window-admin");
        // 删除掉所有的窗口元素
        for (let i = 0; i < appList.length; i++) {
          father.removeChild(appList[i]);
        }
        // 清空打开应用列表
        this.appList.splice(0);
        // 清除底部导航栏窗口置顶效果
        this.priority = null;
      } else {
        this.myApp.alert({
          title: "提示",
          content: "新增的右键菜单请在此处添加功能"
        });
      }
    },
    // 打开APP应用
    showApp(option) {
      // 如果是html应用,则调用html方法
      if (option.type == "html") {
        this.myApp.html({
          content: option.content,
          title: option.name,
          theme: this.themeColor,
          // 打开窗口回调
          on: appBox => {
            this.on(appBox, option);
          },
          // 窗口移动回调
          move: this.move,
          // 最小化回调
          min: appBox => {
            this.isPriority();
          },
          // 关闭窗口回调
          off: this.off
        });
      } else {
        this.myApp.vue({
          content: option.content,
          props: option.props,
          title: option.name,
          theme: this.themeColor,
          // 打开窗口回调
          on: appBox => {
            this.on(appBox, option);
          },
          // 窗口移动回调
          move: this.move,
          // 最小化回调
          min: appBox => {
            // 判断当前置顶窗口
            this.isPriority();
          },
          // 关闭窗口回调
          off: this.off
        });
      }
    },
    // 打开设置
    showSetUp() {
      this.showApp({
        name: "设置",
        icon: "&#xe654;",
        content: setUp,
        type: "vue",
        props: {
          windowsApp: this.windowsApp, //所有的App列表
          setWinApp: this.setWinApp, //修改App的方法
          delWinApp: this.delWinApp //从win中删除App
        }
      });
    },
    // 点击导航栏标签,（打开/置顶）对应窗口
    unfold(id, i) {
      let app = document.getElementById(id);
      if (!app) {
        return;
      }
      app.classList.remove("min");
      this.myApp.zIndex += 1;
      app.style["z-index"] = this.myApp.zIndex;
      this.priority = i;
    },
    // 监听背景修改
    onbg(i) {
      if (this.bgIndex == i) {
        return;
      }
      this.bgIndex = i;
    },
    // 监听主题修改
    ontheme(i) {
      if (this.themeIndex == i) {
        return;
      }
      this.themeIndex = i;
    },
    // 添加App
    addNewAPP(app, end) {
      if (app) {
        this.windowsApp.push(app);
        if (typeof end == "function") {
          // 添加完成调用回调函数
          end();
        }
      }
    },
    // 修改App
    setWinApp(app) {
      console.log("确定修改APP", app);
    },
    // 从系统中删除APP
    delWinApp(app) {
      console.log("卸载APP", app);
    },
    // 打开应用回调函数
    on(appBox, option) {
      let obj = { ...option };
      obj.id = appBox.id;
      this.appList.push(obj);
      this.priority = this.appList.length - 1;
    },
    // 按下鼠标(拖拽)的回调函数
    move(appBox) {
      // 判断当前置顶窗口
      this.isPriority();
    },
    // 关闭应用的回调函数
    off(id) {
      // 先在打开的应用列表中删除该应用
      for (let i in this.appList) {
        if (this.appList[i] && this.appList[i].id == id) {
          this.appList.splice(i, 1);
          return;
        }
      }
      // 再判断当前置顶的窗口是哪个
      this.isPriority();
    },
    // 判断当前是哪个窗口置顶
    isPriority() {
      // 获取所有打开的窗口
      var appList = document.querySelectorAll(".my-app");
      for (var zIndex = 0, j, i = 0; i < appList.length; i++) {
        // 当前zindex大于之前zindex的 并且 class里面没有min(最小化)的
        if (
          parseInt(appList[i].style.zIndex) > zIndex &&
          [...appList[i].classList].indexOf("min") == -1
        ) {
          zIndex = parseInt(appList[i].style.zIndex);
          j = i;
        }
      }
      this.priority = j;
    },
    // 监听打开/关闭导航菜单
    onShowMemu() {
      this.isShowMemu = !this.isShowMemu;
    },
    // 登陆
    login(uname, upwd, loadData) {
      if (!uname) {
        this.myApp.msg({
          content: "用户名不能为空"
        });
        return;
      } else if (!upwd) {
        this.myApp.msg({
          content: "密码不能为空"
        });
        return;
      }
      if (uname == "admin" && upwd == "123456") {
        // 登陆成功,开始加载配置
        // 先调用回调函数,告诉子组件登陆成功了,开始加载配置
        if (typeof loadData == "function") {
          loadData();
        }
        // 为了能够看到加载效果,假设请求数据要两秒钟,实际是ajax请求的时间
        setTimeout(() => {
          // 如果配置在服务器,请求服务器配置文件,我这里就直接写死了
          // 背景图片列表
          this.bgList = [
            require("./images/bg_01.jpg"),
            require("./images/bg_02.jpg"),
            require("./images/bg_03.jpg"),
            require("./images/bg_04.jpg"),
            require("./images/bg_05.jpg")
          ];
          this.bgIndex = 0; //当前背景下标
          // 主题Class列表
          this.themeColors = [
            "theme-a",
            "theme-b",
            "theme-c",
            "theme-d",
            "theme-e",
            "theme-f",
            "theme-g",
            "theme-h",
            "theme-i",
            "theme-j",
            "theme-k",
            "theme-l",
            "theme-m",
            "theme-n",
            "theme-o",
            "theme-p",
            "theme-q",
            "theme-r",
            "theme-s",
            "theme-t",
            "theme-u",
            "theme-v",
            "theme-w",
            "theme-x",
            "theme-y",
            "theme-z"
          ];
          this.themeIndex = 18; //当前主题下标
          // 桌面应用列表
          this.windowsApp = [
            {
              id: 1, //唯一ID
              name: "浏览器", //应用名称
              imgType: "icon",
              icon: "&#xe604;", //应用图标
              img: "",
              content: browser, //VUE组件
              type: "vue", //应用类型
              isShow: true, //是否在桌面显示
              isDel: false //是否允许删除
            },
            {
              id: 2,
              name: "百度一下",
              imgType: "icon",
              icon: "&#xe612;",
              img: "",
              content: "https://www.baidu.com/",
              type: "html",
              isShow: true,
              isDel: true
            },
            {
              id: 3,
              name: "微信",
              imgType: "icon",
              icon: "&#xe638;",
              img: "",
              content: "https://wx.qq.com/",
              type: "html",
              isShow: true,
              isDel: true
            }
          ];
          // 数据全部获取到了之后,登陆完成,显示桌面
          this.isLogin = true;
        }, 2000);
      } else {
        this.myApp.msg({
          content: "用户名或密码错误"
        });
      }
    }
  }
};
</script>