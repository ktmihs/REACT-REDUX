import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostList from '../components/PostList'
import { getPosts } from '../modules/posts'
function PostListContainer(){
    const {data,loading,error}=useSelector(state=>state.posts.posts)
    const dispatch=useDispatch()
    useEffect(()=>{
        //if (data) return    // 데이터가 존재한다면 다시 불러오지 않음(뒤로가기 했을 때, 다시 불러오지 않고 이전 그대로)
        dispatch(getPosts())    // getPosts'()'로 호출
    },[dispatch/*,data*/])   // dispatch는 처음부터 끝까지 같은 값이기 때문에 넣든 안 넣든 상관없음
    
    if (loading ) return <div>로딩중...</div>
    if (error) return <div>에러 발생!</div>
    if (!data) return null

    return(
        <PostList posts={data}/>
    )
}
export default PostListContainer