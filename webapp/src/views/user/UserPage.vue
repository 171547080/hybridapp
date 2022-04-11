<template>
  <StackFrame>
    <div>{{ title }}</div>
    <div>{{ text }}</div>
  </StackFrame>
</template>

<script setup>
import { ref } from "vue";
import StackFrame from "../../components/ifram/StackFrame.vue";
const title = ref("个人中心");
const text = ref("开发中");
</script>
