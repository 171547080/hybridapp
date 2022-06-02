<template>
  <OuterFrame>
    <router-view v-slot="{ Component, route }" class="Router">
      <transition :name="route.meta.transitionName">
        <keep-alive :include="appStore.virtualTaskStack">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </OuterFrame>
</template>
<script setup>
import OuterFrame from "./components/ifram/OuterFrame.vue";
import userApi from "@api/user"
import { usePlatformStore,useAppStore,useUserStore } from "@/store";
import { storeToRefs } from 'pinia'
import JsBridge from './components/js/JsBridgeWebView'
import "vant/es/Notify/style/index";


// 初始化JsBrige
JsBridge.initJsBridge()

// 添加login回调函数 - rn发送消息给h5  h5添加事件的监听与处理(捕获login事件,执行fn回调 data-传参 platform-消息来至的平台)
JsBridge.addActionCallback('login', (data,platform) => {
  // alert("app login info: "+JSON.stringify(data) + 'platform: ' + platform)
  return {info:"i am h5,callback message success"}
})


const platformStore = usePlatformStore()
const appStore = useAppStore()

// 检查浏览器数据，是否为移动设备
platformStore.checkPlatform();

platformStore.isIphoneX = window.isIphoneX
// `isIphoneX`是响应式的
// 插件增加的属性也会创建ref
// 但是会自动跳过action或者不是响应性的属性
const { isIphoneX } = storeToRefs(platformStore)

//检查登录信息
// useUserStore().checkLogin();

// 模拟登录
useUserStore().login("laigt",'123456')


//  h5 传参给 rn
// const data = { 'username': 'laigt', 'password': '123456' }
// window.postMessage(JSON.stringify(data), window.origin)


/*
  监听路由切换
const route = useRoute();
watch(
  () => route.fullPath,
  (n, o) => {
    console.log("监听路由");
    console.log("new:" + n + ",old:" + o);
    console.error("APP", route)
    const data = { 'username': 'laigt', 'password': '123456' }
    if (window && window.postMessage) {
      window.postMessage(JSON.stringify(data), window.origin)
    }
    Notify({ type: 'success', message: window.origin })
  }
);
*/



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
