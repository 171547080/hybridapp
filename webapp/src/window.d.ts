interface ReactNativeWebView {
    postMessage(data:string,origin:string):void 
}
interface Window{
    isIphoneX:any,
    depMessageFn: depMessageFn
    ReactNativeWebView:ReactNativeWebView
}