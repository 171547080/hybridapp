<template>
  <div>
    <slot></slot>
  </div>
  <BottomTabs />
</template>
<script setup>
import { ref } from "vue";
import BottomTabs from "./BottomTabs.vue";
</script>