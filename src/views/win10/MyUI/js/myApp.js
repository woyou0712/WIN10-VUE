!function () {

  const MyUI = require("./MyUI")
  // 拖拽方法,e:触发事件的元素,appBox:APP窗口元素
  function drga(e, appBox, shade) {
    var e = e || window.event;  //兼容IE浏览器
    const myWindows = document.querySelector("#app>.window-admin")
    appBox.appendChild(shade)
    myWindows.onmousemove = function (event) {
      let left = event.clientX - e.offsetX;
      let top = event.clientY - e.offsetY;
      appBox.style.left = left + 'px';
      appBox.style.top = top + 'px';
    }
    myWindows.onmouseup = function () {
      this.onmousemove = null;
      this.onmouseup = null;
      appBox.removeChild(shade);
    }
  }
  // 设置Zindex层
  MyUI.prototype.zIndex = 100;

  // 设置ID,每个窗口都有不一样的ID
  MyUI.prototype.id = 0;


  // 配置文件
  MyUI.prototype.option = {
    title: "新窗口",//应用名称
    theme: "theme",//主题css类名
    content: "http://www.baidu.com",//内容
    size: ["70%", "80%"],//窗口大小
    maxmin: true,
    on(appBox) { return },//打开窗口的回调函数
    move(appBox) { return },//在窗口中按下鼠标的回调函数
    min(appBox) { return },//窗口最小化回调函数/appBox,窗口对象
    max(appBox) { return },//窗口最大化回调函数
    yes() { return },//点击确定回调函数
    off(id) { return },//关闭窗口回调函数
  }
  // 鼠标按下: 置顶并且调用回调函数
  MyUI.prototype.down = function (appBox, config) {
    this.zIndex += 1;
    appBox.style["z-index"] = this.zIndex;
    if (typeof config.move == "function") {
      config.move(appBox)
    } else {
      this.option.move(appBox)
    }
  }

  // 初始化一个应用弹窗(iframe或者VUE组件)
  MyUI.prototype.__initApp = function (config) {
    // 获取桌面元素
    let father = document.querySelector("#app>.window-admin")
    // ID和zindex+1
    this.id += 1;
    this.zIndex += 1
    // APP容器
    let appBox = document.createElement("div");
    appBox.classList.add("my-app")
    appBox.id = this.id;
    appBox.style["z-index"] = this.zIndex;
    appBox.style["width"] = config.size && config.size[0] ? config.size[0] : this.option.size[0];
    appBox.style["height"] = config.size && config.size[1] ? config.size[1] : this.option.size[1];
    // 鼠标按下事件
    appBox.onmousedown = (e) => {
      e.stopPropagation();
      // 如果之前还有遮罩层则清除掉遮罩层
      let arr = document.querySelectorAll(".app-shade")
      for (let item of arr) {
        appBox.removeChild(item)
      }
      // 置顶 并且调用回调函数
      this.down(appBox, config);
      // 移动拖拽
      drga(e, appBox, this.shade)
    };
    // 阻止右键默认事件
    appBox.oncontextmenu = e => {
      e.stopPropagation();
      e.preventDefault();
    };
    // 标题
    let title = document.createElement("div");
    title.classList.add("app-title");
    title.classList.add(config.theme ? config.theme : this.option.theme);//添加主题
    // 左侧应用名称
    let name = document.createElement("div");
    name.classList.add("name");
    name.innerText = config.title ? config.title : this.option.title;//添加标题
    name.onmousedown = e => {
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.down(appBox, config)
    }
    // 右侧三个按钮
    let btns = document.createElement("div");
    let btn1 = document.createElement("span");//第一个,最小化
    btn1.classList.add("iconfont");
    btn1.innerHTML = "&#xe664;";
    // 窗口最小化
    btn1.onclick = () => {
      appBox.classList.add("min");//窗口最小化
      if (typeof config.min == "function") {
        config.min(appBox)//调用回调函数
      }
    };
    let btn2 = document.createElement("span");//第二个,最大化
    btn2.classList.add("iconfont");
    btn2.innerHTML = "&#xe6cc;";
    // 窗口最大化
    btn2.onclick = function () {
      appBox.classList.toggle("max");//窗口最大化
      if ([...appBox.classList].indexOf("max") >= 0) {
        btn2.innerHTML = "&#xec13;"
      } else {
        btn2.innerHTML = "&#xe6cc;"
      }
      if (typeof config.max == "function") {
        config.max(appBox)//调用回调函数
      }
    };
    let btn3 = document.createElement("span");//第三个,关闭
    btn3.classList.add("iconfont");
    btn3.innerHTML = "&#xe659;";
    // 关闭窗口
    btn3.onclick = function () {
      if (typeof config.off == "function") {
        config.off(appBox.id)//调用回调函数
      }
      father.removeChild(appBox);//删除该窗口元素
    };
    // 判断配置,是否需要显示最大化和最小化按钮
    if ((this.option.maxmin && config.maxmin !== false) || config.maxmin === true) {
      btns.appendChild(btn1)
      btns.appendChild(btn2)
    }
    btns.appendChild(btn3)
    btns.onmousedown = e => {
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.down(appBox, config);
    }
    title.appendChild(name)
    title.appendChild(btns)
    appBox.appendChild(title)
    // 内容区域
    let section = document.createElement("section");
    section.classList.add("section")
    section.onmousedown = e => {
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.down(appBox, config);
    }
    return {
      father, appBox, section
    }
  }

  // 创建一个iframe弹窗
  MyUI.prototype.html = function (config) {
    let { father, appBox, section } = this.__initApp(config);//初始化数据
    // 创建iframs元素
    let iframs = document.createElement("iframe");
    iframs.sandbox = "allow-forms allow-scripts allow-same-origin allow-popups";//防止域名重定向,导致整个页面跳转
    iframs.classList.add("iframs")
    iframs.src = config.content ? config.content : this.option.content;
    section.appendChild(iframs)
    appBox.appendChild(section)
    father.appendChild(appBox);//将容器挂载到dom树上并渲染
    // 打开窗口回调
    if (typeof config.on == "function") {
      config.on(appBox)
    }
  }

  // 创建一个Vue组件弹窗
  MyUI.prototype.vue = function (config) {
    let { father, appBox, section } = this.__initApp(config);//初始化数据
    // 创建组件容器,容纳vue组件
    let vueBox = document.createElement("div");
    vueBox.id = `vue-box-${this.id}`
    section.appendChild(vueBox)
    appBox.appendChild(section)
    father.appendChild(appBox);//将容器挂载到dom树上并渲染
    // 创建构造器,将vue组件实例化
    var Profile = this.Vue.extend(config.content);
    // 创建 Profile 实例，并挂载到一个元素上。
    var instance = new Profile({
      propsData: config.props
    })
    // 并挂载到一个元素上。
    instance.$mount(`#vue-box-${this.id}`)
    // 打开窗口回调
    if (typeof config.on == "function") {
      config.on(appBox)
    }
  }

  // 初始化一个消息框
  MyUI.prototype.__initInfo = function (config) {
    // 获取桌面元素
    let father = document.querySelector("#app>.window-admin")
    // ID和zindex+1
    this.id += 1;
    this.zIndex += 1
    // APP容器
    let appBox = document.createElement("div");
    appBox.classList.add("my-alert")
    appBox.id = this.id;
    appBox.style["z-index"] = this.zIndex;
    // 鼠标按下事件
    appBox.onmousedown = (e) => {
      e.stopPropagation();
      // 如果之前还有遮罩层则清除掉遮罩层
      let arr = document.querySelectorAll(".app-shade")
      for (let item of arr) {
        appBox.removeChild(item)
      }
      // 置顶 并且调用回调函数
      this.down(appBox, config);
      // 拖拽事件
      drga(e, appBox, this.shade)
    };
    // 阻止右键默认事件
    appBox.oncontextmenu = e => {
      e.stopPropagation();
      e.preventDefault();
    };
    // 内容区域
    let msg = document.createElement("div");
    msg.classList.add("pop-msg");
    msg.innerText = config.content ? config.content : this.option.content;
    msg.onmousedown = e => {
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.down(appBox, config);
    }

    return { father, appBox, msg }
  }
  // 创建一个alert弹窗
  MyUI.prototype.alert = function (config) {
    let { father, appBox, msg } = this.__initInfo(config)
    // 标题
    let title = document.createElement("div");
    title.classList.add("pop-title");
    title.classList.add(config.theme ? config.theme : this.option.theme);//添加主题
    // 左侧应用名称
    let name = document.createElement("div");
    name.classList.add("name");
    name.innerText = config.title ? config.title : this.option.title;//添加标题
    name.onmousedown = e => {
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.down(appBox, config);
    }
    let off = document.createElement("span");
    off.classList.add("iconfont");
    off.innerHTML = "&#xe607;";
    off.onmousedown = e => {
      e.stopPropagation();
      if (typeof config.off == "function") {
        config.off(appBox.id)//调用回调函数
      } else {
        this.option.off(appBox.id)
      }
      father.removeChild(appBox);//删除该窗口元素
    }
    title.appendChild(name);
    title.appendChild(off);
    appBox.appendChild(title);
    appBox.appendChild(msg);
    // 下方按钮
    let btns = document.createElement("div");
    btns.classList.add("pop-btns");
    btns.onmousedown = e => {
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.down(appBox, config);
    }
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerText = "确定";
    btn.classList.add(config.theme ? config.theme : this.option.theme);//添加主题
    btn.onclick = e => {
      e.stopPropagation();
      if (typeof config.yes == "function") {
        config.yes()//调用回调函数
      } else {
        this.option.yes()
      }
      father.removeChild(appBox);//删除该窗口元素
    }
    btns.appendChild(btn);
    appBox.appendChild(btns);
    // 将元素挂在到桌面
    father.appendChild(appBox);
  }
  // 创建一个消息提示框
  MyUI.prototype.msg = function (config) {
    let { father, appBox, msg } = this.__initInfo(config)
    appBox.appendChild(msg);
    // 将元素挂在到桌面
    father.appendChild(appBox);
    setTimeout(() => {
      father.removeChild(appBox);//删除该窗口元素
    }, 2000)
  }
  module.exports = MyUI;
}()