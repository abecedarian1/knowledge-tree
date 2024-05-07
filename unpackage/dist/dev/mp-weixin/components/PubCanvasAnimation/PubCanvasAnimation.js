"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "PubCanvasAnimation",
  data() {
    return {
      tList: [0, 0.2, 0.4, 0.6, 0.8, 1],
      ballColor: [
        "rgb(95, 158, 160)",
        "rgb(172, 138, 169)",
        "rgb(233, 217, 125)",
        "rgb(189, 245, 151)",
        "rgb(137, 138, 216)",
        "rgb(75, 97, 61)"
      ],
      raf: null
    };
  },
  methods: {
    // Cubic Bezier 函数---计算贝塞尔曲线上的点的坐标值
    cubicBezier(p0, p1, p2, p3, t) {
      return Math.pow(1 - t, 3) * p0 + 3 * Math.pow(1 - t, 2) * t * p1 + 3 * (1 - t) * Math.pow(t, 2) * p2 + Math.pow(t, 3) * p3;
    },
    //图像绘制
    loadingItemDraw(ctx, init) {
      const start = { x: 50, y: 100 };
      const control1 = { x: 110, y: 0 };
      const control2 = { x: 170, y: 200 };
      const end = { x: 230, y: 90 };
      for (let i = 0; i < this.tList.length; i++) {
        const x = this.cubicBezier(start.x, control1.x, control2.x, end.x, this.tList[i]);
        const y = this.cubicBezier(start.y, control1.y, control2.y, end.y, init ? 0 : this.tList[i]);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.setFillStyle(this.ballColor[i]);
        ctx.fill();
        ctx.draw(true);
        this.tList[i] += 5e-3;
        if (this.tList[i] > 1) {
          this.tList[i] = 0;
        }
      }
    },
    //自定义动画循环机制——适配小程序
    requestAnimationFrame(callback) {
      let interval = null;
      interval = setTimeout(() => {
        callback();
      }, 10);
      return interval;
    },
    //自定义取消动画循环——适配小程序
    cancelAnimationFrame(interval) {
      clearTimeout(interval);
    },
    // 动画循环
    animate(ctx) {
      ctx.clearRect(0, 0, 600, 200);
      this.loadingItemDraw.call(this, ctx, false);
      this.raf = this.requestAnimationFrame(this.animate.bind(this, ctx));
    },
    //监听动画的打开关闭
    startOrEndAnimation() {
      let ctx = common_vendor.index.createCanvasContext("canvas1");
      if (this.raf) {
        this.cancelAnimationFrame(this.raf);
        ctx.clearRect(0, 0, 600, 200);
        this.loadingItemDraw.call(this, ctx, true);
        this.raf = null;
      } else {
        this.raf = this.requestAnimationFrame(this.animate.bind(this, ctx));
      }
    }
  },
  mounted() {
    let ctx = common_vendor.index.createCanvasContext("canvas1", this);
    this.loadingItemDraw.call(this, ctx, true);
  },
  //手动处理忘记关闭动画的情况
  beforeUnmount() {
    this.cancelAnimationFrame(this.raf);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.startOrEndAnimation && $options.startOrEndAnimation(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/myhome/knowledge-tree-app/components/PubCanvasAnimation/PubCanvasAnimation.vue"]]);
wx.createComponent(Component);
