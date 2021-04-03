import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


// import { userLoginReducer,userRegisterReducer, userVerifyMailReducer, validateTokenReducer } from './reducers/userReducers'
import { userInfoReducer } from './reducers/userReducers'
import { todosReducer } from './reducers/TodoReducers'


const reducer = combineReducers({
    userInfo : userInfoReducer,
    todos : todosReducer
})

// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null

// const state = store.getState();


// const checkTokenExpirationMiddleware = state => next => action =>{
//     const userData = state.getState().userInfo && state.getState().userInfo.userData ? state.getState().userInfo.userData : {};
//     const token = (userData && userData.token) ? userData.token : {}
//     const userStatus = (userData && userData.userStatus) ? userData.userStatus : {}
//     const currentStatus = (token) ? jwt.decode(token).userStatus === 'active' : {}
//     console.log(currentStatus);
//     // if(userStatus !== currentStatus){
//     //   console.
//     //   dispatch(updateStatus(currentStatus));
//     // }
//     console.log(token);
//     // console.log(jwt.decode(token));
//     console.log(action);
//     next(action);
// };

// function checkTokenStatus(state){
//   const userData = state.getState().userInfo && state.getState().userInfo.userData ? state.getState().userInfo.userData : {};
//     const token = (userData && userData.token) ? userData.token : {}
//     const userStatus = (userData && userData.userStatus) ? userData.userStatus : {}
//     const currentStatus = (token) ? jwt.decode(token).userStatus === 'active' : {}
//     console.log(currentStatus);
//     return function(dispatch){
//       if(userStatus !== currentStatus){
//         dispatch(updateStatus(currentStatus));
//       }
//       return function(next){
//         return function(action){
//           return next(action);
//         }
//       }
//     }
    
// }

// console.log(initialState);

const middleware = [thunk]

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)
  

export default store
