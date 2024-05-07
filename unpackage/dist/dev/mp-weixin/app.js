"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/component-quick-find/ComponentQuickFind.js";
  "./components/ModelCategoryShow/ModelCategoryShow.js";
  "./pages/web-front/detail-content/ContentList.js";
}
const _sfc_main = {
  globalData: {
    //平台类型：app web  (其他：大多数是小程序)
    platformType: "",
    // 可使用窗口距离顶部的距离
    usedWindowTop: "",
    // 后端地址----本地配置
    // baseURL:'http://localhost:8081/knowledge_tree/swagger',
    //服务端地址 
    baseURL: "http://39.105.220.189:8081/knowledge_tree/swagger"
  },
  onLaunch: function() {
    let this_ = this;
    console.log("App Launch");
    common_vendor.index.getSystemInfo({
      success: function(res) {
        this_.globalData.platformType = String(res.uniPlatform);
        if (res.uniPlatform == "app" || res.uniPlatform == "web") {
          this_.globalData.usedWindowTop = "44px";
        } else {
          this_.globalData.usedWindowTop = "0px";
        }
      }
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/myhome/knowledge-tree-app/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
