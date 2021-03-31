import React, { useState, useContext, useEffect} from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import Loading from '../components/Loading/Loading'
import { validateEmpty,validateEmail, validatePassword, comparePassword } from "../Validation";

//actions
import {register} from '../actions/userActions'
import { userInfoReducer } from "../reducers/userReducers";
import Messages from "../components/Messages";


const RegisterScreen = ({ location, history }) =>{
    

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    //setErrors
    const [firstNameError,setFirstNameError] = useState(undefined);
    const [lastNameError,setLastNameError] = useState(undefined);
    const [emailError, setEmailError] = useState(undefined);
    const [passwordError, setPasswordError] = useState(undefined);
    const [confirmPasswordError,setConfirmPasswordError] = useState(undefined);
    const [errorMsg, setErrorMsg] = useState([]);

    //set Button state
    const [btnState,setBtnState] = useState(false);

    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.userInfo);
    const { loading, status, userData,userStatus} = userInfo ? userInfo : {};
    const {success,error,msg} = status ? (status.register ? status.register : {}) : {};

    useEffect(()=>{
        if(userStatus){
            history.push("/userhome");
        }
        else if(userData){
            history.push("/verify-mail");
        }
        if(error){
            setBtnState(false);
            setFirstNameError(undefined);
            setLastNameError(undefined);
            setEmailError(undefined);
            setPasswordError(undefined);
            setConfirmPasswordError(undefined);
        }
    },[userStatus,history,error,userInfo,userData]);

    useEffect(()=>{
      const mountRegister = () =>{
        console.log(error);
        if(firstNameError === null && lastNameError === null && emailError === null && passwordError === null && confirmPasswordError === null){
            setBtnState(true);
        }
        else{
            setBtnState(false);
        }
      }
      mountRegister()
    }, [firstNameError,lastNameError,emailError,passwordError,confirmPasswordError,error]);

    const submit = async (e) => {
        e.preventDefault();
        await dispatch(register(firstName,lastName, email, password, confirmPassword))
        // if(!error){
        //   history.push("/verify-mail");    
        // }
      };

    return(
      <div className="d-flex justify-content-center align-items-center vh-100">
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
                                  Prem Todos
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-body">
                            {msg && <Messages error={error} msg={msg}/>}
                            {/* {error && <div class="alert alert-danger">{error}</div>} */}
                            <form onSubmit={submit}>
                              <div className="form-group mb-1" id="formGroup">
                                <input
                                id="first-name"
                                placeholder="First Name"
                                className="form-control" 
                                type="text"
                                onChange={(e) => validateEmpty(e.target.value) ? 
                                  (setFirstName(e.target.value),setFirstNameError(null)) : (setFirstNameError("Firstname is required"))}
                                />
                                <small id="emailHelp" className="form-text text-danger mb-2">{firstNameError}</small>
                              </div>

                              <div className="form-group mb-1" id="formGroup">
                                <input
                                id="last-name"
                                placeholder="Last Name"
                                className="form-control" 
                                type="text"
                                onChange={(e) => validateEmpty(e.target.value) ? 
                                  (setLastName(e.target.value),setLastNameError(null)) : (setLastNameError("Lastname is required"))}
                                />
                                <small id="emailHelp" className="form-text text-danger mb-2">{lastNameError}</small>
                              </div>
                              <div className="form-group mb-1" id="formGroup">
                                      <input
                                        id="email"
                                        type="email"
                                        className="form-control" 
                                        aria-describedby="emailHelp"
                                        placeholder="E-mail"
                                        // onChange={(e) => setEmail(e.target.value)}
                                        onChange={(e) => validateEmail(e.target.value) ?
                                          (setEmailError(null),setEmail(e.target.value)) : (setEmailError("E-mail is required"))}
                                       />
                                       <small id="emailHelp" className="form-text text-danger mb-2">{emailError}</small>
                              </div>
                              <div className="form-group mb-1" id="formGroup">
                                  <input
                                      id="password"
                                      type="password"
                                      className="form-control"
                                      placeholder="Password"
                                      // onChange={(e) => setPassword(e.target.value)}
                                      onChange={(e) => validatePassword(e.target.value) ? 
                                        (setPasswordError(null),setPassword(e.target.value)) : (setPasswordError("Add 1 special character, 1 number, 1 A-Z letter, 1 a-z leeter, min 8 characters"),setConfirmPassword(undefined))}
                                      />
                                      <small id="emailHelp" className="form-text text-danger mb-2">{passwordError}</small>
                              </div>
                              <div className="form-group mb-1" id="formGroup">
                                <input
                                  type="password"
                                  placeholder="Confirm Password"
                                  className="form-control" 
                                  onChange={(e) => comparePassword(password,e.target.value) ? 
                                    (setConfirmPasswordError(null),setConfirmPassword(e.target.value)) : (setConfirmPasswordError("Passwords do not match"))}
                                  />
                                  <small id="emailHelp" className="form-text text-danger mb-2">{confirmPasswordError}</small>
                                </div>
                              <div className="container">
                                <div className="row pt-2">
                                  {(btnState) ? (
                                    <input type="submit" className="p-1 btn btn-primary" value="Register"/>
                                  ):(
                                    <input type="submit" className="p-1 btn btn-secondary disabled" value="Register"/>
                                  )}
                                  
                                </div>
                              </div>
                              
                              <div className="container pt-2">
                                <div className="row">
                                    {/* <div className="col text-left">
                                        <Link to="/forget-password" className="active" style={{color: '#1a2e35'}}><i className="fa fa-user-plus"></i>Forgetten-Password?</Link>
                                        <button style="background-color: #1a2e35;" className="btn btn-primary">Log In</button> 
                                    </div> */}
                                    <div className="col text-right">
                                        <small className="form-text">Have An account?</small>
                                        <Link to="/login" className="active" style={{color: '#1a2e35'}}><i className="fa fa-user-plus"></i>Login</Link>
                                    </div>
                                </div>
                              </div>
                            </form>
                          </div>
                    </div>
                </div>
              </>            
          )}
          </div>
    )
}

export default RegisterScreen;