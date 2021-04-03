import React, { useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { useHistory,Link } from "react-router-dom";
import { validateToken } from '../actions/userActions';
import Loading from '../components/Loading/Loading'
import { userInfoReducer } from '../reducers/userReducers';
import store from '../store'

const HomeScreen = ({history}) =>{

    const userInfo = useSelector(state => state.userInfo);
    const { loading, error, userData,userStatus } = userInfo ? userInfo : {};
    const token = userData ? userData.token : null;
    const dispatch = useDispatch();
    useEffect(()=>{
        if(userStatus){
            history.push('/userhome');
        }
        else if(userData){
            history.push('/verify-mail');
        }
    },[userStatus,history,token,userData,dispatch])
    return(
        <div className="d-flex flex-column justify-content-center align-items-center vh-90">
            { loading ? (
                <Loading/>
            ) : (
                    <>
                        <div className="d-flex flex-column justify-content-evenly align-items-center h-25">
                            <h2 className="text-center">Welcome to your personalized TODO APP</h2>
                            <Link className="btn btn-outline-primary fs-4" to="/login">Log in</Link>  
                            <Link className="btn btn-outline-primary" to="/register">Register</Link>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default HomeScreen;