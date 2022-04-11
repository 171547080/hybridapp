<template>
    <div>{{ title }}</div>
    <div>{{ text }}</div>
</template>

<script setup>
import { ref } from "vue"
const title = ref("社交")
const text = ref("开发中")


</script>