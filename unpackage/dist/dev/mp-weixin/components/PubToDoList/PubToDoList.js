"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "PubToDoList",
  data() {
    return {
      openEdit: false,
      currenTask: "",
      toDoList: [
        { id: "0", select: false, hidden: false, listName: "任务1" }
      ],
      itemMessage: {
        index: 0,
        itemName: ""
      },
      selectAll: false,
      itemId: 1
    };
  },
  methods: {
    //新增
    addItem() {
      if (this.currenTask) {
        this.toDoList.unshift({ id: String(this.itemId++), select: false, hidden: false, listName: this.currenTask });
        this.currenTask = "";
      }
    },
    //删除
    deleteItem(index) {
      this.toDoList.splice(index, 1);
    },
    //编辑
    editItem(index, item) {
      this.openEdit = true;
      this.itemMessage.itemName = item.listName;
      this.itemMessage.index = index;
    },
    //取消
    cancleEdit() {
      this.openEdit = false;
    },
    //确认提交 
    confirmEdit() {
      this.toDoList[this.itemMessage.index].listName = this.itemMessage.itemName;
      this.openEdit = false;
    },
    //清除
    clear() {
      if (this.toDoList.length > 0) {
        for (let i = this.toDoList.length - 1; i >= 0; i--) {
          if (this.toDoList[i].select == true) {
            this.toDoList.splice(i, 1);
          }
        }
      }
    },
    //隐藏
    hidden() {
      if (this.toDoList.length > 0) {
        this.toDoList.forEach((item, index) => {
          if (item.select == true) {
            item.hidden = true;
          }
        });
      }
    },
    //uni-app的checkBox 需要通过 @change 手动更新“绑定变量”的选中状态————否则数据是否更新监听不到
    //——目前还没有发现其他方法
    checkboxChange(e) {
      let selectValues = e.detail.value, toDoList = this.toDoList;
      for (let i = 0; i < toDoList.length; i++) {
        let item = toDoList[i];
        if (selectValues.includes(item.id)) {
          this.toDoList[i].select = true;
        } else {
          this.toDoList[i].select = false;
        }
      }
    },
    //手动更新“绑定变量”的选中状态 this.selectAll
    checkAllChange(e) {
      let selectValues = e.detail.value;
      if (selectValues.includes("all")) {
        this.selectAll = true;
        this.toDoList.forEach((item) => {
          item.select = true;
        });
      } else {
        this.selectAll = false;
        this.toDoList.forEach((item) => {
          item.select = false;
        });
      }
    }
  },
  computed: {
    selectTotal() {
      let total = 0;
      this.toDoList.length;
      this.toDoList.forEach((item) => {
        if (item.select) {
          total += 1;
        }
      });
      return total;
    }
  },
  watch: {
    //修改selectAll 对照 checkAllChange()
    toDoList: {
      handler(newVal, old) {
        let flag = false;
        if (newVal.length > 0) {
          for (let item of newVal) {
            if (item.select == false) {
              flag = false;
              break;
            } else {
              flag = true;
            }
          }
        } else {
          flag = false;
        }
        this.selectAll = flag;
      },
      deep: true
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.addItem && $options.addItem(...args)),
    b: $data.currenTask,
    c: common_vendor.o(($event) => $data.currenTask = $event.detail.value),
    d: common_vendor.f($data.toDoList, (item, index, i0) => {
      return {
        a: item.id,
        b: item.select,
        c: common_vendor.t(item.listName),
        d: common_vendor.n(item.select ? "deleteItemLine" : ""),
        e: common_vendor.o(($event) => $options.editItem(index, item), index),
        f: common_vendor.o(($event) => $options.deleteItem(index), index),
        g: common_vendor.n(item.hidden ? "hidden" : ""),
        h: index
      };
    }),
    e: common_vendor.o((...args) => $options.checkboxChange && $options.checkboxChange(...args)),
    f: $data.selectAll,
    g: common_vendor.t($options.selectTotal),
    h: common_vendor.t($data.toDoList.length),
    i: common_vendor.o((...args) => $options.clear && $options.clear(...args)),
    j: common_vendor.o((...args) => $options.hidden && $options.hidden(...args)),
    k: common_vendor.o((...args) => $options.checkAllChange && $options.checkAllChange(...args)),
    l: $data.openEdit
  }, $data.openEdit ? {
    m: common_vendor.o((...args) => $options.cancleEdit && $options.cancleEdit(...args)),
    n: $data.itemMessage.itemName,
    o: common_vendor.o(($event) => $data.itemMessage.itemName = $event.detail.value),
    p: common_vendor.o((...args) => $options.cancleEdit && $options.cancleEdit(...args)),
    q: common_vendor.o((...args) => $options.confirmEdit && $options.confirmEdit(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/myhome/knowledge-tree-app/components/PubToDoList/PubToDoList.vue"]]);
wx.createComponent(Component);
