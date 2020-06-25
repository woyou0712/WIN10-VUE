# 直接运行
## 安装依赖
```
$ npm install
```

### 热加载运行
```
$ npm run serve
```


# 引入到自己的项目中
```
- src/views/win10整个复制到自己项目的views目录下
- 在router中引入win10/index.vue
- main.js中引入
  - import "./views/win10/css/main.css";
  - import myApp from "./views/win10/MyUI/js/myApp.js";
  - Vue.prototype.myApp = new myApp(Vue);
```

# 弹窗API
### 默认配置
```
 option = {
    title: "新窗口",//应用名称
    theme: "theme",//主题css类名
    content: "http://www.baidu.com",//内容:如果是iframe就直接填写完整的url
    size: ["70%", "80%"],//窗口大小
    maxmin: true,//是否显示最大化和最小化,默认为true
    on(appBox) { return },//打开窗口的回调函数 appBox:窗口对象
    move(appBox) { return },//在窗口中按下鼠标的回调函数
    min(appBox) { return },//窗口最小化回调函数
    max(appBox) { return },//窗口最大化回调函数
    yes() { return },//点击确定回调函数
    off(id) { return },//关闭窗口回调函数
  }
```
### 弹出一个可以拖动的iframe窗口
- this.myApp.html(option)
**例:**
```
this.myApp.html({
  content: "http://www.baidu.com/",
  title: "百度一下",
  theme:"theme-b",
  // 打开窗口回调
  on: appBox => {
  },
  // 窗口移动回调
  move: appBox => {
  },
  // 最小化回调
  min: appBox => {
  },
  // 关闭窗口回调
  off: id => {
  }
});
```
### 弹出一个可以拖动的VUE组件窗口
- this.myApp.vue(option)

**例:**
- 弹窗VUE组件需要先引入组件; 详情:[系统配置](#系统配置)
```
import browser from "./componemts/app/browser.vue"

this.myApp.vue({
  content: browser,
  title: "浏览器",
  theme:"theme-b",
  props: {key:value},
  // 打开窗口回调
  on: appBox => {
  },
  // 窗口移动回调
  move: appBox => {
  },
  // 最小化回调
  min: appBox => {
  },
  // 关闭窗口回调
  off: id => {
  }
});
```
### 弹出一个可以拖动的消息确认框
- this.myApp.alert(option)
```
this.myApp.alert({
  title:"提示",
  content: "你想干什么?",
  // 点击确定回调
  yes:()=> {
  }
});
```
### 弹出一个2秒后自动关闭的消息提示框
- this.myApp.msg(option)
```
this.myApp.msg({
  content: "轻提示"
});
```

# 右键菜单
- index.vue
### 配置
```
data(){
  return {
    // 右键菜单内容
    rightClickDatas:{
      // 桌面右键菜单
      window:[],
      // 应用图标右键菜单
      app:[],
      // 导航栏右键菜单
      navbar:[]
    },
  }
}
```
### 处理函数
```
methods:{
  onRightList(name) {
    // neme 你点击的菜单名字
  }
}
```
# 系统配置
- index.vue
### 配置
```
data(){
  return {
    // 背景图片列表
    bgList : [
      // 如果图片在服务器,则可以直接使用网络图片的完整URL
      require("./images/bg_01.jpg"),
      require("./images/bg_02.jpg"),
      require("./images/bg_03.jpg"),
      require("./images/bg_04.jpg"),
      require("./images/bg_05.jpg")

    ],
    bgIndex :0, //当前背景下标
    // 主题Class列表
    themeColors : [
      // 可以使用自定义类
      "theme-a",   //主题类包括至少两条属性 {background-color:#???,color:#???}
      "theme-b",
      "theme-c",
      "theme-d"
    ],
    themeIndex : 18; //当前主题下标
    // 桌面应用列表
    windowsApp : [
      {
        id: 1, //唯一ID
        name: "浏览器", //应用名称
        imgType: "icon",
        icon: "&#xe604;", //应用图标
        img: "",
        content: browser, //VUE组件 需要先引入自定义的VUE组件 例如: import browser from "./componemts/app/browser.vue"; //浏览器
        type: "vue", // 应用类型 "vue" "html"  
        isShow: true, // 是否在桌面显示
        isDel: false // 是否允许删除
      },
      {
        id: 2,
        name: "百度一下",
        imgType: "icon",
        icon: "&#xe612;",
        img: "",
        content: "https://www.baidu.com/", // iframe组件
        type: "html",
        isShow: true,
        isDel: true
      }
    ],
  }
}
```
### 登陆并配置
```
methods:{
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
        // 如果配置在服务器,请求服务器配置文件,
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
```
# 修改系统配置
- index.vue
- 可在以下函数中,对配置做处理或者保存到服务器
```
methods:{
  // 监听背景修改
  onbg(i) {
    if (this.bgIndex == i) {
      return;
    }
    this.bgIndex = i;
    // 然后将配置保存到服务器
  },
  // 监听主题修改
  ontheme(i) {
    if (this.themeIndex == i) {
      return;
    }
    this.themeIndex = i;
    // 然后将配置保存到服务器
  },
  // 添加App
  addNewAPP(app, end) {
    if (app) {
      this.windowsApp.push(app);
      if (typeof end == "function") {
        // 添加完成调用回调函数
        end();
        // 然后将配置保存到服务器
      }
    }
  },
  // 修改App
  setWinApp(app) {
    // 将配置保存到服务器
    console.log("确定修改APP", app);
  },
  // 从系统中删除APP
  delWinApp(app) {
    // 将配置保存到服务器
    console.log("卸载APP", app);
  },
}
```

