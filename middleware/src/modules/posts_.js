import * as postsAPI from '../api/posts'
import { reducerUtils } from '../lib/asyncUtils'

// 특정 요청이 시작됨을 알림
const GET_POSTS='GET_POSTS'
// 요청이 발생하고 끝나서 액션이 디스패치되고 나면 로딩중이 끝났음을 알림, 성공 데이터를 상태에 담음
const GET_POSTS_SUCCESS='GET_POSTS_SUCCESS'
// 에러가 남을 알림
const GET_POSTS_ERROR='GET_POSTS_ERROR'

const GET_POST='GET_POST'
const GET_POST_SUCCESS='GET_POST_SUCCESS'
const GET_POST_ERROR='GET_POST_ERROR'

// 액션 생성 함수를 직접 만들지 않고, 나중에 thunk에서 객체 자체로 작성해도 됨


// posts thunk 함수
export const getPosts=()=>async (dispatch)=>{
    // 요청이 시작됨
    dispatch({type:GET_POSTS})
    // api를 호출
    try{
        const posts=await postsAPI.getPosts()
        // 성공
        dispatch({
            type:GET_POSTS_SUCCESS,
            posts
        })
    } catch(e){
        // 실패
        dispatch({
            type:GET_POSTS_ERROR,
            error:e
        })
    }
}
export const getPost=(id)=>async (dispatch)=>{
    // 요청이 시작됨
    dispatch({type:GET_POST})
    // api를 호출
    try{
        const post=await postsAPI.getPostById(id)
        // 성공
        dispatch({
            type:GET_POST_SUCCESS,
            post
        })
    } catch(e){
        // 실패
        dispatch({
            type:GET_POST_ERROR,
            error:e
        })
    }
}

const initialState={
    posts:reducerUtils.initial(),
    post: reducerUtils.initial()
}

export default function posts(state=initialState,action){
    switch(action.type){
        case GET_POSTS:
            return{
                ...state,
                // posts:reducerUtils.loading(state.posts.data) 로 안에 params를 넘겨주면 데이터는 그대로 유지
                posts:reducerUtils.loading()
            }
        case GET_POSTS_SUCCESS:
            return{
                ...state,
                posts:reducerUtils.success(action.posts)
            }
        case GET_POSTS_ERROR:
            return{
                ...state,
                posts:reducerUtils.error(action.error)
            }
        case GET_POST:
            return{
                ...state,
                post:reducerUtils.loading()
            }
        case GET_POST_SUCCESS:
            return{
                ...state,
                post:reducerUtils.success(action.post)
            }
        case GET_POST_ERROR:
            return{
                ...state,
                post:reducerUtils.error(action.error)
            }
        default: return state
    }
}