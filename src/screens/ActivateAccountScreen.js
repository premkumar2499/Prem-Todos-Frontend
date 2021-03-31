import React, { useState,useEffect, useCallback } from "react";
import { useParams,Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'

import Loading from "../components/Loading/Loading";

import { activateAccount, logout, UserVerifyMail } from "../actions/userActions";

const ActivateAccountScreen = ({history}) =>{
    const userInfo = useSelector(state => state.userInfo);
    const [isSending,setIsSending] = useState(false);
    const { loading, status, userData,userStatus} = userInfo ? userInfo : {};
    const {success,error,msg} = status ? (status.activateAccount ? status.activateAccount : {}) : {};
    const [isLoading,setIsLoading] = useState(false);
    const { userId,secretCode } = useParams();
    const dispatch = useDispatch();
    

    const token = userData ? userData.token : null;
    useEffect(()=>{
        if(userData && !userStatus){
            setIsLoading(true);
            dispatch(activateAccount(userId,secretCode));
            setIsLoading(false);
        }
        // else{
        //     history.push('/userhome');
        // }
    },[userStatus,userData,dispatch])
    const ResendRequest = useCallback(async () => {
        if (isSending) return
    
        setIsSending(true)
        setIsLoading(true);

        dispatch(UserVerifyMail(token))

        setIsSending(false)
        setIsLoading(false);
      }, [isSending,token,isLoading]) // update the callback if the state changes
    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
            { loading? (
                <Loading/>
            ) : (    
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                        { success ? (
                            <>
                                <h1>{msg}</h1>
                                <Link className="btn btn-primary" to="/login" onClick={()=>{dispatch(logout())}}>Login</Link>
                            </>
                        ):(
                            <>
                                <h1>{msg}</h1>
                                <button className="btn btn-success" onClick={ResendRequest}>Resend Mail</button>
                            </>
                        )}                        
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
    
}

export default ActivateAccountScreen;