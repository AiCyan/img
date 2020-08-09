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
  var getDiv = document.getElementById("waifu");
  limitDrag(getDiv);
  phoneDrap(getDiv);

  function limitDrag(node) {
    node.onmousedown = function (ev) {
      var e = ev || window.event;
      var offsetX = e.clientX - this.offsetLeft;
      var offsetY = e.clientY - this.offsetTop;
      document.onmousemove = function (ev) {
        var e = ev || window.event;
        var l = e.clientX - offsetX;
        var t = e.clientY - offsetY;
        if (l <= 0) {
          l = 0;
        }
        var windowWidth =
          document.documentElement.clientWidth || document.body.clientWidth;
        if (l >= windowWidth - node.offsetWidth - 30) {
          l = windowWidth - node.offsetWidth - 30;
        }
        if (t <= 30) {
          t = 30;
        }
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        if (t >= windowHeight - node.offsetHeight) {
          t = windowHeight - node.offsetHeight;
        }
        node.style.left = l + "px";
        node.style.top = t + "px";
      };
      document.onmouseup = function () {
        document.onmousemove = null;
      };
    };
  }

  function phoneDrap(id) {
    var div1 = document.querySelector(id);
    //限制最大宽高，不让滑块出去
    var maxW = document.body.clientWidth - div1.offsetWidth;
    var maxH = document.body.clientHeight - div1.offsetHeight;
    //手指触摸开始，记录div的初始位置
    div1.addEventListener('touchstart', function (e) {
      var ev = e || window.event;
      var touch = ev.targetTouches[0];
      oL = touch.clientX - div1.offsetLeft;
      oT = touch.clientY - div1.offsetTop;
      document.addEventListener("touchmove", defaultEvent, false);
    });
    //触摸中的，位置记录
    div1.addEventListener('touchmove', function (e) {
      var ev = e || window.event;
      var touch = ev.targetTouches[0];
      var oLeft = touch.clientX - oL;
      var oTop = touch.clientY - oT;
      if (oLeft < 0) {
        oLeft = 0;
      } else if (oLeft >= maxW) {
        oLeft = maxW;
      }
      if (oTop < 0) {
        oTop = 0;
      } else if (oTop >= maxH) {
        oTop = maxH;
      }
      div1.style.left = oLeft + 'px';
      div1.style.top = oTop + 'px';
    });
    //触摸结束时的处理
    div1.addEventListener('touchend', function () {
      document.removeEventListener("touchmove", defaultEvent);
    });
    //阻止默认事件
    function defaultEvent(e) {
      e.preventDefault();
    }
  }
};