<template>
    <vant-dialog>
        <div class="content">
            <qrcode-vue :value="url" :size="200" level="H" />
        </div>
    </vant-dialog>
</template>
<script setup>
import QrcodeVue from "qrcode.vue"     
import { Dialog } from "vant";
import "vant/es/dialog/style/index";    

const url = 'http://192.168.19.191:8080'
const vantDialog =  Dialog.Component   
  
</script >
<style lang="less" scoped>
.content{
    margin: 10px auto;
    text-align: center;
}
</style>
 
