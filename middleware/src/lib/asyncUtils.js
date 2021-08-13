import {call, put} from 'redux-saga/effects'

export const createPromiseSaga=(type, promiseCreator)=>{
    const [SUCCESS,ERROR]=[`${type}_SUCCESS`,`${type}_ERROR`]
    return function* saga(action){
        try{
            const result=yield call(promiseCreator,action.payload)
            yield put({
                type:SUCCESS,
                payload:result
            })
        }catch(e){
            yield put({
                type:ERROR,
                payload:e,
                error:true
            })
        }
    }
}
export const createPromiseSagaById=(type, promiseCreator)=>{
    const [SUCCESS,ERROR]=[`${type}_SUCCESS`,`${type}_ERROR`]
    return function* saga(action){
        const id=action.meta
        try{
            const result=yield call(promiseCreator,action.payload)
            yield put({
                type:SUCCESS,
                payload:result,
                meta:id
            })
        }catch(e){
            yield put({
                type:ERROR,
                payload:e,
                error:true,
                meta:id
            })
        }
    }
}


export const createPromiseThunk=(type,promiseCreator)=>{
    const [SUCCESS, ERROR]=[`${type}_SUCCESS`,`${type}_ERROR`]

    const thunkCreator=(param)=>async (dispatch)=>{
        dispatch({type})
        try{
            const payload=await promiseCreator(param)
            dispatch({
                type:SUCCESS,
                payload
            })
        } catch(e){
            dispatch({
                type:ERROR,
                payload:e,
                error:true  //flux standard action 규칙
            })
        }
    }
    return thunkCreator
}

const defaultIdSelector=param=>param // param자체가 idSelector임을 가리킴
export const createPromiseThunkById=(type, promiseCreator,idSelector=defaultIdSelector)=>{
    const [SUCCESS, ERROR]=[`${type}_SUCCESS`,`${type}_ERROR`]

    const thunkCreator=(param)=>async (dispatch)=>{
        const id=idSelector(param)

        dispatch({type,meta:id})
        try{
            const payload=await promiseCreator(param)
            dispatch({
                type:SUCCESS,
                payload,
                meta:id
            })
        } catch(e){
            dispatch({
                type:ERROR,
                payload:e,
                meta:id,
                error:true  //flux standard action 규칙
            })
        }
    }
    return thunkCreator
}

// keepData => 기존에 이미 존재하는 데이터일 경우, 새로고침하지 않고 기존 그대로 사용
export const handleAsyncActions=(type,key,keepData=false)=>{
    const [SUCCESS, ERROR]=[`${type}_SUCCESS`,`${type}_ERROR`]
    const reducer=(state,action)=>{
        switch(action.type){
            case type:
                return{
                    ...state,
                    [key]:reducerUtils.loading(keepData?state[key].data:null)
                }
            case SUCCESS:
                return{
                    ...state,
                    [key]:reducerUtils.success(action.payload)
                }
            case ERROR:
                return{
                    ...state,
                    [key]:reducerUtils.error(action.payload)
                }
            default: return state
        }
    }
    return reducer
}
export const handleAsyncActionsById=(type,key,keepData=false)=>{
    const [SUCCESS, ERROR]=[`${type}_SUCCESS`,`${type}_ERROR`]
    const reducer=(state,action)=>{
        const id=action.meta
        switch(action.type){
            case type:
                return{
                    ...state,
                    [key]:{
                        ...state[key],
                        [id]:reducerUtils.loading(keepData?state[key][id] && state[key][id].data:null)
                    }
                }
            case SUCCESS:
                return{
                    ...state,
                    [key]:{
                        ...state[key],
                        [id]:reducerUtils.success(action.payload)
                    }
                }
            case ERROR:
                return{
                    ...state,
                    [key]:{
                        ...state[key],
                        [id]:reducerUtils.error(action.payload)
                    }
                }
            default: return state
        }
    }
    return reducer
}

export const reducerUtils={
    initial:(data=null)=>({
        data,
        loading:false,
        error:null
    }),
    loading:(prevState=null)=>({
        data:prevState,
        loading:true,
        error:null
    }),
    success:(data)=>({
        data,
        loading:false,
        error:null
    }),
    error:(error)=>({
        data:null,
        loading:false,
        error
    })
}