<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default  defineComponent({
  name: "Cardx",
  components: {},

  setup(props, context) {
    return {};
  },
});
</script>

<style lang="less" scoped>
.card{
    background: white;
    border-radius: 5px;
    padding: .5rem;
}
</style>