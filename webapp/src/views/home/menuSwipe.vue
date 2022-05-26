<template>
    <swipe class="my-swipe" indicator-color="#fa2c19" :touchable="true" :loop="false">
        <swipe-item v-for="(ms, i) in meums" :key="ms.name">
            <div class="meum-warp">
                <li class="meum-item" v-for="(d, i) in ms.meum" :key="ms.name + d.name" >
                    <img class="meum-img" :src="d.img"/>
                    <p class="meum-text">{{ d.text }}</p>
                </li>
            </div>
        </swipe-item>
    </swipe>
</template>
<script>
import { defineComponent, ref } from "vue"
import { Swipe, SwipeItem } from "vant";
import "vant/es/Swipe/style/index";
import "vant/es/swipe-item/style/index";

export default defineComponent({
    name: "adSwipe",
    components: {
        Swipe,
        SwipeItem
    },

    setup(props, context) {
        const meums = ref([
            {
                name: "meun1", meum: [
                    { path: '', img: "/menu/1.png", name: "menu1",text:"超市" },
                    { path: '', img: "/menu/2.png", name: "menu2",text:"数码电器" },
                    { path: '', img: "/menu/3.png", name: "menu3",text:"服饰" },
                    { path: '', img: "/menu/4.png", name: "menu4",text:"生鲜" },
                    { path: '', img: "/menu/5.png", name: "menu5",text:"货物到家" },
                    { path: '', img: "/menu/6.png", name: "menu6",text:"充值缴费" },
                    { path: '', img: "/menu/7.png", name: "menu7",text:"物流查询" },
                    { path: '', img: "/menu/8.png", name: "menu8",text:"领券" },
                    { path: '', img: "/menu/9.png", name: "menu9",text:"领金贴" },
                    { path: '', img: "/menu/10.png", name: "menu10",text:"PLUS会员" },
                ]
            },
            {
                name: "meun2", meum: [
                    { path: '', img: "/menu/11.png", name: "menu11",text:"国际" },
                    { path: '', img: "/menu/12.png", name: "menu12",text:"拍卖"},
                    { path: '', img: "/menu/13.png", name: "menu13",text:"看病" },
                    { path: '', img: "/menu/14.png", name: "menu14",text:"3C" },
                    { path: '', img: "/menu/15.png", name: "menu15",text:"沃尔玛" },
                    { path: '', img: "/menu/16.png", name: "menu16",text:"美妆馆" },
                    { path: '', img: "/menu/17.png", name: "menu17",text:"旅行" },
                    { path: '', img: "/menu/18.png", name: "menu18",text:"二手" },
                    { path: '', img: "/menu/19.png", name: "menu19",text:"潮燃青年" },
                    { path: '', img: "/menu/20.png", name: "menu20",text:"全部" }
                ]
            }
        ]);
        return {
            meums,
        };
    },
});
</script>
<style lang="less" scoped>
.meum-warp{
    margin: 0 .1rem;
}
.meum-item{
    display:inline-block;
    text-align: center;
    height: 5rem;
    width: 20%;

    .meum-text{
        margin: 0;
        font-size: .9rem;
        font-weight: 500;
    }
    .meum-img{
        display: inline-block;
        pointer-events: none;
        width: 50%;
    }
}

</style>

