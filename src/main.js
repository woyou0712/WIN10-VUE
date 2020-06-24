import Vue from 'vue'
import App from './App.vue'
import router from './router'

import "./views/win10/css/main.css";
import myApp from "./views/win10/MyUI/js/myApp.js";
Vue.prototype.myApp = new myApp(Vue);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
