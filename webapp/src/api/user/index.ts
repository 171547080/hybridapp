import { request } from '../axios'
import qs from 'qs'

interface LoginResquest {
    username: string
    password: string
}

export default {
    login(data: LoginResquest) {
        return request({
            baseURL: '/api',
            url: '/user/login',
            data: qs.stringify(data)
        })
    },
    logout() {
        return request({
            baseURL: '/api',
            url: '/user/login'
        })
    },
    myself() {
        return request({
            baseURL: '/api',
            url: '/user/myself'
        })
    }
}
