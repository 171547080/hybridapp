import {call, put, takeEvery} from "redux-saga/effects"

function mockAjax(method:string,url:string,data:object){
    return new Promise((resovle) => {
        setTimeout(()=>{
            resovle({method,url,...data})
        },1000)
    })
}

function* ajaxLogin(){
    // 1.请求接口
    const user = yield call(mockAjax,'POST','/api/login',{username:'laigt',password:'123456'})
    // 2. 执行action login
    yield put({type:'login',user})
}

// 每次执行action.type = ajaxLogin,调用ajaxLogin函数
function* mySaga(){
    yield takeEvery('ajaxLogin',ajaxLogin)
}

export default mySaga