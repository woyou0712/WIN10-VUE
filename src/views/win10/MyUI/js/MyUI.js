!function () {
  // 构造函数
  const MyUI = function (Vue) {
    this.Vue = Vue;
    // 创建遮罩层/避免鼠标拖入iframe窗口时出现卡顿现象
    this.shade = document.createElement("div");
    this.shade.classList.add("app-shade");
  };

  module.exports = MyUI
}()