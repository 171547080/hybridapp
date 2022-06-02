import { defineStore, acceptHMRUpdate } from 'pinia'

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
  state: () => ({
    name: '',
    isAdmin: true,
  }),

  actions: {
     /**
     * 用户退出登录
     */
    logout() {
      this.$patch({
        name: '',
        isAdmin: false,
      })
    },

    /**
     * async用户登录
     * @param {string} user
     * @param {string} password
     */
    async login(user, password) {
      const userData = await apiLogin(user, password)

      this.$patch({
        name: user,
        ...userData,
      })
    },
  },
})