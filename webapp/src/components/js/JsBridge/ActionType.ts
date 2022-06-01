export interface ActionType {
    type:String,
    data?:Object,
    // 发起消息消息的平台(ifram name)
    platform?:String, 
    // 发信消息的目标平台(ifram name)
    targetPlatform?:String, 
    // 入参无需传值，此参数为通过JSBridge生成
    callbackId?:String,
    // 入参无需传值，此参数为标准消息转发是否成功
    success?:boolean
    // 异常消息
    error?:{ 
        errorCode?:string
        message?:string
    } 
}

