# win10

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
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

