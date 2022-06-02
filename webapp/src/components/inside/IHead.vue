<template>
    <div ref="searchWrapperRef" class="searchWrapper">
        <div class="content">
            <div class="more-btn-box">
                <!-- <Icon name="wap-nav" class="more-btn" @click="handleMore" /> -->
                <Icon name="bars" class="more-btn" @click="handleMore" />
            </div>
            <div class="left-box">
                <img class="img" src="/img/bottomTabs/cat.svg" />
                <img class="img" src="/img/bottomTabs/recommend.svg" />
            </div>
            <div ref="offsetTop" class="offsetTop">
                <div class="search-box-warp">
                    <Search ref="searchRef" class="search-box" shape="round" v-model="searchValue"
                        placeholder="请输入搜索关键词" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { Icon, Search } from 'vant'
import 'vant/es/search/style/index'

const searchValue = ref('')
const searchRef = ref()
const offsetTop = ref()
const searchWrapperRef = ref()

const scrollToTop = (event) => {
    if(window.pageYOffset > 5 ){
        searchWrapperRef.value.style.backgroundColor =  '#e43130'
    }else{
        searchWrapperRef.value.backgroundColor =  '#c82519'
    }
    

    let scrollTop = window.pageYOffset
    const minWidth = 260
    const maxWidth = 360
    const tmp = maxWidth - scrollTop

    const newWidth = tmp >= minWidth ? tmp : minWidth
    // 滚动缩放宽度
    searchRef.value.$el.style.maxWidth = newWidth + "px"

    // 搜索栏向上移动
    const offset = scrollTop - (maxWidth - minWidth)
    autoOffsetTop(offset)


}



const autoOffsetTop = (offset) => {
    const maxTop = 35
    const minTop = 0
    let scrollTop = maxTop - offset

    const maxRight = 10
    const minRight = 0
  
    let offsetRight = scrollTop - (maxTop - minTop)
   
    // 在区间内滚动
    if (minTop <= scrollTop && scrollTop <= maxTop) {
        offsetTop.value.style.marginTop = scrollTop + 'px'
        offsetTop.value.style.paddingRight = (0 - offsetRight) + 'px'
    } else if (scrollTop <= minTop) {
        // 偏移值小于最小值着则使用最小值
        offsetTop.value.style.marginTop = minTop + 'px'
        offsetTop.value.style.paddingRight = (0 - maxRight) + 'px'
    } else if (scrollTop <= maxTop) {
        // 偏移值大于最大值则使用最最值
        offsetTop.value.style.marginTop = maxTop + 'px'

        offsetTop.value.style.paddingRight = (0 - minRight) + 'px'
    }


}

const handleMore = () => {
    console.error("handleMore")
}
onMounted(() => {
    window.addEventListener("scroll", scrollToTop, true);
})

onUnmounted(() => {
    window.removeEventListener("scroll", scrollToTop, true);
})
</script>
<style lang="less" scoped>
@backRed : #c82519;

.searchWrapper {
    // position: -webkit-sticky;
    // position: sticky;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 999;
    background: @backRed;

    .offsetTop {
        margin-top: 2rem;
    }

}



.content {
    padding: .4rem;

    .more-btn-box {
        position: absolute;
        top: .3rem;
        left: .2rem;
    }

    .left-box {
        position: absolute;
        top: .3rem;
        right: .2rem;
        padding-right: .2rem;
        .img {
            height: 2.2rem;
        }
    }
}

.van-icon.more-btn {
    font-size: 2.0rem;
    color: aliceblue;
}

.search-box {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    background: transparent;
}

.search-box-warp {
    display: flex;
    justify-content: center;
    text-align: center;
}
</style>
