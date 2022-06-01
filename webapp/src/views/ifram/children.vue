<template>
    <h3>i am children.html</h3>
    <p> {{ username }} </p>
    <p> {{ passowrd }} </p>
</template>
<script lang="ts" setup>
import { onMounted,ref } from 'vue'
import JsBridgeClient from '../../components/js/JsBridge/JsBridgeClient'

const username = ref("username")
const passowrd = ref("password")
let unwacthLoginCallback:Function

JsBridgeClient.initJsBridge()

unwacthLoginCallback = JsBridgeClient.watchAction("login",(data,platform)=>{
    console.error("children - unwacthLoginCallback",data)
    username.value = data.username  || username.value
    passowrd.value = data.passowrd  || passowrd.value
    return {success:true,data:data}
})

onMounted(()=>{
    const aloginAction = {
        type:'login',
        data:{username:'laigt',password:'123456'},
        // 入参无需传值，此参数为通过平台生成
        platform:'children',
        targetPlatform:'brother',
        callbackId:''   
    }

    setTimeout(()=>{
        // 转发消息后,等待回调（可能会有多个回调？）
        JsBridgeClient.dispatchAction(aloginAction,(res)=>{
            console.error('children aloginAction res:success',res.success)
        })
    },2000)
    

    // 测试未注册的windows
    const mockAction = {
        type:'login',
        data:{username:'laigt',password:'123456'},
        // 入参无需传值，此参数为通过平台生成
        platform:'children',
        targetPlatform:'mock',
        callbackId:''   
    }

    setTimeout(()=>{
        // 转发消息后,等待回调（可能会有多个回调？）
        JsBridgeClient.dispatchAction(mockAction,(res)=>{
            console.error('children mockAction res:success',res.success)
        })
    },2000)
})
</script>