import WebView from "react-native-webview";

// 统一存放回调对象
const callbackMap = new Map()

export interface JsBridgeType {
    webView: WebView | null
    setWebView(newWebView: WebView) : void
    dispatch(action: ActionType,callback : Function) : void
    postMessage(messageStr: string) : void
    injectJavaScript(messageStr: string) : void
    onHandleMessage(event: Event) : void
}

export interface ActionType {
    type: String,
    data?: Object,
    // 入参无需传值，此参数为通过平台生成
    platform?: String,
    // 入参无需传值，此参数为通过平台生成
    callbackId?: String
}
// 全局WebView对象，通过useJsBridge传入webView实例
// let view:WebView

// 获取当前平台类型判断  预计平台类型值 android | ios | pc | mobile 
const getCurrentPlatform = () => {
    // to do
    return "android"
}
// 获取当前消息发送后的回调ID -- 用户监听消息执行情况
const getCurrentCallbackId = () => {
    // 12为ID
    const num = 1000000000000
    return ((Math.random() * num) % num + '')
}

// 创建JsBridge对象
const createJsBridge = (webView: WebView | null) => {
    // 私有属性WebView对象，通过useJsBridge传入webView实例
    let view: WebView<{}> | null = null

    if (webView) {
        view = webView
    }

    // webView通讯方法，通过此方法发送消息到webView当中，其中webView中需要监听并处理此action，预计等待一个异步的CallbackId message方法
    const dispatch = (action: ActionType, callback: Function) => {
        // 异常处理
        if (!view) {
            return
        }

        const callbackId = getCurrentCallbackId()

        // 添加 当前platform属性
        action.platform = getCurrentPlatform()
        action.callbackId = callbackId

        // JSON化数据
        const json = JSON.stringify(action)

        // Promise确保postMessage函数执行完成
        const p = new Promise((resolve,reject)=>{
            if(view)view.postMessage(json);
            resolve(null)
        }).catch(()=>{})
        
        p.then(()=>{
            // 暂存回调方法
            callbackMap.set(callbackId, callback)  
        })
           
    }

    const postMessage = (messageStr: string) => {
        // 异常处理
        if (!view) {
            return
        }

        view.postMessage(messageStr);
    }

    const injectJavaScript = (scriptStr: string) => {
        // 异常处理
        if (!view) {
            return
        }

        view.injectJavaScript(scriptStr)
    }

    // 重设webView对象
    const setWebView = (newWebView: WebView) => {
        view = newWebView
    }

    // 捕获message方法,统一处理发送的postMessage消息回调数据
    const onHandleMessage = (event: any) => {
        const data = JSON.parse(event.nativeEvent.data)
  
        // 判断是否为回调消息
        if(data.callbackId){
            const fn = callbackMap.get(data.callbackId)
            // 执行回调函数
            fn(data)

            // 删除回到函数
            callbackMap.delete(data.callbackId)
        }
    }
    return {
        webView,
        setWebView,
        dispatch,
        postMessage,
        onHandleMessage,
        injectJavaScript
    }
}


export function useJsBridge(webView: WebView | null): JsBridgeType {
    const result = createJsBridge(webView) as JsBridgeType
    return result
}