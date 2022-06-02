import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
import { useUserStore } from './modules/user'
import { usePlatformStore, } from './modules/platform'

const pinia = createPinia()

export { useAppStore, useUserStore,usePlatformStore}
export default pinia
