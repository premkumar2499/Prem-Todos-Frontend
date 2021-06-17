import React, { useState,  useEffect } from "react";

import Loading from "../components/Loading/Loading";

//Constants
import { useDispatch,useSelector } from "react-redux";
import { validateEmail } from "../Validation";

import {forgetPassword} from '../actions/userActions'

const ForgetPasswordScreen = ({history}) =>{
    
    const [emailError,setEmailError] = useState(undefined);
    const [email,setEmail] = useState(undefined);
    const userInfo = useSelector((state) => state.userInfo);
    const { loading, status, userData,userStatus} = userInfo ? userInfo : {};
    const {error,msg,userEmail} = status ? (status.forgetPassword ? status.forgetPassword : {}) : {};
    
    const dispatch = useDispatch();
    useEffect(()=>{
        // console.log(userStatus);
        if(userStatus){
            history.push('/userhome');
        }
        else if(userData){
          history.push('/verify-mail');
        }
        else if(userEmail){
            history.push('/reset-password');
        }
        else if(error){
            setEmailError(undefined);            
        }
    },[history,userStatus,userData,userEmail,error]);

    const submit = async (e) => {
      e.preventDefault();
      dispatch(forgetPassword(email));
    };
    

    return(
            <div className="d-flex justify-content-center align-items-center vh-90">
                    { loading ? (
                        <Loading/>
                    ) : (
                        <>
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    
                                    <div className="modal-header">
                                        <p className="fs-3">Get Password Reset Code</p>
                                    </div>
                                    <div className="modal-body">
                                    {msg && <div className="alert alert-danger">{msg}</div>}
                                        <form onSubmit={submit}>
                                        <div className="form-group">
                                            <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter E-mail"
                                            onChange={(e) => validateEmail(e.target.value) ? (
                                                setEmail(e.target.value),setEmailError(null)
                                                ) : (
                                                    setEmailError("E-mail is required")                                                   
                                            )
                                            }
                                            />
                                            <small id="emailHelp" className="form-text text-danger mb-2">{emailError}</small>
                                        </div>
                                            { (emailError || emailError === undefined) ? (
                                                <input type="submit" className="btn btn-secondary mt-4 disabled" value="Send Code" />
                                            ) : (
                                                <input type="submit" className="btn btn-success mt-4" value="Send Code" />
                                            ) }
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                        )
                    }
                </div>
    )
}

export default ForgetPasswordScreen;