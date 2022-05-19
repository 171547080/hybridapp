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
    callbackId?:String 
}

export function initJsBridge() {
    initHandleMessage()
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
 * @param platform 平台类型 android | ios | pc | mobile 
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
            type:subs,
            callbackId:callbackId,
            data:result,
            scuess:true
        }
        
        window.postMessage(JSON.stringify(callBackData))
    }

}
/**
 * 初始化window，添加监听message事件，构建app与h5的通讯桥梁 JsBridge
 */
const initHandleMessage = () => {
    // 防止多次添加message监听
    if (window.depMessageFn) {
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
        }
        // 处理e.data的异常
    }

    window.document.addEventListener('message', fn)
    // window添加depMessageFn标准量，
    window.depMessageFn = fn
}

const JsBridge = {
    initJsBridge,
    addActionCallback :addSub,
    removeActionCallback :removeSub,
    removeAllSub: removeAllSubByVmId
}
export default JsBridge

