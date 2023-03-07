import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponents = () => {
    const auth = localStorage.getItem("UserInfo");
    return auth? <Outlet/>:<Navigate to='/signup'/>
}

export default PrivateComponents;