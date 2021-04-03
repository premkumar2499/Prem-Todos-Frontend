import React, { useContext, useEffect, useState } from 'react';

import {useSelector,useDispatch} from 'react-redux'


import Loading from '../components/Loading/Loading';
import ShowMsg from '../components/ShowMsg';
import {  getTodos,deleteTodo } from '../actions/TodoActions'


const CompletedTodosScreen = ({history}) =>{
    const userInfo = useSelector(state => state.userInfo);
    const {  userData,userStatus } = userInfo ? userInfo : {};
    const token = userData ? userData.token : null;
    const userTodos = useSelector(state => state.todos);
    const { loading,error, todos } = userTodos;

    const dispatch = useDispatch();
    const [ openModal,setOpenModal ] = useState(false);
    
    
    useEffect(()=>{
        const MountCompletedTodo = () =>{
            if(!userData){
                history.push('/login');
            }
            else if(!userStatus){
                history.push('/verify-mail');
            }
            else if(error === null){
                dispatch(getTodos(token));
            }
        }
        MountCompletedTodo();
    },[userData,userStatus,token,dispatch,history,error])

    const handleModal = () =>{
        setOpenModal(!openModal);
    }
    const handleDelete = async(todo_id)=>{
        dispatch(deleteTodo(todo_id,token))
        setOpenModal(true);
    }
    let completedTodos;
    if(todos && todos.length){
        let count=0;
        completedTodos = todos.map((todo,index)=>{
            if(todo.completed){
                return(
                        <div className="col-12 p-1 col-lg-4 col-sm-6 p-sm-2 mb-2 p-lg-3 fs-3 grid-gap">
                            <div className="container">
                                <div className="row pb-3">
                                    <div className="col">
                                        {todo.content}
                                    </div>
                                </div>
                                <div className="row pb-3">
                                    <div className="col">
                                        {todo.created_at}
                                    </div>
                                </div>
                                <div className="row pb-3">
                                    <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                )
            }
            else{
                count++;
            }
        })
        if(count===todos.length){
            completedTodos = null
        }
    }
    else{
        completedTodos = <h2>No todos Yayy! <br></br>Add your first TODO</h2>
    }

    return(
        <div className="container-fluid">
            { loading ?(
                <Loading/>
            ) : (
                <>
                {completedTodos && completedTodos.length ? (
                    <div className="row">
                        {completedTodos}
                    </div>
                ) : (
                    <h1>It seems that you removed all your todos.<br></br>Complete more TODOS</h1>
                )}
                {openModal && <ShowMsg error={error} handleClose={handleModal}/>}
                </>
            )}
            
        </div>
    )
}

export default CompletedTodosScreen;