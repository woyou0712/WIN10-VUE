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
- src/views/admin整个复制到自己项目的views目录下
- 在router中引入admin/index.vue
- main.js中引入
  - import "./views/admin/css/main.css";
  - import myApp from "./views/admin/MyUI/js/myApp.js";
  - Vue.prototype.myApp = new myApp(Vue);
```

