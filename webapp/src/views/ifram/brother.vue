<template>
    <h3>i am brother.html</h3>
    <div>
       <p> {{ username }} </p>
       <p> {{ passowrd }} </p>
    </div>
</template>
<script lang="ts" setup>

import { onMounted,ref,onUnmounted } from 'vue'
import JsBridgeClient from '../../components/js/JsBridge/JsBridgeClient'
const username = ref("username")
const passowrd = ref("password")
let unwacthLoginCallback:Function
let unwacthLoginCallback2:Function
JsBridgeClient.initJsBridge()

onMounted(()=>{
    unwacthLoginCallback = JsBridgeClient.watchAction("login",(data,platform)=>{
        console.error("brother - unwacthLoginCallback",data)
        username.value = data.username  || username.value
        passowrd.value = data.passowrd  || passowrd.value
        return {success:true,data:data}
    })

    unwacthLoginCallback2 = JsBridgeClient.watchAction("login",(data,platform)=>{
        console.error("brother - unwacthLoginCallback2",data)
        username.value = data.username  || username.value
        passowrd.value = data.passowrd  || passowrd.value
        return {success:true,data:data}
    })
})

onUnmounted(()=>{
    unwacthLoginCallback()
    unwacthLoginCallback2()
})
</script>