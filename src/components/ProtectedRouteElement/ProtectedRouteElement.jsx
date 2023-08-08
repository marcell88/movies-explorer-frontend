import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, isLoggedIn, isRedirectionActivated, ...props }) => {

    const [isInitialRender, setInitialRender] = React.useState(true);

    React.useEffect(() => {
        setInitialRender(false);
    }, [isLoggedIn]);

    return (
        isInitialRender
            ? <></>
            : isLoggedIn ? <Component {...props} /> : <Navigate to='/' replace />
    )
}

export default ProtectedRouteElement; 