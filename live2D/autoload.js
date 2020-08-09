// 注意：live2d_path 参数应使用绝对路径
const live2d_path = "https://cdn.jsdelivr.net/gh/AiCyan/img@latest/live2D/";

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;
    if (type === "css") {
      tag = document.createElement("link");
      tag.rel = "stylesheet";
      tag.href = url;
    } else if (type === "js") {
      tag = document.createElement("script");
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
  });
}

// 加载 waifu.css live2d.min.js waifu-tips.js
if (screen.width >= 10) {
  Promise.all([
    loadExternalResource(live2d_path + "waifu.css", "css"),
    // loadExternalResource(live2d_path + "font-awesome.css", "css"),
    loadExternalResource(live2d_path + "iconfont.css", "css"),
    loadExternalResource(live2d_path + "live2d.min.js", "js"),
    loadExternalResource(live2d_path + "waifu-tips.js", "js"),
  ]).then(() => {
    initWidget({
      waifuPath: live2d_path + "waifu-tips.json",
      apiPath: "https://live2d.fghrsh.net/api/"
    });
  });
}

// 拖拽
window.onload = function () {
  var flag = false;
  var cur = {
    x: 0,
    y: 0
  }
  var nx, ny, dx, dy, x, y;

  function down() {
    flag = true;
    var touch;
    if (event.touches) {
      touch = event.touches[0];
    } else {
      touch = event;
    }
    cur.x = touch.clientX;
    cur.y = touch.clientY;
    dx = div2.offsetLeft;
    dy = div2.offsetTop;
  }

  function move() {
    if (flag) {
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      nx = touch.clientX - cur.x;
      ny = touch.clientY - cur.y;
      x = dx + nx;
      y = dy + ny;
      div2.style.left = x + "px";
      div2.style.top = y + "px";
      //阻止页面的滑动默认事件
      document.addEventListener("touchmove", function () {
        event.preventDefault();
      }, false);
    }
  }
  //鼠标释放时候的函数
  function end() {
    flag = false;
  }
  var div2 = document.getElementById("waifu");
  div2.addEventListener("mousedown", function () {
    down();
  }, false);
  div2.addEventListener("touchstart", function () {
    down();
  }, false)
  div2.addEventListener("mousemove", function () {
    move();
  }, false);
  div2.addEventListener("touchmove", function () {
    move();
  }, false)
  document.body.addEventListener("mouseup", function () {
    end();
  }, false);
  div2.addEventListener("touchend", function () {
    end();
  }, false);
};