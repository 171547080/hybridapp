import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import friends from "./modules/friends";
import user from "./modules/user";
import product from "./modules/product";
import ifram from './modules/ifram'
import { useAppStore } from "../store/app";

const routes = [
  {
    path: "/",
    component: Home,
    redirect: { name: "home" },
    meta: {},
    children: [],
  },
  {
    name: "home",
    path: "/home",
    meta: {
      title: "首页",
      // 取消进入动画flag  true-路由切换关闭进入、退出动画
      cancelTransition: true,
    },
    component: () => import("../views/Home.vue"),
  },
  {
    name: "login",
    path: "/login",
    meta: {
      title: "登录",
    },
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  // hash模式
  history: createWebHashHistory(),
  routes: [...routes, ...user, ...friends, ...product,...ifram],
});

// 全局守卫，添加页面切换的过渡动画效果，配合rout/routerUtil.routerPush使用
router.beforeEach((to, from) => {
  const appStore = useAppStore()
  const virtualTaskStack = appStore.virtualTaskStack

  // 不严谨，虚拟栈中的last为当前路由，last-1为返回路由， 2相等为返回操作
  if(virtualTaskStack && virtualTaskStack.length >1 && to.name === virtualTaskStack[virtualTaskStack.length -2]){
    to.meta.transitionName = "slide-left";
  }

  // 设置默认返回动画
  // to.meta.transitionName = !to.meta.cancelTransition?"slide-left":'';

  if (to.params["routerType"] === "push") {
    appStore.virtualTaskStackPush(to.name)
    to.meta.transitionName = "slide-right";
  }else{
    appStore.virtualTaskStackPop()
  }

  if (to.params.clearTask) {
    appStore.virtualTaskStackClear()
  }
});
export default router;
