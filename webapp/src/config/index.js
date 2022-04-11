/**
 * 环境配置
 */
const env = import.meta.MODE || 'prod'

const EnvConfig = {
    development:{
        baseApi:'/api',
        mockApi:''
    },
    test:{
        baseApi:'/api',
        mockApi:''
    },
    prod:{
        baseApi:'/api',
        mockApi:''
    }
}

const config = {
    env:'dev',
    mock:true,
    baseApi:''
}

export default {
    env,
    mock:true,
    ...EnvConfig[env]
}