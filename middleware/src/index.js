import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer, { rootSaga } from './modules'
//import myLogger from './middlewares/myLogger';
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import { Router, BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'

const customHistory=createBrowserHistory()
const sagaMiddleware=createSagaMiddleware({
  // saga내부에서 history를 사용할 때는 아래를 써주면 됨
  context:{
    history:customHistory
  }
})
// 첫 번째 미들웨어에서 next를 부른 시점에서 두 번째 미들웨어가 실행됨
//const store=createStore(rootReducer,applyMiddleware(myLogger, logger))  // 각각 첫 번째, 두 번째 미들웨어

// composeWithDevTools => redux 개발자 도구 활성화
const store=createStore(
  rootReducer,
  composeWithDevTools( 
    applyMiddleware(
      ReduxThunk.withExtraArgument({history:customHistory}),
      sagaMiddleware,
      logger
    )
  )
)

sagaMiddleware.run(rootSaga)  // 함수 자체를 params로 넣어줌

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
