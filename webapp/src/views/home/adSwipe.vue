<template>
    <div class="swipe-bg"> </div>
    <swipe class="my-swipe" :autoplay="3000" indicator-color="#fa2c19" :touchable="true">
        <swipe-item v-for="(d, i) in images" :key="d.name">
            <div class="card sw-item">
                <img class="ad-img" :src="d.img">
            </div>
        </swipe-item>

        <!-- <template #indicator="{ active, total }">
            <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
        </template> -->
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
        const images = ref([
            { path: '', img: "/ad/ad1.jpg", name: "ad1" },
            { path: '', img: "/ad/ad2.jpg", name: "ad2" },
            { path: '', img: "/ad/ad3.jpg", name: "ad3" },
            { path: '', img: "/ad/ad4.jpg", name: "ad4" },
            { path: '', img: "/ad/ad5.jpg", name: "ad5" },
            { path: '', img: "/ad/ad6.jpg", name: "ad6" },
        ]);
        return {
            images,
        };
    },
});
</script>
<style lang="less" scoped>
.my-swipe {
    .sw-item {
        margin-top: .1rem;
        color: #fff;
        font-size: 20px;
        text-align: center;
        border-radius: 5px;
        height: 8rem;
    }

    .ad-img {
        width: 100%;
        overflow: hidden;
        pointer-events: none;
        border-radius: 5px;
    }

    ::v-deep(.van-swipe__indicators) {
        bottom: 3rem;
    }
}

.swipe-bg {
    background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
    position: absolute;
    top: 1.5rem;
    left: -25%;
    height: 7.25rem;
    width: 150%;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
}

.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
}

.card {
    margin: 1rem;
    border-radius: 10px;
}
</style>

