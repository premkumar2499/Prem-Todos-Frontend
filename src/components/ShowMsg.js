import React from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { clearError } from '../actions/TodoActions';

const ShowMsg = ({error,handleClose}) =>{
    console.log(error);
    const dispatch = useDispatch();
    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 add-todo">
            <div className="modal-dialog modal-dialog-centered w-100 w-xl-50" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-10 font-weight-bold fs-2">
                                {error}
                                </div>
                                <div className="col-1 fs-2 btn" onClick={() => { handleClose(); dispatch(clearError());}}>X</div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row pt-2">
                                <button className="btn btn-primary" onClick={() => { handleClose(); dispatch(clearError());}}>OK</button>
                                {/* onClick={handleClose} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowMsg;