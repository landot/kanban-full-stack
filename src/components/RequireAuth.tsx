import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function RequireAuth() {
    const auth = useContext(AuthContext);  
    console.log(auth);

  
    if (!auth) {
      console.log('auth not found. redirecting to login')
      return <Navigate to="/login"/>;
    }
  
    return <Outlet />;
  }