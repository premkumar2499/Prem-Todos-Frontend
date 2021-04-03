import Axios from 'axios';
import React , {useState} from 'react';
import {useHistory} from 'react-router-dom'
// import { HOST_URL } from '../../Constants';

import EditTodo from './EditTodo';
// import Loading from '../Loading/Loading';
import ShowMsg from './ShowMsg';
import { completeTodo, deleteTodo } from '../actions/TodoActions'
import {useSelector,useDispatch} from 'react-redux'

const Todo = ({id,content,created_at,openModel,setOpenModel,handleModal}) =>{
    const userInfo = useSelector(state => state.userInfo);
    const { userData,userStatus } = userInfo ? userInfo : {};
    const token = userData ? userData.token : null;

    const userTodos = useSelector(state => state.todos);
    const { loading,error, todos } = userTodos;

    const dispatch = useDispatch();
    const [openEditModel,setOpenEditModel] = useState(false);
    const [openDeleteModel,setOpenDeleteModel] = useState(false);

    const handleEdit = () => {
        setOpenEditModel(!openEditModel);
    }

    const handleDelete = async(todo_id)=>{
        dispatch(deleteTodo(todo_id,token))
        setOpenModel(true);
    }

    const handleComplete = (todo_id)=>{
        dispatch(completeTodo(todo_id,token));
        setOpenModel(true);
    }
    
    // const handleComplete = async(id)=>{
    //     setLoading(true);
    //     const completedRes = await Axios.put(`${HOST_URL}/api/auth/completed`,
    //     { id },
    //     { headers: {"Authorization" : `Bearer ${token}`} }
    //     );
    //     console.log(completedRes);
    //     if(completedRes.data){
    //         setError(completedRes.data.msg);
    //     }
    //     setLoading(false);
    //     setOpenCompletedModel(true);
    // }
    return(
    <div className="row border border-secondary mb-2 p-3 fs-3">
            <div className="container">
                <div className="row pb-3">
                    <div className="col">
                        {content}
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="col">
                        {created_at}
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="col">
                        <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger" onClick={() => handleDelete(id)}>Delete</button>
                        {/* <button className="btn btn-danger">Delete</button> */}
                    </div>
                    <div className="col">
                        <button className="btn btn-success" onClick={() => handleComplete(id)}>Complete</button>
                        {/* <button className="btn btn-success">Complete</button> */}
                    </div>
                </div>
            </div>
        {openEditModel  && <EditTodo id={id} content={content} handleEdit={handleEdit}/>}
        {error  && <ShowMsg error={error} handleClose={handleEdit}/>}
        {openModel  && <ShowMsg error={error} handleClose={handleModal}/>}
        {/* {openModel && <ShowMsg error={error} handleClose={handleModal} />} */}
        </div>
    )
}

export default Todo



