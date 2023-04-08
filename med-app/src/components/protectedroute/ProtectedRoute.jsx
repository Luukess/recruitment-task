import React, { useContext } from "react";
import { LoginContext } from "../../contexts/loginContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    const { loggedState, setLoggedState } = useContext(LoginContext); 

    if(!loggedState){
        return <Navigate to='/login' />
    };

    return children ? children : <Outlet />
};

export default ProtectedRoute;