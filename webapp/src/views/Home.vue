<template>
  <IHead></IHead>
  <div class="content-warp" style="width: 100%">
    <div class="content">
      <AdSwipe></AdSwipe>
      <MenuSwipe></MenuSwipe>
      <Cardx class="ad">
        <img class="adImg" :src="adImg">
      </Cardx>
      <div class="grid-content">
        <grid>
          <grid-item class="grid-content-item" v-for="d in list" :key="d.text" :icon="d.icon" :text="d.text" />
          <!-- iconColor="#fff" -->
        </grid>
      </div>
      <div class="goods-list">
        <GoodTable>
          <GoodTableItem v-for="good in goods" 
            :key="good.id"
            :info="good">
          </GoodTableItem>
        </GoodTable>
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
import Cardx from '../components/ifram/Cardx.vue'
import GoodTableItem from '../components/ifram/GoodTableItem.vue'
import GoodTable from '../components/ifram/GoodTable.vue'
export default defineComponent({
  name: "Home",
  components: {
    AdSwipe,
    MenuSwipe,
    Grid,
    GridItem,
    IHead,
    Cardx,
    GoodTable,
    GoodTableItem
  },

  setup(props, context) {
    const title = ref("首页");
    const msg = ref("开发中");
    const adImg = ref("/ad/618.webp");

    const list = ref([
      { icon: "shopping-cart", text: "买车险" },
      { icon: "balance-list", text: "查保单" },
      { icon: "service", text: "办理赔" },
      { icon: "point-gift", text: "用卡卷" },
    ]);

    const goods = ref([
      {id:'1',img:'/goods/1.webp',name:'闪迪sandisk内存卡class10存储sd卡 高速行车记录仪tf卡 手机内存卡 128G 120M/s A1Class10 TF卡',icon:'/goods/icon/hot.svg',remark:'近期购买用户过千'},
      {id:'2',img:'/goods/2.webp',name:'苏泊尔（SUPOR）电饭煲电饭锅4L陶晶不粘内胆2-6人微压焖香蛋糕功能家用智能电饭煲巧克力色40FC829D ',icon:'/goods/icon/new_1.svg'},
      {id:'3',img:'/goods/1.webp',name:'闪迪sandisk内存卡class10存储sd卡 高速行车记录仪tf卡 手机内存卡 128G 120M/s A1Class10 TF卡',icon:'/goods/icon/new_2.svg',remark:'大家说 "物流快速' },
      {id:'4',img:'/goods/2.webp',name:'苏泊尔（SUPOR）电饭煲电饭锅4L陶晶不粘内胆2-6人微压焖香蛋糕功能家用智能电饭煲巧克力色40FC829D ',icon:'/goods/icon/one.svg',remark:'回头客上千'},
      {id:'5',img:'/goods/1.webp',name:'闪迪sandisk内存卡class10存储sd卡 高速行车记录仪tf卡 手机内存卡 128G 120M/s A1Class10 TF卡',icon:'/goods/icon/recommend.svg'},
      {id:'6',img:'/goods/2.webp',name:'苏泊尔（SUPOR）电饭煲电饭锅4L陶晶不粘内胆2-6人微压焖香蛋糕功能家用智能电饭煲巧克力色40FC829D ',icon:'/goods/icon/sale.svg',remark:'近7天商品热销'},
      {id:'7',img:'/goods/1.webp',name:'闪迪sandisk内存卡class10存储sd卡 高速行车记录仪tf卡 手机内存卡 128G 120M/s A1Class10 TF卡',icon:'/goods/icon/new_2.svg'},
      {id:'8',img:'/goods/2.webp',name:'苏泊尔（SUPOR）电饭煲电饭锅4L陶晶不粘内胆2-6人微压焖香蛋糕功能家用智能电饭煲巧克力色40FC829D ',icon:''}
    ])

    const pushRouter = (name) => {
      routerPush({ name });
    };
    return {
      title,
      msg,
      list,
      adImg,
      goods,
      pushRouter,
    };
  },
});
</script>
<style lang="less" scoped>
.ad{
  margin: -0.5rem 0 .1rem 0;
  border-radius: 5px;
  text-align: center;
  .adImg{
    width: 100%;
    pointer-events: none;
    border-radius: 5px;
  }
}

.content-warp {
  margin-top: 5rem;
  .content{
    height: 1000vh;
    padding: 0 0.5rem;
  }
}

.router {
  padding: 10px;
  border: #123321 solid 1px;
}

.grid-content {
  margin: 0.5rem 0 0.1rem 0;

  // .grid-content-item{
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
