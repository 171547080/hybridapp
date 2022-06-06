<template>
  <StackFrame ref="stackFrame" @click-right="onHandleClickRight">
    <div>{{ title }}</div>
    <div>{{ text }}</div>
    <div>计算器{{ num }}</div>

    <div>
      <Button size="mini" type="success" @click="startEffect">开始计数器</Button>
      <Button size="mini" type="primary" @click="stopEffect">停止计数器</Button>
    </div>
    <Button size="mini" type="primary" @click="onShowStackFrame">查看头部导航栈</Button>
  </StackFrame>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { Button, Toast } from 'vant'
import "vant/es/toast/style/index";

import StackFrame from "../../components/ifram/StackFrame.vue";

const stackFrame = ref();

const onShowStackFrame = () => {
  console.error(stackFrame.value)
  Toast("查看头部导航栈")
}

const onHandleClickRight = (message) => {
  Toast(message)
}
const title = ref("产品");
const text = ref("开发中");
const num = ref(0)

// 暂时存停止副作用方法
let stopNumEffect = ()=> {}

// 副作用  除了 UI = fn(state) 以外的事情都叫副作用
// 副作用的执行 - 操作dom 副作用的清理[mounted 副作用执行, unMounted 副作用销毁]
const startEffect = () => {
  stopNumEffect = watchEffect((onInvalidate) => {
    const timer = setInterval(() => {
      num.value++
    }, 1000)
    // 副作用清理  组件被卸载时自动执行
    onInvalidate(() => {
      clearInterval(timer)
    });
  });
}

// 手动停止副作用
const stopEffect = () => {
  stopNumEffect()
}
</script>
