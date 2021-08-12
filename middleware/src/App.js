import React from 'react'
import {Route} from 'react-router-dom'
import PostListPage from './pages/PostListPage'
import PostPage from './pages/PostPage'
// import CounterContainer from './containers/CounterContainer'
// import PostListContainer from './containers/PostListContainer'

function App() {
  return (
    //<PostListContainer/>
    //<CounterContainer/>
    <>
      <Route path='/' component={PostListPage} exact/>
      <Route path='/:id' component={PostPage}/>    
    </>

  )
}

export default App