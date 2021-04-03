import axios from 'axios'
import {
    GET_TODOS_REQUEST,
    GET_TODOS_SUCCESS,
    GET_TODOS_FAILURE,

  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,

  EDIT_TODO_REQUEST,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_FAILURE,

  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,

  COMPLETE_TODO_REQUEST,
  COMPLETE_TODO_SUCCESS,
  COMPLETE_TODO_FAILURE,

  CLEAR_ERROR
} from '../constants/TodoConstants'

import { HOST_URL } from '../constants/appConstants'

export const getTodos = (token) => async(dispatch) =>{
    try{
        // console.log(token);
        dispatch({
          type : GET_TODOS_REQUEST
        })
        const config = {
         headers: {
           'Content-Type': 'application/json',
           "Authorization" : `Bearer ${token}`
         },
       }
   
       const { data } = await axios.get(
         `${HOST_URL}/api/auth/todos`,
         config
       )
       if(data.success){
         dispatch({
           type: GET_TODOS_SUCCESS,
           payload: data.todos,
         })
       }
       else{
         dispatch({
           type: GET_TODOS_FAILURE,
           payload: data.error,
         })
       }
      }
      catch(error){
       dispatch({
         type: GET_TODOS_FAILURE,
         payload:
           error.response && error.response.data.message
             ? error.response.data.message
             : error.message,
       })
      }
}

export const addTodo = (newTodoObj,token) => async (dispatch) =>{
    try{
        // console.log(newTodoObj);
        dispatch({
          type : ADD_TODO_REQUEST
        })
        const config = {
         headers: {
           'Content-Type': 'application/json',
           "Authorization" : `Bearer ${token}`
         },
       }
   
       const { data } = await axios.post(
        `${HOST_URL}/api/auth/add-todo`,
         newTodoObj,
         config
       )
       if(data.success){
        //  console.log(data);
         dispatch({
           type: ADD_TODO_SUCCESS,
           payload: data,
         })
       }
       else{
         dispatch({
           type: ADD_TODO_FAILURE,
           payload: data.msg,
         })
       }
      }
      catch(error){
       dispatch({
         type: ADD_TODO_FAILURE,
         payload:
           error.response && error.response.data.message
             ? error.response.data.message
             : error.message,
       })
      }
}

export const editTodo = (editTodoObj,token) => async (dispatch) =>{
  try{
      // console.log(editTodoObj);
      dispatch({
        type : EDIT_TODO_REQUEST
      })
      const config = {
       headers: {
         'Content-Type': 'application/json',
         "Authorization" : `Bearer ${token}`
       },
     }
 
     const { data } = await axios.put(
      `${HOST_URL}/api/auth/edit-todo`,
      editTodoObj,
       config
     )
     if(data.success){
      //  console.log(data);
       dispatch({
         type: EDIT_TODO_SUCCESS,
         payload: data,
       })
     }
     else{
       dispatch({
         type: EDIT_TODO_FAILURE,
         payload: data.msg,
       })
     }
    }
    catch(error){
     dispatch({
       type: EDIT_TODO_FAILURE,
       payload:
         error.response && error.response.data.message
           ? error.response.data.message
           : error.message,
     })
    }
}

export const deleteTodo = (todo_id,token) => async (dispatch) =>{
  try{
      // console.log(todo_id,token);
      dispatch({
        type : DELETE_TODO_REQUEST
      })
      const config = {
       headers: {
         'Content-Type': 'application/json',
         "Authorization" : `Bearer ${token}`
       },
     }

     const {data} = await axios.delete(`${HOST_URL}/api/auth/delete-todo`,{
        headers : {
            "Authorization" : `Bearer ${token}`
          },
        data : {
            todo_id
        }
    });
    //  console.log(data);
     if(data.success){
       dispatch({
         type: DELETE_TODO_SUCCESS,
         payload: data.msg,
       })
     }
     else{
       dispatch({
         type: DELETE_TODO_FAILURE,
         payload: data.msg,
       })
     }
    }
    catch(error){
     dispatch({
       type: DELETE_TODO_FAILURE,
       payload:
         error.response && error.response.data.message
           ? error.response.data.message
           : error.message,
     })
    }
}

export const completeTodo = (id,token) => async (dispatch) =>{
  try{
      // console.log(id,token);
      dispatch({
        type : COMPLETE_TODO_REQUEST
      })
      const config = {
       headers: {
         'Content-Type': 'application/json',
         "Authorization" : `Bearer ${token}`
       },
     }
         const {data} = await axios.put(`${HOST_URL}/api/auth/completed`,
        { id },
        { headers: {"Authorization" : `Bearer ${token}`} }
        );
    //  console.log(data);
     if(data.success){
       dispatch({
         type: COMPLETE_TODO_SUCCESS,
         payload: data.msg,
       })
     }
     else{
       dispatch({
         type: COMPLETE_TODO_FAILURE,
         payload: data.msg,
       })
     }
    }
    catch(error){
     dispatch({
       type: COMPLETE_TODO_FAILURE,
       payload:
         error.response && error.response.data.message
           ? error.response.data.message
           : error.message,
     })
    }
}

export const clearError = () =>(dispatch) => {
    dispatch({ type: CLEAR_ERROR });
}