import React from 'react';
import jwt from 'jsonwebtoken'

const validateToken = (token) =>{
  const currentStatus = (token) ? jwt.decode(token).userStatus === 'active' : {}
  console.log(currentStatus);
  return currentStatus; 
}

  export default validateToken;