import { ActionType } from './ActionType' 
import { getCurrentCallbackId } from './util'
// 转发没消回调事件集合 (key callbackId)
// 目前时全局公用
const dispatchCallback = {}

let currentPlatform:string = ''

const DEP_MAP = {}

 // 初始化JsBridge工具
 export function initJsBridge() {
     initHandleMessage()
 }
 
 // 预设的当前平台配置项
 const getCurrentPlatform = () => {
     return currentPlatform
 }
 // 预设配置当前平台
 const setCurrentPlatform = (platform) => {
    currentPlatform = platform 
 }

 // 添加消息转发的回调监听 - JsBridge内部监听转发消息的放回
 const addDispatchCallback = (callbackId:string,callback: Function) => {
    dispatchCallback[callbackId] = callback
 }

 // 移除消息转发的回调监听 - 单次消息发送完成
 const removeDispatchCallback = (callbackId:string) => {
     delete dispatchCallback[callbackId]
 }

 // 执行消息转发回调函数
 const callDispatchCallback = (action:ActionType) : boolean => {
    // 通过 callbackId 获取回调函数
    const callbackId = action.callbackId as string
    if(callbackId && dispatchCallback[callbackId]){
        dispatchCallback[callbackId](action)
        removeDispatchCallback(callbackId)
        if(action.error){
            console.error(action.error.message || action.error.errorCode || '消息发送异常')
        }
        return true
    }
    return false
 }

 
 // 发送消息给父级的JsBridgeBus
 const messageJsBridgeBus = (action :ActionType)=> {
    if(!window.parent){
        console.error("当前window无parent对象,不能进行消息发送")
    }
    window.parent.postMessage(JSON.stringify(action))
 }

 /**
  * 添加订阅者  +  回调事件
  * @param sub 订阅sub类型
  * @param callback 回调函数
  * @return fn - 返回取消监听方法
  */
 export function addSub(subType, callback) :Function{
     if (!DEP_MAP[subType]) {
         DEP_MAP[subType] = {}
     }
     const subId = getUniqueId(subType)
 
     DEP_MAP[subType][subId] = callback

     const fn = () => {
        removeSub(subType,subId)
     }
     return  fn
 }
 
 /**
  * 移除订阅者以及相关回调函数
  * @param subType 
  * @param subId 
  */
 export function removeSub(subType, subId) {
     if (DEP_MAP[subType][subId]) {
         delete DEP_MAP[subType][subId]
     }
 }
 
 function removeAllSubByVmId(vmId){
 
 }
 
 const getUniqueId = (subType, numLength = 10) => {
     const maxCall = 100
     let numCall = 0
     const num = 10 ** numLength
 
     let randomID = subType + '_' + (Math.random() * num) % num
 
     while (numCall <= maxCall && DEP_MAP[subType] && !DEP_MAP[subType][randomID]) {
         randomID = subType + '_' + (Math.random() * num) % num
         numCall++ 
     }
 
     return randomID
 }

 /**
  * 响应action事件，设置action.success = true 表示已成功接收action事件
  * @param action 
  */
 const responseBusMessage = (action : ActionType) => {
    action.success = true
    messageJsBridgeBus(action)
 }

 /**
  * 发布订阅消息，触发所有订阅者的action回调函数
  * @param action sub名称
  * @param data 数据
  * @param platform // 触发事件的初始的平台
  */
 const callSubs = function (action, data, platform,callbackId) {
     // sub 是一个包含回调函数的map    key-subId-唯一id   value-callBack-回调函数
     const subs = DEP_MAP[action]
     // 这里要获取vm
     const vm = null
     for (let subId in subs) {
         const result = subs[subId].call(vm,data,platform)
         
         /* 
          考虑是否开启
          每个订阅者将处理数据发送给bus

          发送回调消息（携带callbackId）
         const callBackData = {
             type:action,
             callbackId:callbackId,
             data:result,
             scuess:true
         }
         
         window.parent.postMessage(JSON.stringify(callBackData))
         */
     }
 
 }
 const notify = (action: ActionType) => {
    callSubs(action.type, action.data, action.platform,action.callbackId)
 }
 /**
  * 初始化window，添加监听message事件，构建windos的通讯桥梁 JsBridge
  */
 const initHandleMessage = () => {
     // 防止多次添加message监听

     if (window.depWindosMessageFn) {
         return
     }
   
     const fn = function (e: any) { 
           
         if(e.data){
             const action = (JSON.parse(e.data) as ActionType)
          
             const callbackId = action.callbackId as string

            // 如果callbackId存在此对象中,着返回当前为响应消息   （接受本身发送dispatchAction方法的相应消息）
            if(callbackId && dispatchCallback[callbackId]){
                callDispatchCallback(action)
            }else{
                // 监听action.type事件

                // notify 发布消息，并通知所有订阅者执行订阅方法
                notify(action)

                // 响应bus,已成功接收消息        
                responseBusMessage(action)
            }    

         }
         // 处理e.data的异常
     }

     window.addEventListener('message', fn)
     // window添加depMessageFn标准量，
     window.depWindosMessageFn = fn
 }
 
  // 发布Action消息
  const dispatchAction = (action: ActionType, callback: Function) => {
    const callbackId = getCurrentCallbackId()
    if(!action.platform){
        action.platform = getCurrentPlatform()
    }

    action.callbackId = callbackId
    addDispatchCallback(action.callbackId as string,callback)
    
    messageJsBridgeBus(action)
}
 const JsBridgeClient = {
     dispatchAction,
     initJsBridge,
     setCurrentPlatform,
     getCurrentPlatform,
     watchAction :addSub,
     unwatchAction :removeSub,
     unwatchAllAction: removeAllSubByVmId,
    
 }
 export default JsBridgeClient