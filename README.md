# win10

# 直接运行
## 安装依赖
```
$ npm install
```

### 热加载运行
```
$ npm run serve
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 引入到自己的项目中
```
- src/views/win10整个复制到自己项目的views目录下
- 在router中引入win10/index.vue
- main.js中引入
  - import "./views/win10/css/main.css";
  - import myApp from "./views/win10/MyUI/js/myApp.js";
  - Vue.prototype.myApp = new myApp(Vue);
```
# API
## 弹窗API

- this.myApp.html(option) //弹出一个可以拖动的iframe窗口
- this.myApp.vue(option) //弹出一个可以拖动的VUE组件窗口
- this.myApp.alert(option) //弹出一个可以拖拽的消息确认框
- this.myApp.msg(option) //弹出一个2秒后自动关闭的消息提示框
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
- 弹窗VUE组件需要先引入组件; 详情:[系统配置](#系统配置)
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
### 获取配置
- 在登陆之后开始获取配置
```
methods:{
  login(uname, upwd, loadData) {
    // uneme 用户名
    // upwd 密码
    // loadData 回调函数,告诉login页面已经登陆成功,开始加载配置
  }
}
```
