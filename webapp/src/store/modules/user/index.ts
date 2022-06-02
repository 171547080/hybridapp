import { defineStore, acceptHMRUpdate } from 'pinia'
import { getToken,setToken,isLogin} from "../../../utils/auth"
import userApi from "@api/user"
import { UserState } from "./types"
/**
 * mock 登录
 * @param {string} username
 * @param {string} password
 */
function apiLogin(username, password) {
  if (username === 'admin' && password === '123456') return Promise.resolve({ isAdmin: true })
  return Promise.reject(new Error('invalid username and password'))
}

export const useUserStore = defineStore({
  id: 'user',
  state: ():UserState => ({
    id: undefined,
    userId: undefined,
    loginName: undefined,
    password: undefined,
    gender: undefined,
    email: undefined,
    mobile: undefined,
    department: undefined,
    departmentId: undefined,
    role: undefined,
    realName: undefined,
    disabled: undefined,
    accessKey: undefined,
    secretKey: undefined,
    superAdmin: undefined,
    tokenId: undefined,
  }),
  
  actions: {
     /**
     * 用户退出登录
     */
    logout() {
      this.setInfo({})
    },

    /**
     * async用户登录
     * @param {string} user
     * @param {string} password
     */
    async login(username, password) {
      const res = await userApi.login({username,password})
      
      if(res.token){
          setToken(res.token)
      }
      this.checkLogin()
    },

    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
        this.$patch(partial)
    },
    
    /**
     * 检查登录状态
     */
     async checkLogin() {
      if(!isLogin()){
        // 路由跳转到登录页面
      }
      userApi.myself().then((res)=>{
        console.error(res)
      })
    },
  },
})