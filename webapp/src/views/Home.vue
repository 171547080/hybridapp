<template>
  <IHead></IHead>
  <div class="content-warp" style="width: 100%">
    <div style="height: 1000vh;">
      <AdSwipe></AdSwipe>
      <MenuSwipe></MenuSwipe>
      <div class="grid-content">
        <grid>
          <grid-item class="grid-content-item" v-for="(d, i) in list" :key="d.text" :icon="d.icon" :text="d.text" />
          <!-- iconColor="#fff" -->
        </grid>
      </div>
      <div @click="pushRouter('product')">搜索</div>
      <div @click="pushRouter('friends')">朋友圈</div>
      <div @click="pushRouter('user')">个人中心</div>
      <div>{{ title }}</div>
      <div>{{ msg }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Grid, GridItem } from "vant";
import "vant/es/grid/style/index";
import "vant/es/grid-item/style/index";

import { routerPush } from "../router/routerUtil";

import IHead from '../components/inside/IHead.vue'
import AdSwipe from './home/adSwipe.vue'
import MenuSwipe from './home/menuSwipe.vue'


export default defineComponent({
  name: "Home",
  components: {
    AdSwipe,
    MenuSwipe,
    Grid,
    GridItem,
    IHead
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


    const pushRouter = (name) => {
      routerPush({ name });
    };
    return {
      title,
      msg,
      list,
      pushRouter,
    };
  },
});
</script>
<style lang="less" scoped>
.content-warp {
  margin-top: 5rem;
}

.router {
  padding: 10px;
  border: #123321 solid 1px;
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
