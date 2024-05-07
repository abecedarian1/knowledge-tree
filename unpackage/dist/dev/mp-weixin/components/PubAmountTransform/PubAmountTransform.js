"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "PubAmountTransform",
  data() {
    return {
      inputNum: "0",
      resultNum: "0"
    };
  },
  methods: {
    numTransform() {
      if (this.inputNum) {
        if (/^[1-9][0-9]*[.]?[0-9]*$/.test(this.inputNum)) {
          let intPartArr = Array.from(this.inputNum.split(".")[0]);
          let dotPart = this.inputNum.split(".")[1];
          if (intPartArr.length > 3) {
            let len = intPartArr.length - 1;
            let flag = 1;
            for (let i = len; i >= 0; i--) {
              if (flag % 3 == 0 & i != 0) {
                intPartArr.splice(i, 0, ",");
              }
              flag++;
            }
          }
          let intParStr = intPartArr.join("");
          if (dotPart) {
            this.resultNum = intParStr + "." + dotPart;
          } else {
            this.resultNum = intParStr;
          }
        } else {
          this.resultNum = "0";
          this.inputNum = "0";
        }
      } else {
        this.inputNum = "0";
        this.resultNum = "0";
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.numTransform()),
    b: $data.inputNum,
    c: common_vendor.o(($event) => $data.inputNum = $event.detail.value),
    d: $data.resultNum,
    e: common_vendor.o(($event) => $data.resultNum = $event.detail.value)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/myhome/knowledge-tree-app/components/PubAmountTransform/PubAmountTransform.vue"]]);
wx.createComponent(Component);
