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
    content: "http://www.baidu.com",//内容:如果是iframe就直接填写完整的url,如果是VUE组件需要先引入组件,详细可参考index.vue组件中311行showApp方法
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
