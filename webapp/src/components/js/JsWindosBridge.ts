// 统一存放回调对象 (存放action回调事件 - addSub)
const callbackMap = new Map()
// ifram节点集合(key iframName)
const iframMap = {}
// 转发没消回调事件集合 (key callbackId)
const dispatchCallback = {}


export interface JsBridgeType {
    dispatch(action: ActionType,callback : Function) : void
    onHandleMessage(event: Event) : void,
    useWindosBridge(window :any , name : string) : void,
    removieWindosBridge(name: string) : void,
}

const getIframByPlatform = (name: string) => {
    return iframMap[name]
}

const checkCallback = (checkCallbackId : string ) => {
    return !!callbackMap.get(checkCallbackId)?true : false
}
// 注册ifram节点
const useWindosBridge = (window,name) => {
    if(!iframMap[name]){
        iframMap[name] = window
    }
}

// 注销ifram节点
const removieWindosBridge = (name) => {
    if(!iframMap[name]){
        delete iframMap[name]
    }
}

// 转发消息并添加转发消息回调函数处理（callbackId）
const dispatchMessage = (action: ActionType) => {
   
    const targetView = getIframByPlatform(action.targetPlatform as string)

    if (!targetView) {
        return
    }

    // JSON化数据
    const json = JSON.stringify(action)

    // Promise确保postMessage函数执行完成
    const p = new Promise((resolve,reject)=>{
      
        if(targetView)targetView.postMessage(json);
        resolve(null)
    }).catch(()=>{})
    
    p.then(()=>{
        // 添加转发消息的回调函数
        addCallbackEvent(action.callbackId as string,action.platform as string)
    })
}

// 添加转发消息回调函数处理事件
const addCallbackEvent = (callbackId:string ,sourcePlatform :string) => {
    callbackMap.set(callbackId,(res)=>{
        const sourceIfram = getIframByPlatform(sourcePlatform)
        const data = {
            callbackId,
            data:res
        }
       
        sourceIfram.postMessage(JSON.stringify(data))
    })
}

// 创建JsBridge对象
export function createJsWindosBridgeBus(){
    
    
    // webView通讯方法，通过此方法发送消息到webView当中，其中webView中需要监听并处理此action，预计等待一个异步的CallbackId message方法
    const dispatch = (action: ActionType, callback: Function) => {
        
        // 获取需要发送消息的平台windos
        const targetView = getIframByPlatform(action.targetPlatform as string)
        if (!targetView) {
            // 如果为空,回调一个异常possMessage-暂未实现
            return
        }

        // 填充一个回调ID
        const callbackId = getCurrentCallbackId()
        action.callbackId = callbackId

        // JSON化数据
        const json = JSON.stringify(action)

        // Promise确保postMessage函数执行完成
        const p = new Promise((resolve,reject)=>{
            // 向子窗口发送postMessage消息
            if(targetView)targetView.postMessage(json);
            resolve(null)
        }).catch(()=>{})
        
        p.then(()=>{
            // 保存完成整个postMessage后的回调自定义函数
            callbackMap.set(callbackId, callback)  
        })
           
    }
 

    // 捕获message方法,统一处理发送的postMessage消息回调数据
    const onBusHandleMessage = (event: any) => {
    
        const data = JSON.parse(event.data)
       
        // 检查CallbackId是否存在，判断是否为回调消息，true-回调，false-转发流程
        if(data.callbackId && checkCallback(data.callbackId)){
            // 回调
            const fn = callbackMap.get(data.callbackId)
            // 执行回调函数
            fn(data)

            // 删除回到函数
            callbackMap.delete(data.callbackId)

        }else{
            // 转发
            data.callbackId = data.callbackId || getCurrentCallbackId()
            // 添加转发消息的回调函数 并 转发消息
            dispatchMessage(data)

        }
    }

    // init初始化onHandleMessage
    const initBus = () => {
        window.addEventListener('message',onBusHandleMessage)
    } 

    // 移除onHandleMessage监听事件
    const removeBusHandleMessage = () =>{
        window.removeEventListener('message',onBusHandleMessage)
    }

    // 创建是,同步监听message事件
    initBus()

    return {
        dispatch,
        onBusHandleMessage,
        useWindosBridge,
        removieWindosBridge,
        removeBusHandleMessage
    }
}


// 客户端
/** DEP_MAP格式
 * { 
 *  add:{  add_10001: addSubCallBack1, add_10002: addSubCallBack2 },
 *  remove : { remove_20001: removeSubCallBack1, remove_20002: removeSubCallBack2 }
 * }
 */
 const DEP_MAP = {}

 export interface ActionType {
     type:String,
     data?:Object,
     // 入参无需传值，此参数为通过平台生成
     platform?:String, 
     // 入参无需传值，此参数为通过平台生成
     targetPlatform?:String, 
     // 入参无需传值，此参数为通过平台生成
     callbackId?:String 
 }
 
 export function initJsBridge() {
     initHandleMessage()
 }
 
 // 获取当前消息发送后的回调ID -- 用户监听消息执行情况
 const getCurrentCallbackId = () => {
     // 12位ID
     const num = 1000000000000
     return ((Math.random() * num) % num + '')
 }
 
 const addDispatchCallback = (callbackId:string,callback: Function) => {
    dispatchCallback[callbackId] = callback
 }
 const removeDispatchCallback = (callbackId:string) => {
     delete dispatchCallback[callbackId]
 }

 const callDispatchCallbackById = (callbackId:string,data:Object) => {
    if(dispatchCallback[callbackId]){
        dispatchCallback[callbackId](data)
        removeDispatchCallback(callbackId)
    }
 }

 const dispatchParent = (action: ActionType, callback: Function) => {
     const callbackId = getCurrentCallbackId()
     action.callbackId = callbackId
     addDispatchCallback(action.callbackId as string,callback)
     
     window.parent.postMessage(JSON.stringify(action))
 }
 
 /**
  * 添加订阅者 +回调事情
  * @param sub 订阅sub类型
  * @param callback 回调函数
  */
 export function addSub(subType, callback) {
     if (!DEP_MAP[subType]) {
         DEP_MAP[subType] = {}
     }
     const subId = getUniqueId(subType)
 
     DEP_MAP[subType][subId] = callback
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
         
         // 发送回调消息（携带callbackId）
         const callBackData = {
             type:action,
             callbackId:callbackId,
             data:result,
             scuess:true
         }
         
         window.parent.postMessage(JSON.stringify(callBackData))
     }
 
 }
 /**
  * 初始化window，添加监听message事件，构建app与h5的通讯桥梁 JsBridge
  */
 const initHandleMessage = () => {
     // 防止多次添加message监听

     if (window.depWindosMessageFn) {
         return
     }
   
     const fn = function (e: any) { 
           
         if(e.data){
             const actionData = (JSON.parse(e.data) as ActionType)
             const action = actionData.type
             const data = actionData.data
             const platform = actionData.platform
             const callbackId = actionData.callbackId
             // notice 发布消息（类型为action）
             callSubs(action, data, platform,callbackId)

             callDispatchCallbackById(callbackId as string,actionData)
         }
         // 处理e.data的异常
     }

     window.addEventListener('message', fn)
     // window添加depMessageFn标准量，
     window.depWindosMessageFn = fn
 }
 
 const JsBridge = {
     dispatchParent,
     initJsBridge,
     addActionCallback :addSub,
     removeActionCallback :removeSub,
     removeAllSub: removeAllSubByVmId
 }
 export default JsBridge
 
 