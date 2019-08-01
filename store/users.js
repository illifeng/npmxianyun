// 创建储存用户信息
export const state=()=>{
    return {
        userInfo:{
            token:"",
            user:{
            }
        }
    }
}
// 同步改变数据
export const mutations={
    // 用户登录
        setUser(state,data){
            state.userInfo=data
        },
        // 用户推出
        clearUser(state){
            state.userInfo={
                token:"",
            user:{
            }
            }
        }
}
// 异步改变数据
export const actions=()=>{
    return{

    }
}