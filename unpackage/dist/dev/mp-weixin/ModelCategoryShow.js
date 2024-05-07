"use strict";
const common_vendor = require("./common/vendor.js");
const __default__ = {
  name: "ModelCategoryShow",
  data() {
    return {
      // 可使用窗口距离顶部的距离
      usedWindowTop: "0px",
      // 标题名称
      titleName: "",
      // 侧边栏 列表
      sideBarList: [],
      branchId: "",
      mainId: ""
    };
  },
  onLoad(option) {
    this.usedWindowTop = getApp().globalData.usedWindowTop;
    let baseURL = getApp().globalData.baseURL;
    this.mainId = option.mainId;
    this.branchId = option.branchId;
    let parentUrl = "";
    common_vendor.index.request({
      url: baseURL + "/getKnowledgeCategory?id=" + this.mainId,
      success: (res) => {
        this.titleName = res.data[0].name;
        parentUrl = res.data[0].url;
        common_vendor.index.request({
          url: baseURL + "/modelList?parentId=" + this.mainId,
          success: (res2) => {
            let list = res2.data;
            list.forEach((item) => {
              item.url = "/" + parentUrl + "/" + item.url + "?mainId=" + this.mainId + "&branchId=" + item.id;
            });
            Object.assign(this.sideBarList, list);
          }
        });
      }
    });
  },
  methods: {}
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "10a1f5ec": _ctx.usedWindowTop
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main = __default__;
if (!Array) {
  const _easycom_ViceRightModel2 = common_vendor.resolveComponent("ViceRightModel");
  const _easycom_CommonBar2 = common_vendor.resolveComponent("CommonBar");
  (_easycom_ViceRightModel2 + _easycom_CommonBar2)();
}
const _easycom_ViceRightModel = () => "./components/ViceRightModel/ViceRightModel.js";
const _easycom_CommonBar = () => "./components/CommonBar/CommonBar.js";
if (!Math) {
  (_easycom_ViceRightModel + _easycom_CommonBar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.titleName),
    b: common_vendor.f($data.sideBarList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: "/components/ModelCategoryShow/ModelCategoryShow?" + item.url.split("?")[1],
        d: common_vendor.n(item.id == $data.branchId ? "active" : "deactive")
      };
    }),
    c: $data.branchId
  }, $data.branchId ? {
    d: common_vendor.p({
      mainId: $data.mainId,
      branchId: $data.branchId
    })
  } : {}, {
    e: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/myhome/knowledge-tree-app/components/ModelCategoryShow/ModelCategoryShow.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
