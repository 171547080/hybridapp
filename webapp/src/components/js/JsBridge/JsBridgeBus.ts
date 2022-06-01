import { ActionType } from './ActionType' 
import { getCurrentCallbackId } from './util'

// 统一存放回调对象 (存放action回调事件 - addSub)
const callbackMap = new Map()
// ifram节点集合(key iframName)
const iframMap = {}

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

/**
 * 注册ifram节点
 * @param window  ifram窗口对象
 * @param name    ifram名称
 * @returns name  ifram名称，用于注销注册
 */
const useWindosBridge = (window,name) :string => {
    if(!iframMap[name]){
        iframMap[name] = window
    }
    return name
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
        const sourcePlatform = getIframByPlatform(action.platform as string)

        
        if(sourcePlatform){
            const errorAction = action

            errorAction.success = false
            errorAction.error = {
                errorCode : '1001',
                message : `platform (${action.platform}) is not registered `
            }

            const errorStr = JSON.stringify(errorAction)
            sourcePlatform.postMessage(errorStr)
        }
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
        
        sourceIfram.postMessage(JSON.stringify(res))
    })
}

// 创建JsBridge对象
export function createJsWindosBridgeBus(){
    
    
    // webView通讯方法，通过此方法发送消息到webView当中，其中webView中需要监听并处理此action，预计等待一个异步的CallbackId message方法
    const dispatch = (action: ActionType, callback: Function) => {
        
        // 获取需要发送消息的平台windos
        const targetView = getIframByPlatform(action.targetPlatform as string)
        if (!targetView) {
            // 问题二： 目标为注册,回调一个异常possMessage-暂未实现
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
            // 1.问题:计划创建一个定时任务，解决超时问题

            // 保存完成整个postMessage后的回调自定义函数
            callbackMap.set(callbackId, callback)  
        })
           
    }
 

    // 捕获message方法,统一处理发送的postMessage消息回调数据 - JsWindosBridgeBus 监听消息转发的入口
    const onBusHandleMessage = (event: any) => {
    
        const data = JSON.parse(event.data) as ActionType
       
        // 检查JsWindosBridgeBus是否存在此回调方法（处理回调时，bus中会存在此callbackId）data.succes - 响应消息成功，true-处理回调，false-进入转发流程
        if(data.callbackId && checkCallback(data.callbackId as string) && data.success){
            
            const fn = callbackMap.get(data.callbackId)
            // 执行回调函数
            fn(data)

            // 删除回到函数
            callbackMap.delete(data.callbackId)

        }else{
            // 转发
            data.callbackId = data.callbackId || getCurrentCallbackId()
            // 添加转发消息的回调函数 并 转发消息   目标：消息转发到data.targetPlatform中
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