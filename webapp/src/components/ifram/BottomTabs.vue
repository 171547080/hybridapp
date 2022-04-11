<template>
  <tabbar v-model="active" @change="onChange">
    <tabbar-item v-for="(d, i) in tabs" :key="'tab_' + d.name" :icon="d.icon"
      >{{ d.text }}
    </tabbar-item>
  </tabbar>
</template>
<script setup>
import { Tabbar, TabbarItem } from "vant";
import "vant/es/Tabbar/style/index";
import "vant/es/tabbar-item/style/index";
import { ref } from "vue";
import { routerPush } from "../../router/routerUtil";

const active = ref(0);

const tabs = ref([
  { name: "home", icon: "home-o", path: "/home", text: "首页" },
  { name: "product", icon: "search", path: "/search", text: "搜索" },
  { name: "friends", icon: "friends-o", path: "/friends", text: "朋友圈" },
  { name: "user", icon: "setting-o", path: "/setting", text: "个人设置" },
]);

const onChange = (i) => {
  const current = (tabs.value || {})[i];
  if (current && current.name) {
    routerPush(current.name);
  }
};
</script>

<style lang="less" scpoed></style>
