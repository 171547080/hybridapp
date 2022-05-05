<template>
  <OuterFrame>
    <router-view v-slot="{ Component, route }" class="Router">
      <transition :name="route.meta.transitionName">
        <keep-alive :include="appStore.virtualTaskStack">
          <component :is="Component" />
        </keep-alive >
      </transition>
    </router-view>
  </OuterFrame>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import OuterFrame from "./components/ifram/OuterFrame.vue";
import { usePlatformStore } from "./store/platform";
import { useAppStore } from "./store/app";
import { storeToRefs } from 'pinia'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";
import { Notify } from 'vant';
import "vant/es/Notify/style/index";

const platformStore = usePlatformStore()
const appStore = useAppStore()

platformStore.isIphoneX = window.isIphoneX

console.error(window)
const data = {'username':'laigt','password':'123456'}
window.postMessage(JSON.stringify(data),window.origin)


// `isIphoneX`是响应式的
// 插件增加的属性也会创建ref
// 但是会自动跳过action或者不是响应性的属性
const { isIphoneX } = storeToRefs(platformStore)

const route = useRoute();
watch(
  () => route.fullPath,
  (n, o) => {
    console.log("监听路由");
    console.log("new:" + n + ",old:" + o);
    console.error("APP",route)
    const data = {'username':'laigt','password':'123456'}
    if(window && window.postMessage){
      window.postMessage(JSON.stringify(data),window.origin)  
    }
    Notify({ type: 'success', message: window.origin })
  }
);

// 检查浏览器数据，是否为移动设备
platformStore.checkPlatform();
</script>
<style lang="less" scoped>
.Router {
  position: absolute;
  height: 100%;
  transition: all 0.377s ease;
  will-change: transform;
  top: 0;
  backface-visibility: hidden;
  perspective: 1000;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
