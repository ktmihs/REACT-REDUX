import * as postsAPI from '../api/posts'
import { createPromiseThunk, handleAsyncActions, reducerUtils } from '../lib/asyncUtils'

// 특정 요청이 시작됨을 알림
const GET_POSTS='GET_POSTS'
// 요청이 발생하고 끝나서 액션이 디스패치되고 나면 로딩중이 끝났음을 알림, 성공 데이터를 상태에 담음
const GET_POSTS_SUCCESS='GET_POSTS_SUCCESS'
// 에러가 남을 알림
const GET_POSTS_ERROR='GET_POSTS_ERROR'

const GET_POST='GET_POST'
const GET_POST_SUCCESS='GET_POST_SUCCESS'
const GET_POST_ERROR='GET_POST_ERROR'

const CREAR_POST='CREAR_POST'

// 액션 생성 함수를 직접 만들지 않고, 나중에 thunk에서 객체 자체로 작성해도 됨

// posts thunk 함수
export const getPosts=createPromiseThunk(GET_POSTS,postsAPI.getPosts)
export const getPost=id=>async (dispatch)=>{
    dispatch({type:GET_POST,meta:id})
    try{
        const payload=await postsAPI.getPostById(id)
        dispatch({type:GET_POST_SUCCESS,payload,meta:id})
    } catch(e){
        dispatch({type:GET_POST_ERROR,payload:e,error:true,meta:id})
    }
}
export const clearPost=()=>({type: CREAR_POST})

const initialState={
    posts:reducerUtils.initial(),
    post: {}
}

const getPostsReducer=handleAsyncActions(GET_POSTS, 'posts',true)
const getPostReducer=handleAsyncActions(GET_POST,'post')
export default function posts(state=initialState,action){
    switch(action.type){
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return getPostsReducer(state,action)
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            return getPostReducer(state,action)
        case CREAR_POST:
            return {
                ...state,
                post:reducerUtils.initial()
            }
        default: return state
    }
}