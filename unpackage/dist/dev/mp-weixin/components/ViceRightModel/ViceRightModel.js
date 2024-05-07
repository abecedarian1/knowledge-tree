"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "ViceRightModel",
  props: ["mainId", "branchId"],
  data() {
    return {
      modelList: []
    };
  },
  mounted() {
    let baseURL = getApp().globalData.baseURL;
    if (this.mainId && this.branchId) {
      let parentUrl = "";
      common_vendor.index.request({
        url: baseURL + "/modelList?id=" + this.branchId,
        success: (res) => {
          parentUrl = res.data[0].url;
          common_vendor.index.request({
            url: baseURL + "/modelBranchList?parentId=" + this.branchId,
            success: (res2) => {
              let list = res2.data;
              if (list.length > 0) {
                list.forEach((item) => {
                  item.url = parentUrl + "/" + item.url + "?mainId=" + this.mainId + "&branchId=" + this.branchId + "&branchRightId=" + item.id;
                });
                Object.assign(this.modelList, list);
              } else {
                this.modelList.length = 0;
              }
            }
          });
        }
      });
    }
  },
  created() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.modelList.length > 0
  }, $data.modelList.length > 0 ? {
    b: common_vendor.f($data.modelList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: "/pages/web-front/detail-content/ContentList?" + item.url.split("?")[1]
      };
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/myhome/knowledge-tree-app/components/ViceRightModel/ViceRightModel.vue"]]);
wx.createComponent(Component);
