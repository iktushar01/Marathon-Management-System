import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Shared/Loading/Loading";

const PrivateRoutes = ({ children }) => {
  const { user , loading} = useContext(AuthContext);
  const location = useLocation();
  console.log(location)
  if(loading){
    return <Loading/>
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname}  to="/signin"/>;
};

export default PrivateRoutes;
