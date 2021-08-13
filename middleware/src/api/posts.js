import axios from 'axios'

export const getPosts=async()=>{
    // const response=await axios.get('http://localhost:4000/posts')
    // proxy로 localhost:4000을 받아왔기 때문에 앞부분 없어도 됨(현재 3000주소 사용해도 됨)
    const response=await axios.get('/posts')
    return response.data
}

export const getPostById=async(id)=>{
    // const response=await axios.get('http://localhost:4000/posts/'+id)
    const response=await axios.get('/posts/'+id)
    return response.data
}