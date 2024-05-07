"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "ContentList",
  data() {
    return {
      contentList: [],
      titleName: "",
      modelTitle: "",
      sideBarList: [],
      id: "",
      detailContent: "",
      contentTitle: "",
      branchId: ""
    };
  },
  onLoad(option) {
    let baseURL = getApp().globalData.baseURL;
    let { mainId, branchId, branchRightId, id } = { ...option };
    let parentUrl = "";
    this.id = id;
    this.branchId = branchId;
    common_vendor.index.request({
      url: baseURL + "/getKnowledgeCategory?id=" + mainId,
      success: (res) => {
        this.titleName = res.data[0].name;
        common_vendor.index.request({
          url: baseURL + "/modelList?parentId=" + mainId,
          success: (res2) => {
            let list = res2.data;
            list.forEach((item) => {
              item.url = "/" + item.url + "?mainId=" + mainId + "&branchId=" + item.id;
            });
            this.sideBarList = Object.assign({}, list);
          }
        });
      }
    });
    common_vendor.index.request({
      url: baseURL + "/modelBranchList?id=" + branchRightId,
      success: (res) => {
        parentUrl = res.data[0].url;
        this.modelTitle = res.data[0].name;
        common_vendor.index.request({
          url: baseURL + "/contentList?parentId=" + branchRightId,
          success: (res2) => {
            let list = [];
            if (res2.data) {
              list = res2.data;
            }
            list.forEach((item) => {
              item.url = parentUrl + "/" + item.url + "?mainId=" + mainId + "&branchId=" + branchId + "&branchRightId=" + branchRightId + "&id=" + item.id;
            });
            this.contentList = Object.assign({}, list);
          }
        });
      }
    });
    if (id) {
      common_vendor.index.request({
        url: baseURL + "/content?id=" + id,
        success: (res) => {
          this.detailContent = res.data.content;
        }
      });
      common_vendor.index.request({
        url: baseURL + "/contentList?id=" + id,
        success: (res) => {
          this.contentTitle = res.data[0].name;
        }
      });
    }
  },
  mounted() {
  }
};
if (!Array) {
  const _easycom_ModelCategoryShow2 = common_vendor.resolveComponent("ModelCategoryShow");
  _easycom_ModelCategoryShow2();
}
const _easycom_ModelCategoryShow = () => "../../../components/ModelCategoryShow/ModelCategoryShow2.js";
if (!Math) {
  _easycom_ModelCategoryShow();
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
    c: common_vendor.t($data.modelTitle),
    d: $data.id
  }, $data.id ? {
    e: common_vendor.t($data.contentTitle),
    f: $data.detailContent
  } : {
    g: common_vendor.f($data.contentList, (item, index, i0) => {
      return {
        a: common_vendor.t(Number(index) + 1 + ". " + item.name),
        b: "/pages/web-front/detail-content/ContentList?" + item.url.split("?")[1],
        c: index
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/myhome/knowledge-tree-app/pages/web-front/detail-content/ContentList.vue"]]);
wx.createPage(MiniProgramPage);
