<template>
  <div class="stack-warp">
    <NavBar
      :title="title"
      left-text="返回"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
    >
      <template #right>
        <van-icon v-if="!isMobile" name="qr" size="25" class="qr-icon" />
      </template>
    </NavBar>
    <QRCode
      v-if="!isMobile"
      v-model:show="isShowQrCode"
      title="扫描二维码"
    ></QRCode>
    <div>
      <slot></slot>
    </div>
  </div >
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { onBeforeRouteUpdate,useRouter, useRoute } from "vue-router";
import { routerBack } from "../../router/routerUtil";
import { NavBar } from "vant";
import "vant/es/nav-bar/style/index";
import QRCode from "../QRCode.vue";
import { usePlatformStore } from "../../store/platform";

const router = useRouter();
const text = router.currentRoute.value.meta.title + '';
const title = ref(text);
const isShowQrCode = ref(false);
const platformStore = usePlatformStore();
const { isMobile } = storeToRefs(platformStore);

// 显示隐藏二维码
const qrCodeShow = () => {
  isShowQrCode.value = true;
};

// 路由后退
const onClickLeft = () => {
  routerBack()
};

// 点击二维码图标
const onClickRight = () => {
  console.error("onClickRight");
  if (!isShowQrCode.value) {
    qrCodeShow();
  }
};
</script>

<style lang="less" scpoed>
.van-nav-bar {
  .qr-icon {
    color: black;
  }
  .qr-icon::hover {
    color: aqua;
  }
}
.stack-warp{
  width: 100%;
}
</style>
