"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      title: "Hello",
      // 可使用窗口距离顶部的距离
      usedWindowTop: "0px",
      categroyList: []
    };
  },
  onLoad() {
    this.usedWindowTop = getApp().globalData.usedWindowTop;
    let baseURL = getApp().globalData.baseURL;
    common_vendor.index.request({
      url: baseURL + "/getKnowledgeCategory",
      success: (res) => {
        let list = res.data;
        list.forEach((item) => {
          item.url = item.url + "?mainId=" + item.id;
        });
        Object.assign(this.categroyList, list);
      }
    });
  },
  onShow() {
  },
  methods: {},
  computed: {}
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "388432ba": _ctx.usedWindowTop
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main = __default__;
if (!Array) {
  const _easycom_CommonBar2 = common_vendor.resolveComponent("CommonBar");
  _easycom_CommonBar2();
}
const _easycom_CommonBar = () => "../../components/CommonBar/CommonBar.js";
if (!Math) {
  _easycom_CommonBar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.categroyList.length > 0
  }, $data.categroyList.length > 0 ? {
    b: common_vendor.f($data.categroyList, (item, index, i0) => {
      return common_vendor.e({
        a: index == 9
      }, index == 9 ? {
        b: common_vendor.t(item.name)
      } : {
        c: common_vendor.t(item.name),
        d: "/components/ModelCategoryShow/ModelCategoryShow?mainId=" + item.id
      }, {
        e: index
      });
    })
  } : {}, {
    c: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/myhome/knowledge-tree-app/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
