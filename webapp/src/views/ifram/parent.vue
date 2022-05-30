<template>
    <div>
        <h3>i am parent.html</h3>
    </div>
    <iframe ref="children"  src="http://192.168.19.13:8080/#/ifram/children" name="children">
    </iframe>
     <iframe ref="brother" src="http://192.168.19.13:8080/#/ifram/brother" name="brother">
    </iframe>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { createJsWindosBridge } from '../../components/js/jsWindosBridge'
const getIframByName = (name) => {
   return window.frames[name]
}
const children = ref(null)
const brother = ref(null)
onMounted(()=>{
    
    const JsWindosBridgeBus = createJsWindosBridgeBus()
    JsWindosBridgeBus.useWindosBridge(getIframByName('children'),'children')
    JsWindosBridgeBus.useWindosBridge(getIframByName('brother'),'brother')
    getIframByName('brother').postMessage(JSON.stringify({message:"getIframByName hello"}))
    console.error('brother message')
   
})

</script>