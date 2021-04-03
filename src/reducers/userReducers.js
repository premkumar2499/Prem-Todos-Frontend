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

  } from '../constants/userConstants'
import validateToken from '../utils/validateToken'

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