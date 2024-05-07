"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "PubSideBar",
  data() {
    return {};
  },
  props: [
    "expandOrNot",
    "navList",
    "selectItem",
    "firstLoad"
  ],
  emits: [
    "changeStatus",
    "changeItem"
  ],
  mounted() {
    if (this.expandOrNot) {
      this.$emit("changeStatus", "open");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.expandOrNot
  }, $props.expandOrNot ? {
    b: common_vendor.f($props.navList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.n($props.selectItem == item ? "select" : ""),
        c: common_vendor.o(($event) => _ctx.$emit("changeItem", item), index),
        d: index
      };
    }),
    c: common_vendor.t("<"),
    d: common_vendor.o(($event) => _ctx.$emit("changeStatus", "close"))
  } : {
    e: common_vendor.o(($event) => _ctx.$emit("changeStatus", "close"))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/myhome/knowledge-tree-app/components/PubSideBar/PubSideBar.vue"]]);
wx.createComponent(Component);
