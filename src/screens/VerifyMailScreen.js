import React, { useState,useEffect, useContext,useCallback } from "react";
import { useHistory } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import Axios from "axios";

import Loading from "../components/Loading/Loading";

import { HOST_URL } from '../constants/appConstants'
import { UserVerifyMail } from "../actions/userActions";

const VerifyMailScreen = ({history}) =>{
    const userInfo = useSelector(state => state.userInfo);
    console.log(userInfo);
    const [isSending,setIsSending] = useState(false);
    const { loading, status, userData,userStatus} = userInfo ? userInfo : {};
    const {success,error,msg} = status ? (status.verifyMail ? status.verifyMail : {}) : {};
    const [isLoading,setIsLoading] = useState(false);
    const dispatch = useDispatch();
    

    const token = userData ? userData.token : null;
    useEffect(()=>{
            if(userStatus){
                history.push('/userhome');
            }
            else if(userData && !userStatus){
                setIsLoading(true);
                dispatch(UserVerifyMail(token));
                // await Axios.get(`${HOST_URL}/api/auth/verification/get-activation-email`, { headers: {"Authorization" : `Bearer ${token}`} })
                // .then((res)=>{
                //     console.log(res);
                // })
                // .catch(err=>{
                //     console.log(err);
                // })
                setIsLoading(false);
            }
            else{
                history.push('/');
            }
    },[userStatus,userData,dispatch,history,token])
    const ResendRequest = useCallback(async () => {
        // don't send again while we are sending
        if (isSending) return
        // update state
        setIsSending(true)
        setIsLoading(true);
        dispatch(UserVerifyMail(token))
        // send the actual request
        // await Axios.get(`${HOST_URL}/api/auth/verification/get-activation-email`, { headers: {"Authorization" : `Bearer ${token}`} })
        // .then((res)=>{
        //     console.log(res);
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
        // once the request is sent, update state again
        setIsSending(false)
        setIsLoading(false);
      }, [isSending,token,isLoading,dispatch]) // update the callback if the state changes
    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
        { loading || isLoading ? (
            <Loading/>
        ) : (
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        { error ? (
                            <p className="fs-3">{msg}</p>
                        ):(
                            <p className="fs-3">{msg}</p>
                        )}
                        
                        <button className="btn btn-success" onClick={ResendRequest}>Resend Mail</button>
                    </div>
                </div>
            </div>
        )}
        </div>
    )
    
}

export default VerifyMailScreen;