import { call, getContext, put, select, take, takeEvery } from 'redux-saga/effects'
import * as postsAPI from '../api/posts'
import { createPromiseSaga, createPromiseSagaById, createPromiseThunk, createPromiseThunkById, handleAsyncActions, handleAsyncActionsById, reducerUtils } from '../lib/asyncUtils'

// 특정 요청이 시작됨을 알림
const GET_POSTS='GET_POSTS'
// 요청이 발생하고 끝나서 액션이 디스패치되고 나면 로딩중이 끝났음을 알림, 성공 데이터를 상태에 담음
const GET_POSTS_SUCCESS='GET_POSTS_SUCCESS'
// 에러가 남을 알림
const GET_POSTS_ERROR='GET_POSTS_ERROR'

const GET_POST='GET_POST'
const GET_POST_SUCCESS='GET_POST_SUCCESS'
const GET_POST_ERROR='GET_POST_ERROR'
const GO_TO_HOME='GO_TO_HOME'

const CREAR_POST='CREAR_POST'
const PRINT_STATE='PRINT_STATE'

// 액션 생성 함수를 직접 만들지 않고, 나중에 thunk에서 객체 자체로 작성해도 됨

export const getPosts=()=>({type:GET_POSTS})
export const getPost=(id)=>({
    type:GET_POST,
    payload:id,
    meta:id
})
export const printState=()=>({type:PRINT_STATE})

export const getPostsSaga=createPromiseSaga(GET_POSTS,postsAPI.getPosts)
export const getPostSaga=createPromiseSagaById(GET_POST,postsAPI.getPostById)

function* goToHomeSaga(){
    const history=yield getContext('history')
    history.push('/')
}
function* printSateSaga(){
    // 상태에 따라 조건부로 호출할 때(select사용)
    const state=yield select(state=>state.posts)
    console.log(state)
}

/*
function* getPostsSaga(){
    try{
        const posts=yield call(postsAPI.getPosts)
        yield put({
            type:GET_POSTS_SUCCESS,
            payload:posts
        })
    }catch(e){
        yield put({
            type:GET_POSTS_ERROR,
            payload:e,
            error:true
        })
    }
}
function* getPostSaga(action){
    const id=action.payload
    try{
        const post=yield call(postsAPI.getPostById, id)
        yield put({
            type:GET_POST_SUCCESS,
            payload:post,
            meta:id
        })
    }catch(e){
        yield put({
            type:GET_POST_ERROR,
            payload:e,
            error:true,
            meta:id
        })
    }
}
*/

// 모니터링 함수
export function* postsSaga(){
    yield takeEvery(GET_POSTS,getPostsSaga)
    yield takeEvery(GET_POST,getPostSaga)
    yield takeEvery(GO_TO_HOME,goToHomeSaga)
    yield takeEvery(PRINT_STATE,printSateSaga)
}

export const goToHome=()=>({type:GO_TO_HOME})

export const clearPost=()=>({type: CREAR_POST})

const initialState={
    posts:reducerUtils.initial(),
    post: {}
}

const getPostsReducer=handleAsyncActions(GET_POSTS, 'posts',true)
const getPostReducer=handleAsyncActionsById(GET_POST,'post',true)
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