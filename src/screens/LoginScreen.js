import React, { useState, useContext, useEffect } from "react";
import { useHistory,Link } from "react-router-dom";
import Axios from "axios";

import {HOST_URL} from '../constants/appConstants';
import { useDispatch,useSelector } from "react-redux";

import Loading from '../components/Loading/Loading'
import { validateEmail, validateEmpty } from '../Validation'
import { login } from '../actions/userActions'
import { userInfoReducer } from "../reducers/userReducers";
import Messages from "../components/Messages";

const LoginScreen = ({ location, history }) =>{
    
    const [email, setEmail] = useState();
    const [emailError,setEmailError] = useState(undefined);
    const [passwordError,setPasswordError] = useState(undefined);
    const [btnState,setBtnState] = useState(false)
    const [password, setPassword] = useState();
    // const [error, setError] = useState([]);
    const userInfo = useSelector((state) => state.userInfo);
    // const isLoggedIn = useSelector((state) => state.isLoggedIn);
    // console.log(userData,isLoggedIn);
    console.log(userInfo);
    const { loading, status, userData,userStatus} = userInfo ? userInfo : {};
    const {success,error,msg} = status ? (status.login ? status.login : {}) : {};
    const {error : resetPasswordError, msg : resetPasswordMsg} = status ? (status.resetPassword ? status.resetPassword : {}) : {};
    const dispatch = useDispatch()

    
    useEffect(()=>{
      console.log(userStatus);
      if(userStatus){
          history.push('/userhome');
      }
      else if(userData){
        history.push('/verify-mail');
      }
      if(error){
        setBtnState(false);
        setEmailError(undefined);
        setPasswordError(undefined);
      }
    },[history,userStatus,userData,error])

    useEffect(()=>{
        const checkCredentials = () =>{
          if(emailError === null && passwordError === null){
              setBtnState(true);
          }
          else{
            setBtnState(false);
          }
        }
        checkCredentials();
      },[emailError,passwordError,btnState,error]);

      

    const submit  = (e) =>{
        e.preventDefault()
        dispatch(login(email, password));
    }
    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
            { loading ? (
                 <Loading/>
             ) : (
                <>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <div className="container">
                              <div className="row">
                                <div className="col font-weight-bold fs-2">
                                  Prem Todos
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-body">
                            { (resetPasswordError === false) ? (
                              <Messages error={resetPasswordError} msg={resetPasswordMsg} />
                            ) : (
                              msg && <Messages error={error} msg={msg}/>
                            )}
                              <form onSubmit={submit}>
                              <div className="form-group " id="formGroup">
                                      <input
                                      id="email"
                                      type="email"
                                      className="form-control mb-1" 
                                      aria-describedby="emailHelp"
                                      placeholder="E-mail"
                                      // onChange={(e) => setEmail(e.target.value)}
                                      // onChange={(e) => checkMail(e.target.value)}
                                      onChange={(e) => validateEmail(e.target.value) ?
                                         (setEmailError(null),setEmail(e.target.value)) : (setEmailError("Enter valid E-mail"))}
                                      />
                                <small id="emailHelp" className="form-text text-danger mb-2">{emailError}</small>
                              </div>
                              <div className="form-group">
                                <input
                                        id="password"
                                        type="password"
                                        className="form-control mb-1"
                                        placeholder="Password"
                                        // onChange={(e) => setPassword(e.target.value)}
                                        onChange={(e) => validateEmpty(e.target.value) ? 
                                          (setPasswordError(null),setPassword(e.target.value)) : (setPasswordError("Password is required"))}
                                        />
                                  <small id="emailHelp" className="form-text text-danger mb-2">{passwordError}</small>
                              </div>
                              <div className="container">
                                <div className="row pt-2">
                                  {  btnState ?(
                                    <input type="submit" className="p-1 btn btn-primary" value="Login" />
                                  ):(
                                    <input type="submit" className="p-1 btn btn-secondary disabled" value="Login" />
                                  )}
                                  
                                </div>
                              </div>
                              
                              <div className="container pt-2">
                                <div className="row">
                                    <div className="col text-left">
                                        <Link to="/forget-password" className="active" style={{color: '#1a2e35'}}><i className="fa fa-user-plus"></i>Forgetten-Password?</Link>
                                        {/* <button style="background-color: #1a2e35;" className="btn btn-primary">Log In</button> */}
                                    </div>
                                    <div className="col text-right">
                                        <small className="form-text">Don't have An account?</small>
                                        <Link to="/register" className="active" style={{color: '#1a2e35'}}><i className="fa fa-user-plus"></i>Register here</Link>
                                    </div>
                                </div>
                              </div>
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

export default LoginScreen;