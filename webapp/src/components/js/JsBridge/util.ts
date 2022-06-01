 // 获取当前消息发送后的回调ID -- 用户监听消息执行情况
 export function getCurrentCallbackId() {
    // 12位ID
    const num = 1000000000000
    return ((Math.random() * num) % num + '')
}