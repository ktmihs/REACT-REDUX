import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './modules'
//import myLogger from './middlewares/myLogger';
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

// 첫 번째 미들웨어에서 next를 부른 시점에서 두 번째 미들웨어가 실행됨
//const store=createStore(rootReducer,applyMiddleware(myLogger, logger))  // 각각 첫 번째, 두 번째 미들웨어

// composeWithDevTools => redux 개발자 도구 활성화
const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(ReduxThunk,logger)))


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
