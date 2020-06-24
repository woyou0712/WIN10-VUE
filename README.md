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
```
 - this.myApp.html(option) //弹出一个可以拖动的iframe窗口
 - this.myApp.vue(option) //弹出一个可以拖动的VUE组件窗口
 - this.myApp.alert(option) //弹出一个确认框
 - this.myApp.msg(option) //弹出一个2秒钟后自动关闭的消息提示框
```
