<template>
    <h3>i am children.html</h3>
</template>
<script setup>
import { onMounted } from 'vue'
import JsBridge from '../../components/js/JsWindosBridge'
JsBridge.initJsBridge()
onMounted(()=>{
    const action = {
        type:'login',
        data:{username:'laigt',password:'123456'},
        // 入参无需传值，此参数为通过平台生成
        platform:'children',
        targetPlatform:'brother',
        callbackId:''   
    }

    setTimeout(()=>{
        JsBridge.dispatchParent(action,(res)=>{
            console.error('children res:',res.data.data)
        })
    },2000)
})
</script>