import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

import {useSelector,useDispatch} from 'react-redux'

import moment from 'moment'
import Loading from './Loading/Loading';
import ShowMsg from './ShowMsg';
import { addTodo } from '../actions/TodoActions';

const AddTodo = ({setOpenAddTodo, handleAddTodo}) => {

    const userInfo = useSelector(state => state.userInfo);
    const {  userData } = userInfo ? userInfo : {};
    const token = userData ? userData.token : null;

    const userTodos = useSelector(state => state.todos);
    const { loading,error } = userTodos;


    const [newTodo, setNewTodo] = useState(undefined);
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(error){
            setNewTodo(undefined);
        }
    },[error])

  
    const submit = async(e) =>{
        e.preventDefault();
        const now = new Date();
        const newTodoObj = {
            id: uuidv4(),
            content: newTodo,
            created_at : moment(now).format('DD MMM YYYY hh:mm A'),
            completed:false
        }
        dispatch(addTodo(newTodoObj,token));
    }

    return (
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-50 add-todo">
      { loading ? (
        <Loading/>
      ) : (
            <div className="modal-dialog modal-dialog-centered w-100 w-xl-50" role="document">
                <div className="modal-content">
                        { error ? (
                          <ShowMsg error={error} handleClose={handleAddTodo}/>
                        ) : (
                          <>
                          <div className="modal-header">
                            <div className="container">
                                <div className="row">
                                  <div className="col-10 font-weight-bold fs-2">
                                    Add Todo
                                  </div>
                                  <div className="col-1 fs-2 btn" onClick={handleAddTodo}>X</div>
                                </div>
                              </div>
                          </div>
                          <div className="modal-body">
                              <form onSubmit={submit}>
                                  {error && <p>{error}</p>}
                                <div className="form-group " id="formGroup">
                                      <input
                                      id="add-todo"
                                      type="text"
                                      className="form-control mb-1" 
                                      placeholder="Add Todo"
                                      onChange={(e) => setNewTodo(e.target.value.trim())}
                                      />
                                </div>
                                <div className="container">
                                    <div className="row pt-2">
                                        {  newTodo ?(
                                            <input type="submit" className="p-1 btn btn-primary" value="Add Todo" />
                                        ):(
                                            <input type="submit" className="p-1 btn btn-primary disabled" value="Add Todo"/>
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


export default AddTodo