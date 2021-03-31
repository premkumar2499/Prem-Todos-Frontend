import {
    USER_LOGIN_FAILURE,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,

    USER_REGISTER_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,

    VALIDATE_TOKEN_REQUEST,
    VALIDATE_TOKEN_SUCCESS,
    VALIDATE_TOKEN_FAILURE,

    VERIFY_MAIL_REQUEST,
    VERIFY_MAIL_SUCCESS,
    VERIFY_MAIL_FAILURE,
    ACTIVATE_ACCOUNT_REQUEST,
    ACTIVATE_ACCOUNT_SUCCESS,
    ACTIVATE_ACCOUNT_FAILURE,

    FORGET_PASSWORD_FAILURE,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    UPDATE_STATUS_REQUEST

  } from '../constants/userConstants'
import validateToken from '../utils/validateToken'
  // import validateToken from '../utils/validateToken'

  const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

  const initialState = {
      userData: userInfoFromStorage,
      userStatus : (userInfoFromStorage && validateToken(userInfoFromStorage.token)),
  }
  export const userInfoReducer = (state = initialState,action) => {
    switch (action.type) {
        
      case VALIDATE_TOKEN_REQUEST:
        return { ...state,loading: true }
      case VALIDATE_TOKEN_SUCCESS:
        return {...state, loading: false, userStatus: action.payload }
      case VALIDATE_TOKEN_FAILURE:
        return { loading: false, error: action.payload }

      case USER_LOGIN_REQUEST:
        return { ...state,loading: true,
          status : {
            ...state.status,
            login : {
              success : null, error : null, msg : null
            },
            resetPassword : {
              success : null, error : null, msg : null
            }
          }
        }
      case USER_LOGIN_SUCCESS:
        return { ...state,loading: false, userData : action.payload , userStatus : validateToken(action.payload.token),
          status : {
            ...state.status,
            login : {
              success : action.payload.success, error : action.payload.error, msg : action.payload.msg
          }
        }
      }
      case USER_LOGIN_FAILURE:
        return { ...state,loading: false,
          status : {
            ...state.status,
            login : {
              success : action.payload.success, error : action.payload.error, msg : action.payload.msg
            }
          }
        }
      case USER_LOGOUT:
        return {}

      case USER_REGISTER_REQUEST:
        return { ...state,loading: true,
          status : {
            ...state.status,
            register : {
              success : null, error : null, msg : null
            }
          }
        }
      case USER_REGISTER_SUCCESS:
        return { ...state,loading: false, userData: action.payload, userStatus : validateToken(action.payload.token),
          status : {
            ...state.status,
            register : {
              success : action.payload.success, error : action.payload.error, msg : action.payload.msg
          }
        }
      }
      case USER_REGISTER_FAILURE:
        return { ...state,loading: false,
          status : {
            ...state.status,
            register : {
              success : action.payload.success, error : action.payload.error, msg : action.payload.msg
            }
          }
      }
      
      case VERIFY_MAIL_REQUEST:
        return { ...state,loading: true,
          status : {
            ...state.status,
            verifyMail : {
              success : null, error : null, msg : null
            }
          }
         }
      case VERIFY_MAIL_SUCCESS:
        return { ...state, loading: false, 
          status : {
          ...state.status,
          verifyMail : {
            success : action.payload.success, error : action.payload.error, msg : action.payload.msg
          }
        }
      }
      case VERIFY_MAIL_FAILURE:
        return { ...state, loading: false, 
          status : {
            ...state.status,
            verifyMail : {
              success : action.payload.success, error : action.payload.error, msg : action.payload.msg
            }
          }
        }

      case ACTIVATE_ACCOUNT_REQUEST:
        return {...state,loading:true,
          status : {
            ...state.status,
            activateAccount : {
              success : null, error : null, msg : null
            }
          }
        }
      case ACTIVATE_ACCOUNT_SUCCESS:
        return {...state,loading:false, userData : {
          ...state.userData,
          token : action.payload.token
        },userStatus : validateToken(action.payload.token),
          status : {
            ...state.status,
            activateAccount : {
              success : action.payload.success, error : action.payload.error, msg : action.payload.msg
            }
          }
        }
      case ACTIVATE_ACCOUNT_FAILURE:
        return {...state,loading:false,
          status : {
            ...state.status,
            activateAccount : {
              success : action.payload.success, error : action.payload.error, msg : action.payload.msg
            }
          }
        }

      case FORGET_PASSWORD_REQUEST:
        return {...state,loading:true,
          status : {
            ...state.status,
            forgetPassword : {
              success : null, error : null, msg : null
            },
            resetPassword : {
              success : null, error : null, msg : null
            }
          }
        }
      case FORGET_PASSWORD_SUCCESS:
        return {...state,loading:false,
          status : {
            ...state.status,
            forgetPassword : {
              success : action.payload.success, error : action.payload.error , msg : action.payload.msg , userEmail : action.payload.email
            }
          }
        }
      case FORGET_PASSWORD_FAILURE:
        return { ...state, loading: false, 
          status : {
            ...state.status,
            forgetPassword : {
              success : action.payload.success, error : action.payload.error, msg : action.payload.msg
            }
          }
        }

      case RESET_PASSWORD_REQUEST:
        return {...state,loading:true,
          status : {
            ...state.status,
            resetPassword : {
              success : null, error : null, msg : null
            }
          }}
      case RESET_PASSWORD_SUCCESS:
        return {...state,loading:false, 
          status : {
            ...state.status,
            resetPassword : {
              success : action.payload.success, error : action.payload.error , msg : action.payload.msg
            }
          }
        }
      case RESET_PASSWORD_FAILURE:
        console.log(action.payload);
        return { ...state, loading: false, 
          status : {
            ...state.status,
            resetPassword : {
              success : action.payload.success, error : action.payload.error, msg : action.payload.msg
            }
          }
        }
      default:
        return state;
  }
}


  // export const validateTokenReducer = (state = initialState,action) => {
  //   switch (action.type) {
  //     case VALIDATE_TOKEN_REQUEST:
  //       return { ...state,loading: true }
  //     case VALIDATE_TOKEN_SUCCESS:
  //       return {...state, loading: false, userStatus: action.payload }
  //     case VALIDATE_TOKEN_FAILURE:
  //       return { loading: false, error: action.payload }
      
  //     default:
  //       return state
  //   }
  // }

  // export const userLoginReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     // case VALIDATE_TOKEN_REQUEST:
  //     //   return { ...state,loading : true }
  //     // case VALIDATE_TOKEN_SUCCESS:
  //     //   return {...state, userStatus: action.payload,loading:false }
  //     // case VALIDATE_TOKEN_FAIL:
  //     //   return { ...state,error: action.payload, loading:false }
  //     case USER_LOGIN_REQUEST:
  //       return { loading: true }
  //     case USER_LOGIN_SUCCESS:
  //       return { loading: false, userInfo: action.payload }
  //     case USER_LOGIN_FAILURE:
  //       return { loading: false, error: action.payload }
  //     case USER_LOGOUT:
  //       return {}
  //     default:
  //       return state
  //   }
  // }
  
  // export const userRegisterReducer = (state = initialState, action) => {
  //   console.log(state);
  //   switch (action.type) {
  //     case USER_REGISTER_REQUEST:
  //       return { ...state,loading: true }
  //     case USER_REGISTER_SUCCESS:
  //       return { ...state,loading: false, userInfo: action.payload }
  //     case USER_REGISTER_FAILURE:
  //       return { ...state,loading: false, error: action.payload }
  //     default:
  //       return state
  //   }
  // }
  
  // export const userVerifyMailReducer = (state = initialState, action) => {
  //   console.log(state);
  //   switch (action.type) {
  //     case VERIFY_MAIL_REQUEST:
  //       return { ...state,loading: true }
  //     case VERIFY_MAIL_SUCCESS:
  //       return { ...state,loading: false }
  //     case VERIFY_MAIL_FAILURE:
  //       return { ...state,loading: false, error: action.payload.error }
  //     default:
  //       return state
  //   }
  // }
//   export const userDetailsReducer = (state = { user: {} }, action) => {
//     switch (action.type) {
//       case USER_DETAILS_REQUEST:
//         return { ...state, loading: true }
//       case USER_DETAILS_SUCCESS:
//         return { loading: false, user: action.payload }
//       case USER_DETAILS_FAIL:
//         return { loading: false, error: action.payload }
//       case USER_DETAILS_RESET:
//         return { user: {} }
//       default:
//         return state
//     }
//   }
  
//   export const userUpdateProfileReducer = (state = {}, action) => {
//     switch (action.type) {
//       case USER_UPDATE_PROFILE_REQUEST:
//         return { loading: true }
//       case USER_UPDATE_PROFILE_SUCCESS:
//         return { loading: false, success: true, userInfo: action.payload }
//       case USER_UPDATE_PROFILE_FAIL:
//         return { loading: false, error: action.payload }
//       case USER_UPDATE_PROFILE_RESET:
//         return {}
//       default:
//         return state
//     }
//   }
  
//   export const userListReducer = (state = { users: [] }, action) => {
//     switch (action.type) {
//       case USER_LIST_REQUEST:
//         return { loading: true }
//       case USER_LIST_SUCCESS:
//         return { loading: false, users: action.payload }
//       case USER_LIST_FAIL:
//         return { loading: false, error: action.payload }
//       case USER_LIST_RESET:
//         return { users: [] }
//       default:
//         return state
//     }
//   }
  
//   export const userDeleteReducer = (state = {}, action) => {
//     switch (action.type) {
//       case USER_DELETE_REQUEST:
//         return { loading: true }
//       case USER_DELETE_SUCCESS:
//         return { loading: false, success: true }
//       case USER_DELETE_FAIL:
//         return { loading: false, error: action.payload }
//       default:
//         return state
//     }
//   }
  
//   export const userUpdateReducer = (state = { user: {} }, action) => {
//     switch (action.type) {
//       case USER_UPDATE_REQUEST:
//         return { loading: true }
//       case USER_UPDATE_SUCCESS:
//         return { loading: false, success: true }
//       case USER_UPDATE_FAIL:
//         return { loading: false, error: action.payload }
//       case USER_UPDATE_RESET:
//         return {
//           user: {},
//         }
//       default:
//         return state
//     }
//   }
  