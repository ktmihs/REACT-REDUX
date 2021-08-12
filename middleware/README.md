# 📝 REDUX MIDDLE-WARE

### 특징
- action이 dispatch 될 때 middleware에서 특정 조건에 따라 무시할 수 있음
(리듀서에서 처리하지 않음)

- action이리듀서에 전달되기 전에 middleware에서 특정 코드를 실행할 수 있음
(action 처리 과정에서 수정이나 console출력 가능, 또 다른 action dispatch 가능)

### 주로 사용할 때
- 비동기 작업을 처리할 때 사용 ex) API 요청

### middleware 라이브러리 종류
- redux-thunk
- redux-saga
- redux-observable
- redux-promise-middleware
- ...

<br/><hr/><br/>

# ✔ middleware
```
// 작성
const myLogger=store=>next=>action=>{
    // 함수를 리턴하는 함수를 리턴하는 함수   
}

// 적용방법(index.js)
const store=createStore(rootReducer,applyMiddleware([MIDDLEWARE_NAME])) // 처럼 createStore의 두 번째 인자에 applyMiddleware(작성한 미들웨어명)를 넣어줌


```

### next
- middleware에서 action을 받아왔을 때, 다음 middleware에 전달하는 함수
- middleware를 1개 이상 받을 수 있음
- 마지막에는 next로 리듀서로 전달
- next(action) 으로 호출

##### next vs dispatch
- next는 계속 이어서 전달
- store.dispatch는 새로 전달

<br/><hr/><br/>

# ✔ REDUX-THUNK
- 액션 객체가 아닌 함수를 디스패치 할 수 있음
- 함수가 아니면 다음 미들웨어로 전달

### thunk함수 
- 액션을 디스패치할 수도 있고, 상태를 조회할 수도 있음 
- redux-thunk 를 사용할 때는 logger를 맨 나중에 작성해줘야 함 <br/> ex) const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(ReduxThunk,logger)))
- promise를 다룰 때 유용하게 쓰일 수 있음

### 리팩토링
- 반복되는 코드를 간결하게 작성하기 위해 util을 작성함
