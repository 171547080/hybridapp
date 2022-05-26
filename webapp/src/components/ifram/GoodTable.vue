<template>
    <div class="goods-table">
        <slot :item="width"></slot>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  item: {
    type:Number, // 参数类型
    default: 2, //默认值
    required: false, //是否必传
  }
})
const width = ref(props.item)
</script>
<style lang="less" scoped>
.goods-table{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>