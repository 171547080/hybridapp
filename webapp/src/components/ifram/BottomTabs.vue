<template>
  <tabbar v-model="active" @change="onChange">
    <tabbar-item v-for="(d, i) in tabs" :key="'tab_' + d.name">
      {{ d.text }}
      <template #icon>
        <img class="svg-icon" :src="d.img">
      </template>
    </tabbar-item>
  </tabbar>
</template>
<script setup>
import { Tabbar, TabbarItem } from "vant";
import "vant/es/Tabbar/style/index";
import "vant/es/tabbar-item/style/index";
import { ref,onMounted } from "vue";
import { routerPush } from "../../router/routerUtil";
import { useRouter,useRoute } from "vue-router";


const tabs = ref([
  { name: "product", icon: "search", path: "/search", text: "搜索", img: '/img/bottomTabs/shop.svg' },
  { name: "friends", icon: "friends-o", path: "/friends", text: "中心", img: '/img/bottomTabs/game.svg' },
  { name: "home", icon: "home-o", path: "/home", text: "首页", img: '/img/bottomTabs/home.svg' },
  { name: "user", icon: "setting-o", path: "/setting", text: "朋友", img: '/img/bottomTabs/server.svg' },
   { name: "user", icon: "setting-o", path: "/setting", text: "个人设置", img: '/img/bottomTabs/user.svg' },
]);

// 初始化tab
// router.currentRoute 一直为 path = [/] 的节点
const router = useRouter();
const route = useRoute();

// hash模式
const currentTabName = router.currentRoute.value.name || window.location.hash.substring(2) ||'home'
let currentTabIndex = 0
tabs.value.forEach((d,i)=>{
    if(d.name === currentTabName){
      currentTabIndex = i
    }
})

const active = ref(0);

const onChange = (i) => {
  const current = (tabs.value || {})[i];
  if (current && current.name) {
    routerPush(current.name);
  }
};
</script>

<style lang="less" scpoed>
.van-tabbar-item__icon .svg-icon{
  height: 1.7rem;
  transition:height .3s;
}
.van-tabbar-item--active .svg-icon{
  height: 2.5rem;
}
.van-tabbar{
  height: 4.5rem;
}
</style>
