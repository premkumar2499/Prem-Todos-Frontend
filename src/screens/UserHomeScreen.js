import React, {  useContext, useDebugValue, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import moment from 'moment'
// import Todos from '../Todos/Todos'
// import AddTodo from '../Todos/AddTodo'
// import UserContext from "../../context/userContext";
// import Axios from 'axios'
import Loading from '../components/Loading/Loading';
import Todo from '../components/Todo'
import AddTodo from '../components/AddTodo'
import ShowMsg from '../components/ShowMsg'
import {getTodos,clearError } from '../actions/TodoActions'



const UserHomeScreen = ({history}) =>{
    // const {userData,loading,setLoading} = useContext(UserContext);
    const userInfo = useSelector(state => state.userInfo);
    const {  userData,userStatus } = userInfo ? userInfo : {};
    const token = userData ? userData.token : null;
    const userTodos = useSelector(state => state.todos);
    const { loading,error, todos } = userTodos;

    const dispatch = useDispatch();

    const [openAddTodo , setOpenAddTodo] = useState(false);
    const [openModel,setOpenModel] = useState(false);
    
    useEffect(()=>{
        const MountUserHome = async() => {
            if(!userData){
                history.push('/login');
            }
            else if(!userStatus){
                history.push('/verify-mail');
            }
            else if(error === null){
                dispatch(getTodos(token));
            }
        };   
        MountUserHome();
    }, [userData,userStatus,token,dispatch,history,error]);
    const handleModal = () =>{
        setOpenModel(!openModel);
    }
    const handleAddTodo = () =>{
        setOpenAddTodo(!openAddTodo);
    }
    let todos_data;
    if(todos && todos.length){
        let count=0;
        todos_data = todos.map((todo,index)=>{
            if(!todo.completed){
                return(
                    <Todo key={index} id={todo.id} content={todo.content} created_at={moment(todo.created_at).format('DD MMM YYYY hh:mm A')} 
                        openModel = {openModel} setOpenModel={setOpenModel} handleModal={handleModal}/>
                )
            }
            else{
                count++;
            }
        })
        if(count===todos.length){
            todos_data = null
        }
    }
    else{
        todos_data = <h2>No todos Yayy! <br></br>Add your first TODO</h2>
    }
    return(
        
        <div className="container-fluid">
            { loading ? (
                <Loading/>
            ) : (
                // (!error===null) ? (
                //     <ShowMsg error={error} handleClose={handleModal} />
                // ):
                // (
                    <>
                    <div className="row justify-content-end">
                        <div className="col-sm-2 col-4">
                            <button className="btn btn-primary p-1 fs-5 p-lg-2 fs-lg-4" onClick={handleAddTodo}>Add Todo</button>
                        </div>
                    </div>
                    <div className="container mt-3">
                        { todos_data && todos_data.length ? (
                            todos_data
                        ) : (
                            <h1>It seems that you completed all your todos.<br></br>Add more TODOS</h1>
                        )}
                    </div>
                    {openAddTodo && <AddTodo handleAddTodo={handleAddTodo} setOpenAddTodo={setOpenAddTodo}/>}
                    {/* {openCompletedModel && <ShowMsg error={error} handleClose={handleCompletedModal} />} */}
                    
                    {/* <Todos/> */}
                    {/* <Todos/> */}
                </>
                // )
            )}
                    
        </div>
    )
}

export default UserHomeScreen;