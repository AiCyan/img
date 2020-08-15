// 参数应使用绝对路径
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

// 加载 js、css、json、api
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
      apiPath: "https://live2d.fghrsh.net/api/",
    });
  });
}

// 拖拽
window.onload = function () {
  var getDiv = document.getElementById("waifu");
  drag(getDiv);
}

function drag(node) {
  var flag = false,
    curX = 0,
    curY = 0,
    nodeX = 0,
    nodeY = 0,
    absX = 0,
    absY = 0,
    limX = 0,
    limY = 0,
    winW = document.documentElement.clientWidth || document.body.clientWidth,
    winH = document.documentElement.clientHeight || document.body.clientHeight,
    maxW = winW - node.offsetWidth,
    maxH = winH - node.offsetHeight;

  function down() {
    flag = true;
    var touch;
    if (event.touches) {
      touch = event.touches[0];
    } else {
      touch = event;
    }
    curX = touch.clientX;
    curY = touch.clientY;
    nodeX = node.offsetLeft;
    nodeY = node.offsetTop;
  }

  function move() {
    if (flag) {
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      absX = touch.clientX - curX;
      absY = touch.clientY - curY;
      limX = nodeX + absX;
      limY = nodeY + absY;
      limX = limt(limX, 0, maxW);
      limY = limt(limY, 0, maxH);
      node.style.left = limX + "px";
      node.style.top = limY + "px";
      document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
      }, false)
    }
  }

  function limt(cur, min, max) {
    if (cur < min) {
      return min;
    } else if (cur >= max) {
      return max;
    } else {
      return cur;
    }
  }

  function end() {
    flag = false;
  }
  node.addEventListener("mousedown", function () {
    down();
  }, false);
  node.addEventListener("touchstart", function () {
    down();
  }, false)
  node.addEventListener("mousemove", function () {
    move();
  }, false);
  node.addEventListener("touchmove", function () {
    move();
  }, false)
  document.body.addEventListener("mouseup", function () {
    end();
  }, false);
  node.addEventListener("touchend", function () {
    end();
  }, false);
}