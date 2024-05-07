"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "PubFullScreen",
  data() {
    return {
      exitOrFull: "全屏"
    };
  },
  methods: {
    openFullScreen() {
      if (this.exitOrFull == "全屏") {
        this.exitOrFull = "退出全屏";
      } else {
        this.exitOrFull = "全屏";
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.exitOrFull),
    b: common_vendor.o((...args) => $options.openFullScreen && $options.openFullScreen(...args)),
    c: common_vendor.n($data.exitOrFull == "退出全屏" ? "full-demo" : "")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/myhome/knowledge-tree-app/components/PubFullScreen/PubFullScreen.vue"]]);
wx.createComponent(Component);
