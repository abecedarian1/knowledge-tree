"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  name: "ComponentQuickFind",
  data() {
    return {
      // 可使用窗口距离顶部的距离
      usedWindowTop: "0px",
      active: "2",
      tabList: [
        { id: 0, name: "时间选择器" },
        { id: 1, name: "ToDoList" },
        { id: 2, name: "导航栏" },
        { id: 3, name: "图表" },
        { id: 4, name: "深度遍历" },
        { id: 5, name: "全屏" },
        { id: 6, name: "canvas小动画" },
        { id: 7, name: "金额格式化(千分位)" },
        { id: 8, name: "可拖拽移动框(new)" }
      ],
      selectTabIndex: "0",
      /*
      //SideBar组件的内容：
      */
      expandOrNot: false,
      firstLoad: true,
      //组件封装的时候这个怎么让它默认值不允许修改
      navList: [],
      selectItem: null
    };
  },
  methods: {
    //选择组件Tab
    selectTab(index) {
      this.selectTabIndex = index;
    },
    /*
    *SideBar相关内容
    * */
    //生成随机导航数组  并排序 去重
    getRandomDataList() {
      console.log("初次打开导航时调用");
      let list = [];
      for (let i = 0; i < 9; i++) {
        let item = Math.floor(Math.random() * 10);
        list.push(item);
      }
      let len = list.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i; j++) {
          if (list[j] > list[j + 1]) {
            let tmp = list[j];
            list[j] = list[j + 1];
            list[j + 1] = tmp;
          }
        }
      }
      for (let i = len - 1; i >= 0; i--) {
        if (list[i] == list[i - 1]) {
          list.splice(i, 1);
        }
      }
      this.navList = [...list];
    },
    //修改SideBar导航栏的展开/收缩状态
    changeStatus(...args) {
      if (args[0] == "open") {
        if (this.expandOrNot && this.firstLoad) {
          this.getRandomDataList();
          this.firstLoad = false;
        }
      } else {
        if (!this.expandOrNot && this.firstLoad) {
          this.getRandomDataList();
          this.firstLoad = false;
        }
        this.expandOrNot = !this.expandOrNot;
      }
    },
    //修改导航栏的选中内容
    changeItem(val) {
      this.selectItem = val;
    }
  },
  onLoad(option) {
    this.usedWindowTop = getApp().globalData.usedWindowTop;
  },
  mounted() {
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "f99b858e": _ctx.usedWindowTop
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main = __default__;
if (!Array) {
  const _easycom_PubTimeSelectLimit2 = common_vendor.resolveComponent("PubTimeSelectLimit");
  const _easycom_PubToDoList2 = common_vendor.resolveComponent("PubToDoList");
  const _easycom_PubSideBar2 = common_vendor.resolveComponent("PubSideBar");
  const _easycom_PubDiagram2 = common_vendor.resolveComponent("PubDiagram");
  const _easycom_PubDeepCopy2 = common_vendor.resolveComponent("PubDeepCopy");
  const _easycom_PubFullScreen2 = common_vendor.resolveComponent("PubFullScreen");
  const _easycom_PubCanvasAnimation2 = common_vendor.resolveComponent("PubCanvasAnimation");
  const _easycom_PubAmountTransform2 = common_vendor.resolveComponent("PubAmountTransform");
  const _easycom_CommonBar2 = common_vendor.resolveComponent("CommonBar");
  (_easycom_PubTimeSelectLimit2 + _easycom_PubToDoList2 + _easycom_PubSideBar2 + _easycom_PubDiagram2 + _easycom_PubDeepCopy2 + _easycom_PubFullScreen2 + _easycom_PubCanvasAnimation2 + _easycom_PubAmountTransform2 + _easycom_CommonBar2)();
}
const _easycom_PubTimeSelectLimit = () => "../../components/PubTimeSelectLimit/PubTimeSelectLimit.js";
const _easycom_PubToDoList = () => "../../components/PubToDoList/PubToDoList.js";
const _easycom_PubSideBar = () => "../../components/PubSideBar/PubSideBar.js";
const _easycom_PubDiagram = () => "../../components/PubDiagram/PubDiagram.js";
const _easycom_PubDeepCopy = () => "../../components/PubDeepCopy/PubDeepCopy.js";
const _easycom_PubFullScreen = () => "../../components/PubFullScreen/PubFullScreen.js";
const _easycom_PubCanvasAnimation = () => "../../components/PubCanvasAnimation/PubCanvasAnimation.js";
const _easycom_PubAmountTransform = () => "../../components/PubAmountTransform/PubAmountTransform.js";
const _easycom_CommonBar = () => "../../components/CommonBar/CommonBar.js";
if (!Math) {
  (_easycom_PubTimeSelectLimit + _easycom_PubToDoList + _easycom_PubSideBar + _easycom_PubDiagram + _easycom_PubDeepCopy + _easycom_PubFullScreen + _easycom_PubCanvasAnimation + _easycom_PubAmountTransform + _easycom_CommonBar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.tabList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id,
        c: common_vendor.n($data.selectTabIndex == item.id ? "active" : ""),
        d: common_vendor.o(($event) => $options.selectTab(item.id), item.id)
      };
    }),
    b: $data.selectTabIndex == 0
  }, $data.selectTabIndex == 0 ? {} : $data.selectTabIndex == 1 ? {} : $data.selectTabIndex == 2 ? {
    e: common_vendor.o((...args) => $options.changeStatus && $options.changeStatus(...args)),
    f: $data.expandOrNot,
    g: $data.selectItem,
    h: common_vendor.o(($event) => $data.selectItem = $event.detail.value),
    i: common_vendor.sr("sideBarRef", "5913702c-3,5913702c-0"),
    j: common_vendor.o($options.changeStatus),
    k: common_vendor.o($options.changeItem),
    l: common_vendor.p({
      expandOrNot: $data.expandOrNot,
      selectItem: $data.selectItem,
      navList: $data.navList,
      firstLoad: $data.firstLoad
    })
  } : $data.selectTabIndex == 3 ? {} : $data.selectTabIndex == 4 ? {} : $data.selectTabIndex == 5 ? {} : $data.selectTabIndex == 6 ? {} : $data.selectTabIndex == 7 ? {} : {}, {
    c: $data.selectTabIndex == 1,
    d: $data.selectTabIndex == 2,
    m: $data.selectTabIndex == 3,
    n: $data.selectTabIndex == 4,
    o: $data.selectTabIndex == 5,
    p: $data.selectTabIndex == 6,
    q: $data.selectTabIndex == 7,
    r: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/myhome/knowledge-tree-app/pages/component-quick-find/ComponentQuickFind.vue"]]);
wx.createPage(MiniProgramPage);
