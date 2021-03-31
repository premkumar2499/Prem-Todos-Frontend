import axios from 'axios'
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  
  VALIDATE_TOKEN_FAILURE,
  VALIDATE_TOKEN_REQUEST,
  VALIDATE_TOKEN_SUCCESS,

  VERIFY_MAIL_FAILURE,
  VERIFY_MAIL_REQUEST,
  VERIFY_MAIL_SUCCESS,

  ACTIVATE_ACCOUNT_REQUEST,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_FAILURE,

  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  UPDATE_STATUS_REQUEST
  
} from '../constants/userConstants'

import { HOST_URL } from '../constants/appConstants'

export const updateStatus = (status) => async (dispatch) =>{
  try{
    dispatch({
      type : UPDATE_STATUS_REQUEST,
      payload : status
    })
  }
  catch(error){
   dispatch({
     type: VALIDATE_TOKEN_FAILURE,
     payload:
       error.response && error.response.data.message
         ? error.response.data.message
         : error.message,
   })
  }
}

export const validateToken = (token) => async (dispatch) =>{
   try{
     console.log(token);
     dispatch({
       type : VALIDATE_TOKEN_REQUEST
     })
     const config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
    }

    const { data } = await axios.post(
      `${HOST_URL}/api/auth/validate-token`,
      null,
      config
    )
    if(data && data.userStatus === 'active'){
      dispatch({
        type: VALIDATE_TOKEN_SUCCESS,
        payload: true,
      })
    }
    else{
      dispatch({
        type: VALIDATE_TOKEN_SUCCESS,
        payload: false,
      })
    }
    

    // localStorage.setItem('userInfo', JSON.stringify(data))
   }
   catch(error){
    dispatch({
      type: VALIDATE_TOKEN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
   }
}

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${HOST_URL}/api/auth/login`,
      { email, password },
      config
    )

    // dispatch({
    //   type: USER_LOGIN_SUCCESS,
    //   payload: data,
    // })
    console.log(data);
    if(data.success){
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
    }
    else{
      dispatch({
        type : USER_LOGIN_FAILURE,
        payload : data
      })
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (firstName,lastName, email, password, confirmPassword) => async (dispatch) => {
  console.log(firstName);
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        `${HOST_URL}/api/auth/register`,
        { firstName,lastName, email, password, confirmPassword },
        config
      )
      console.log(data);
      if(data.success){
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
      }
      else{
        dispatch({
          type : USER_REGISTER_FAILURE,
          payload : data
        })
      }
  
      
  
      // dispatch({
      //   type: USER_LOGIN_SUCCESS,
      //   payload: data,
      // })
  
      
    } catch (error) {
      console.log(error);
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const UserVerifyMail = (token) => async (dispatch) => {
    try {
      dispatch({
        type: VERIFY_MAIL_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`
        },
      }
  
      const { data } = await axios.get(
        `${HOST_URL}/api/auth/verification/get-activation-email`,
        config
      )
      if(data.success){
        dispatch({
          type: VERIFY_MAIL_SUCCESS,
          payload: data,
        })
      }
      else{
        dispatch({
          type : VERIFY_MAIL_FAILURE,
          payload : data,
        })
      }
  
    } catch (error) {
      dispatch({
        type: VERIFY_MAIL_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const activateAccount = (userId,secretCode) => async(dispatch) =>{
  try {
    dispatch({
      type: ACTIVATE_ACCOUNT_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${HOST_URL}/api/auth/verification/verify-account/${userId}/${secretCode}`,
      config
    );
    if(data.success){
      dispatch({
        type: ACTIVATE_ACCOUNT_SUCCESS,
        payload: data,
      })
    }
    else{
      dispatch({
        type : ACTIVATE_ACCOUNT_FAILURE,
        payload : data,
      })
    }

  } catch (error) {
    dispatch({
      type: ACTIVATE_ACCOUNT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGET_PASSWORD_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // const { data } = await axios.post(
    //   `${HOST_URL}/api/auth/password-reset/get-code`,
    //   email
    // )
    const { data } = await axios.post(`${HOST_URL}/api/auth/password-reset/get-code`, {
      email
    });

    if(data.success){
      dispatch({
        type: FORGET_PASSWORD_SUCCESS,
        payload: data,
      })
    }
    else{
      dispatch({
        type : FORGET_PASSWORD_FAILURE,
        payload : data,
      })
    }

  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetPassword = (email,password,confirmPassword,code) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    })

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }

    // const { data } = await axios.post(`${HOST_URL}/api/auth/password-reset/verify`, 
    // config,{
    //   email,password,confirmPassword,code,
    // });

    const {data} = await axios.post(`${HOST_URL}/api/auth/password-reset/verify`, {
      email, password, confirmPassword, code
    });
    if(data.success){
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data
      })
    }
    else{
      dispatch({
        type : RESET_PASSWORD_FAILURE,
        payload : data,
      })
    }

  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT })
  document.location.href = '/login'
}



