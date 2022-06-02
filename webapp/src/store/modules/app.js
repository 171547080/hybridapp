import { defineStore, acceptHMRUpdate } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    virtualTaskStack: ['home'],
  }),

  actions: {
    virtualTaskStackPush(name) {
      this.virtualTaskStack.push(name);
    },
    virtualTaskStackPop() {
      // "首页无法退出暂内"
      if(this.virtualTaskStack.length > 1){
        this.virtualTaskStack.pop();
      }
    },
    virtualTaskStackClear() {
      this.virtualTaskStack = ['home'];
    },
  },
});
