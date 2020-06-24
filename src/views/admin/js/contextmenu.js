!function () {
  // 右键弹出窗大小
  let $rightClickWidth = 130,
    $rightClickHeight = 200;
  // 右键点击计算出组件应该显示的位置
  module.exports = function (e, type, app) {
    // 获取鼠标位置相对于整个窗口的位置
    let x = e.clientX,
      y = e.clientY;
    // 如果是在导航栏点击的右键
    if (type == "navbar") {
      // 如果鼠标离右侧小于组件宽度
      if (e.view.innerWidth - x <= $rightClickWidth) {
        // 如果鼠标距离最下面高度小于500,则往右上方显示
        return {
          style: {
            display: "block",
            bottom: String(e.view.innerHeight - y) + "px",
            right: "1px"
          }, app
        };
      } else {
        return {
          style: {
            display: "block",
            bottom: String(e.view.innerHeight - y) + "px",
            left: String(x) + "px"
          }, app
        };
      }
    } else {
      // 如果是在桌面或者桌面图标上点击的右键
      // 如果鼠标距离最下面高度小于200,并且距离最右侧小于130则往靠右侧上方显示
      if (e.view.innerHeight - y <= $rightClickHeight && e.view.innerWidth - x <= $rightClickWidth) {
        return {
          style: {
            display: "block",
            bottom: String(e.view.innerHeight - y) + "px",
            right: "1px"
          }, app
        };
      } else if (e.view.innerHeight - y <= $rightClickHeight) {
        // 如果鼠标距离最下面高度小于200,则往右上方显示
        return {
          style: {
            display: "block",
            bottom: String(e.view.innerHeight - y) + "px",
            left: String(x) + "px"
          }, app
        };
      } else if (e.view.innerWidth - x <= $rightClickWidth) {
        // 如果鼠标距离最右侧小于130则显示在最右侧
        return {
          style: {
            display: "block",
            top: String(y) + "px",
            right: "1px"
          }, app
        };
      } else {
        return {
          style: {
            display: "block",
            top: String(y) + "px",
            left: String(x) + "px"
          }, app
        };
      }
    }
  }

}()