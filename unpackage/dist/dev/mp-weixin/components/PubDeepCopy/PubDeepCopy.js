"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "PubDeepCopy",
  data() {
    return {
      inputObj: "",
      outputObj: "",
      inputPlaceholder: `输入：{
					name: 'Persons List',
					total_count: 2,
					persons_list: [
					  {
						person_name: 'Tom',
						_gender: '1',
						age_: 37
					  },
					  {
						person_name: 'Rose',
						_gender: '0',
						age_: 18
					  }
					]
				 }`,
      outputPlaceholder: `输出：{
					name: 'Persons List',
					totalCount: 2,
					personsList: [
					  {
						personName: 'Tom',
						gender: '1',
						age: 37
					  },
					  {
						personName: 'Rose',
						gender: '0',
						age: 18
					  }
					]
				}`
    };
  },
  methods: {
    returnResut() {
      if (this.inputObj) {
        let obj = eval("(" + this.inputObj + ")");
        this.loopBody(obj);
        this.outputObj = JSON.stringify(obj);
      } else {
        this.outputObj = "";
      }
    },
    //判断'_'的个数，并依次转换
    transformToUpcase(arrList) {
      let targetIndex = arrList.indexOf("_");
      let lastIndex = arrList.lastIndexOf("_");
      let len = arrList.length - 1;
      if (targetIndex !== -1) {
        if (targetIndex == 0) {
          arrList.shift();
        } else if (targetIndex == len) {
          arrList.pop();
        } else {
          arrList[targetIndex + 1] = arrList[targetIndex + 1].toUpperCase();
          arrList.splice(targetIndex, 1);
        }
        if (targetIndex !== lastIndex) {
          return this.transformToUpcase(arrList);
        } else {
          let result = arrList.join("");
          return result;
        }
      } else {
        return "";
      }
    },
    //处理数据内容
    loopBody(obj2) {
      Object.keys(obj2).forEach((item) => {
        let current = item;
        let strItem = Array.from(item);
        let result = this.transformToUpcase(strItem);
        if (result) {
          current = result;
          obj2[result] = obj2[item];
          delete obj2[item];
        }
        if (typeof obj2[current] == "object") {
          loopBody(obj2[current]);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.inputPlaceholder,
    b: common_vendor.o((...args) => $options.returnResut && $options.returnResut(...args)),
    c: $data.inputObj,
    d: common_vendor.o(($event) => $data.inputObj = $event.detail.value),
    e: $data.outputPlaceholder,
    f: $data.outputObj,
    g: common_vendor.o(($event) => $data.outputObj = $event.detail.value)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/myhome/knowledge-tree-app/components/PubDeepCopy/PubDeepCopy.vue"]]);
wx.createComponent(Component);
