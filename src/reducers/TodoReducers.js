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

  CLEAR_ERROR,
  
} from '../constants/TodoConstants'

const initialState = {
      todos:[],
      error : null
  }
export const todosReducer = (state = initialState,action) => {
    switch (action.type) {
        case GET_TODOS_REQUEST:
          return { ...state,loading: true, error : null }
        case GET_TODOS_SUCCESS:
          return {...state, loading: false, todos: action.payload }
        case GET_TODOS_FAILURE:
          return { loading: false, error: action.payload }
    
        case ADD_TODO_REQUEST:
          return { ...state,loading: true }
        case ADD_TODO_SUCCESS:
          return {...state,loading: false, todos: action.payload.todos ,error:action.payload.msg }
        case ADD_TODO_FAILURE:
          return { loading: false, error: action.payload }

        case EDIT_TODO_REQUEST:
          return { ...state,loading: true }
        case EDIT_TODO_SUCCESS:
          return {...state,loading: false, error:action.payload.msg }
        case EDIT_TODO_FAILURE:
          return { loading: false, error: action.payload }

        case DELETE_TODO_REQUEST:
          return { ...state,loading: true }
        case DELETE_TODO_SUCCESS:
          return {...state, loading: false, error : action.payload }
        case DELETE_TODO_FAILURE:
          return { loading: false, error: action.payload }

        case COMPLETE_TODO_REQUEST:
          return { ...state,loading: true }
        case COMPLETE_TODO_SUCCESS:
          return {...state, loading: false, error : action.payload }
        case COMPLETE_TODO_FAILURE:
          return { loading: false, error: action.payload }

        case CLEAR_ERROR:
          return {...state,error : null}
          
        default:
          return state
    }
  }