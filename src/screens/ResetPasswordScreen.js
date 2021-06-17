import React, { useState, useEffect,useCallback } from "react";
import { useDispatch,useSelector } from "react-redux";
import { forgetPassword,resetPassword } from "../actions/userActions";

import Loading from '../components/Loading/Loading'

//Constants
import { comparePassword, validateEmpty, validatePassword } from "../Validation";


const ResetPasswordScreen = ({history}) =>{
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [code, setCode] = useState();
    const [passwordError, setPasswordError] = useState(undefined);
    const [confirmPasswordError,setConfirmPasswordError] = useState(undefined);
    const [codeError, setCodeError] = useState(undefined);
    const [isSending,setIsSending] = useState(false);
    const [btnState, setBtnState] = useState(false);

    const userInfo = useSelector((state) => state.userInfo);
    const { loading, status, userData,userStatus} = userInfo ? userInfo : {};
    const {success : forgetPasswordSuccess,msg : forgetPasswordmsg,userEmail} = status ? (status.forgetPassword ? status.forgetPassword : {}) : {};
    const {success : resetPasswordSuccess,error : resetPasswordError ,msg : resetPasswordmsg} = status ? (status.resetPassword ? status.resetPassword : {}) : {};
    

    const dispatch = useDispatch();

    useEffect(()=>{
        // console.log(userStatus);
        if(userStatus){
            history.push('/userhome');
        }
        else if(userData){
          history.push('/verify-mail');
        }
        else if(resetPasswordSuccess){
            history.push('/login');
        }
        else if(!userEmail){
            history.push('/forget-password');
        }
        if(resetPasswordError){
          setBtnState(false);
          setPasswordError(undefined);
          setConfirmPasswordError(undefined);
          setCodeError(undefined);
        }
    },[history,userStatus,userData,userEmail,resetPasswordError,resetPasswordSuccess]);
    
    useEffect(()=>{
      // console.log(passwordError,confirmPasswordError,codeError);
      const mountResetPassword = () =>{
        if(passwordError === null && confirmPasswordError === null && codeError === null){
          setBtnState(true);
        }
        else{
          setBtnState(false);
        }
      }
      mountResetPassword();
    },[passwordError,confirmPasswordError,codeError,isSending]);

    const submit = async (e) => {
      e.preventDefault();
      dispatch(resetPassword(userEmail,password,confirmPassword,code));
    };
    const ResendRequest = useCallback(async () => {
        
        if (isSending) return
        
        setIsSending(true)
        dispatch(forgetPassword(userEmail));
        setIsSending(false)
      }, [isSending,dispatch,userEmail]) // update the callback if the state changes
    

    return(
      <div className="d-flex justify-content-center align-items-center vh-90">
          {loading?(
            <Loading/>
          ):(
            <>
                <div className="modal-dialog modal-dialog-centered custom-box" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <div className="container">
                              <div className="row">
                                <div className="col font-weight-bold fs-2">
                                  <p className="fs-5">Reset Your Password</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-body">
                                {resetPasswordError ? (
                                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <small>{resetPasswordmsg}</small>
                                  </div>
                                ) : (
                                   forgetPasswordSuccess && <div className="alert alert-success alert-dismissible fade show" role="alert">
                                     <small>{forgetPasswordmsg}</small>
                                  </div>
                                )}
                            <form onSubmit={submit}>
                              <div className="form-group mb-2" id="formGroup">
                                      <input
                                        id="email"
                                        type="email"
                                        className="form-control disabled" 
                                        aria-describedby="emailHelp"
                                        placeholder="E-mail"
                                        defaultValue={userEmail}
                                        disabled={true}
                                      />
                              </div>
                              <div className="form-group mb-2" id="formGroup">
                                  <input
                                      id="password"
                                      type="password"
                                      className="form-control"
                                      placeholder="Password"
                                      onChange={(e) => validatePassword(e.target.value) ? (
                                        setPassword(e.target.value),setPasswordError(null)                                        
                                      ) : (
                                        setPasswordError("Add 1 special character, 1 number, 1 A-Z letter, 1 a-z leeter, min 8 characters")
                                      )}
                                  />
                                  <small id="emailHelp" className="form-text text-danger mb-2">{passwordError}</small>
                              </div>
                              <div className="form-group mb-2" id="formGroup">
                                <input
                                  type="password"
                                  placeholder="Confirm Password"
                                  className="form-control" 
                                  onChange={(e) => comparePassword(password,e.target.value) ? (
                                    setConfirmPassword(e.target.value),setConfirmPasswordError(null)                                        
                                  ) : (
                                    setConfirmPasswordError("Password do not match")
                                  )}
                                  />
                                  <small id="emailHelp" className="form-text text-danger mb-2">{confirmPasswordError}</small>
                                </div>
                                <div className="form-group mb-2" id="formGroup">
                                  <input
                                    id="code"
                                    type="text"
                                    placeholder="Enter Code"
                                    className="form-control" 
                                    onChange={(e) => validateEmpty(e.target.value) ? (
                                      setCode(e.target.value.trim()),setCodeError(null)                                        
                                    ) : (
                                      setCodeError("Enter Code")
                                    )}
                                    />
                                    <small id="emailHelp" className="form-text text-danger mb-2">{codeError}</small>
                                </div>      
                              <div className="container">
                                <div className="row pt-2">
                                  { btnState ? (
                                    <input type="submit" className="p-1 btn btn-primary" value="Submit"/>
                                  ) : (
                                    <input type="submit" className="p-1 btn btn-secondary disabled" value="Submit"/>
                                  )}
                                </div>
                              </div>
                              <button className="btn btn-success form-control mt-2" onClick={ResendRequest}>Resend Code</button>
                            </form>
                          </div>
                    </div>
                </div>
              </>            
          )}
          </div>
    )
}

export default ResetPasswordScreen;