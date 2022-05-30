<template>
    <h3>i am children2.html</h3>
</template>
<script setup>

import { onMounted } from 'vue'
import JsBridge from '../../components/js/JsWindosBridge'
onMounted(()=>{
    JsBridge.initJsBridge()
    JsBridge.addActionCallback("login",(data,platform)=>{
        console.error("触发login action,platform: " + platform)
        return {success:true,data:data}
    })
})


</script>