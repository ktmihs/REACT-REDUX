import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import { reducerUtils } from '../lib/asyncUtils'
import { clearPost, getPost } from '../modules/posts'


function PostContainer({postId}){
    const {data,loading,error}=useSelector(state=>state.posts.post)
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getPost(postId))
        // return ()=>{    // 이전에 봤던 포스트가 다시 보이지 않음
        //     dispatch(clearPost())
        // }
    },[postId,dispatch])

    if (loading && !data) return <div>로딩중...</div>
    if (error) return <div>에러 발생!</div>
    if (!data) return null

    return(
        <Post post={data}/>
    )
}
export default PostContainer