import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { Icon } from 'vant';
// 导入判断设备是否为iphoneX方法
import './assets/js/IsIphoneX';
// import './assets/js/htmlFontSize';

const app = createApp(App)
app.use(createPinia())
app.use(router)

// 全局引用Vant的图标库
app.use(Icon)
app.mount('#app')

app.config.globalProperties.$platform = 'webapp'
console.error('环境变量=>',import.meta.env)

