const initState = {
    username:'--'
}
function reducers(state=initState,action:any){
    if(action.type === 'Login'){
        state.username  = action.payload.username;
     }

     return state
}

export default reducers