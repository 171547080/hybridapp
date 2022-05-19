import { create } from "dva-core-ts";
import WebView from "react-native-webview";

export interface JsBridgeType{
    webView: WebView
    dispatch: (action:ActionType) => {}
    postMessage:(messageStr:string) => {}
    injectJavaScript: (messageStr:string) => {}
}

export interface ActionType {
    type:String,
    data?:Object,
    // 入参无需传值，此参数为通过平台生成
    platform?:String, 
    // 入参无需传值，此参数为通过平台生成
    callbackId?:String 
}
// 全局WebView对象，通过useJsBridge传入webView实例
let view:WebView

// 获取当前平台类型判断  预计平台类型值 android | ios | pc | mobile 
const getCurrentPlatform = ()=>{
    // to do
    return "android"
}
// 获取当前消息发送后的回调ID -- 用户监听消息执行情况
const getCurrentCallbackId = ()=>{
    // 12为ID
    const num = 1000000000000
    return (Math.random() * num ) % num + ''
}

// 创建JsBridge对象
const createJsBridge = (webView : WebView)=>{
    view = webView

    // webView通讯方法，通过此方法发送消息到webView当中，其中webView中需要监听并处理此action，预计等待一个异步的CallbackId message方法
    const dispatch = (action:ActionType) => {
        // 异常处理
        if(!view){
            return
        }
        
        // 添加 当前platform属性
        action.platform = getCurrentPlatform()
        action.callbackId = getCurrentCallbackId()

        const json = JSON.stringify(action)
        console.error(json)
        view.postMessage(json);
    }

    const postMessage = (messageStr:string) => {
        view.postMessage(messageStr);
        view.injectJavaScript
    }

    const injectJavaScript = (scriptStr:string) => {
        view.injectJavaScript(scriptStr)
    }
    
    return {
        webView,
        dispatch,
        postMessage,
        injectJavaScript
    }
}


export function useJsBridge( webView : WebView) :JsBridgeType {
    const result = createJsBridge(webView) as JsBridgeType
    return result
}