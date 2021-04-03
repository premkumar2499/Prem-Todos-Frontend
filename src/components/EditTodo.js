import React, {useState} from 'react';

import {editTodo} from '../actions/TodoActions'

import {useSelector,useDispatch} from 'react-redux'
import moment from 'moment'
import Loading from './Loading/Loading';
import ShowMsg from './ShowMsg';

const EditTodo = ({id,content,handleEdit}) => {

    const userInfo = useSelector(state => state.userInfo);
    const {  userData,userStatus } = userInfo ? userInfo : {};
    const token = userData ? userData.token : null;

    const userTodos = useSelector(state => state.todos);
    const { loading,error, todos } = userTodos;
    const [editedTodo, setEditedTodo] = useState(content);
    
    

    const dispatch = useDispatch()
    
  
    const submit = async(e) =>{
        e.preventDefault();
        const now = new Date();
        const editTodoObj = {
            id: id,
            content: editedTodo,
            created_at : moment(now).format('DD MMM YYYY hh:mm A'),
        }
        dispatch(editTodo(editTodoObj,token));
    }

    return (
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-50 add-todo">
      { loading ? (
        <Loading/>
      ) : (
            <div className="modal-dialog modal-dialog-centered w-100 w-xl-50" role="document">
                      <div className="modal-content">
                          { error ? (
                              <ShowMsg error={error} handleClose={handleEdit}/>
                          ) : (
                              <>
                                <div className="modal-header">
                                <div className="container">
                                    <div className="row">
                                    <div className="col-10 font-weight-bold fs-2">
                                        Edit Todo
                                    </div>
                                    <div className="col-1 fs-2 btn" onClick={handleEdit}>X</div>
                                    </div>
                                </div>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={submit}>
                                        {error && <p>{error}</p>}
                                    <div className="form-group " id="formGroup">
                                            <input
                                            id="edit-todo"
                                            type="text"
                                            className="form-control mb-1" 
                                            placeholder="Edit Todo"
                                            value={editedTodo}
                                            onChange={(e) => setEditedTodo(e.target.value)}
                                            />
                                    </div>
                                    <div className="container">
                                        <div className="row pt-2">
                                            {  (editedTodo !== content && editedTodo) ?(
                                                <input type="submit" className="p-1 btn btn-primary" value="Edit Todo" />
                                            ):(
                                                <input type="submit" className="p-1 btn btn-secondary disabled" value="Edit Todo"/>
                                            )}
                                        </div>
                                    </div>
                                </form>
                                </div>
                        </>
            )}
            </div>
        </div>  
            )}
      </div>
    )
}


export default EditTodo;