import React, { useState,useEffect, useCallback } from "react";
import { useParams,Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'

import Loading from "../components/Loading/Loading";

import { activateAccount, logout, UserVerifyMail } from "../actions/userActions";

const ActivateAccountScreen = ({history}) =>{
    const userInfo = useSelector(state => state.userInfo);
    const [isSending,setIsSending] = useState(false);
    const { loading, status, userData,userStatus} = userInfo ? userInfo : {};
    const {success,msg} = status ? (status.activateAccount ? status.activateAccount : {}) : {};
    const [setIsLoading] = useState(false);
    const { userId,secretCode } = useParams();
    const dispatch = useDispatch();
    

    const token = userData ? userData.token : null;
    useEffect(()=>{
        if(userData && !userStatus){
            dispatch(activateAccount(userId,secretCode));
        }
    },[userStatus,userData,dispatch,secretCode,userId,setIsLoading])
    const ResendRequest = useCallback(async () => {
        if (isSending) return
    
        setIsSending(true)


        dispatch(UserVerifyMail(token))

        setIsSending(false)
      }, [isSending,token,dispatch]) // update the callback if the state changes
    return(
        <div className="d-flex justify-content-center align-items-center vh-90">
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