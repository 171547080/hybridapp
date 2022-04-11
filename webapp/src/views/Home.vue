<template>
  <div style="width: 100%">
    <div class="grid-content">
      <grid>
        <grid-item
          class="grid-content-item"
          v-for="(d, i) in list"
          :key="d.text"
          :icon="d.icon"
          :text="d.text"
        />
        <!-- iconColor="#fff" -->
      </grid>
    </div>
    <swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <swipe-item class="sw-item" v-for="(d, i) in images" :key="d.name">
        {{ d.name }}
      </swipe-item>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
      </template>
    </swipe>
    <div @click="pushRouter('product')">搜索</div>
    <div @click="pushRouter('friends')">朋友圈</div>
    <div @click="pushRouter('user')">个人中心</div>
    <div>{{ title }}</div>
    <div>{{ msg }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Swipe, SwipeItem, Grid, GridItem } from "vant";
import "vant/es/Swipe/style/index";
import "vant/es/swipe-item/style/index";
import "vant/es/grid/style/index";
import "vant/es/grid-item/style/index";

import { routerPush } from "../router/routerUtil";

export default defineComponent({
  name: "Home",
  components: {
    Swipe,
    SwipeItem,
    Grid,
    GridItem,
  },

  setup(props, context) {
    const title = ref("首页");
    const msg = ref("开发中");
    const list = ref([
      { icon: "shopping-cart", text: "买车险" },
      { icon: "balance-list", text: "查保单" },
      { icon: "service", text: "办理赔" },
      { icon: "point-gift", text: "用卡卷" },
    ]);
    const images = ref([
      { url: "", name: 1 },
      { url: "", name: 2 },
      { url: "", name: 3 },
      { url: "", name: 4 },
    ]);

    const pushRouter = (name) => {
      routerPush({ name });
    };
    return {
      title,
      msg,
      images,
      list,
      pushRouter,
    };
  },
});
</script>
<style lang="less" scoped>
.router {
  padding: 10px;
  border: #123321 solid 1px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  border-radius: 0 0 0 0;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}

.grid-content {
  margin-top: 10px;

  // .grid-content-item{
  //   // 不生效
  //   // ::v-deep.van-grid-item__content {
  //   //   background-color: #39a9ed;
  //   // }
  // }
  .sw-item {
    color: #fff;
    font-size: 25;
  }
}
</style>
