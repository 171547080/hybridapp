<template>
  <div class="stack-warp">
    <NavBar @click-left="onClickLeft" @click-right="onClickRight">
      <template #title>
        <h3>{{title}}</h3>
      </template>
      <template #right>
        <van-icon v-if="!isMobile" name="qr" size="25" class="qr-icon" />
      </template>
      <template #left>
        <van-icon name="arrow-left" :color="'#000'" size="25" />
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
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { routerBack } from "../../router/routerUtil";
import { NavBar } from "vant";
import "vant/es/nav-bar/style/index";
import QRCode from "../QRCode.vue";
import { usePlatformStore } from "@/store";

const router = useRouter();
const text = router.currentRoute.value.meta.title + "";
const title = ref(text);
const isShowQrCode = ref(false);
const platformStore = usePlatformStore();
const { isMobile } = storeToRefs(platformStore);

// 定义emit的触发类型
const emit= defineEmits<{
  (e: 'clickRight', str: string): void
}>()

// 显示隐藏二维码
const qrCodeShow = () => {
  isShowQrCode.value = true;
};

// 路由后退
const onClickLeft = () => {
  goBack()
};

const goBack = ()=>{
  routerBack();
}

// 点击二维码图标
const onClickRight = () => {
  emit('clickRight','点击了右图标') 

  if (!isShowQrCode.value) {
    qrCodeShow();
  }
};

// 通过defineExpose 暴露方法给外部使用（父组件 通过ref.value.XXX调用）
defineExpose({ goBack})

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
.stack-warp {
  width: 100%;
}
</style>
