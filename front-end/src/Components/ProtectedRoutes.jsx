import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const ProtectedRoutes = ({ user, children }) => {

if (!user) {
  return <Navigate to='/' replace={true} />
}

return children ;
};

export default ProtectedRoutes;
