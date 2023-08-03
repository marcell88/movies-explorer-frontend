import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, isLoggedIn, isRedirectionActivated, ...props }) => {

    return (
        (!isRedirectionActivated || isLoggedIn) ? <Component {...props} /> : <Navigate to="/signin" replace />
    )
}

export default ProtectedRouteElement; 