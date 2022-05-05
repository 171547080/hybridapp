interface ReactNativeWebView {
    postMessage(data:string,origin:string):void 
}
interface Window{
    isIphoneX:any,
    ReactNativeWebView:ReactNativeWebView
}