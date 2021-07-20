import jwt from 'jsonwebtoken'

const validateToken = (token) =>{
  const currentStatus = (token) ? jwt.decode(token).userStatus === 'active' : {}
  return currentStatus; 
}

export default validateToken;