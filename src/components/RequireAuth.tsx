import { useContext } from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function RequireAuth() {
    const auth = useContext(AuthContext);  
    const [searchParams] = useSearchParams();
    const continueAsGuest = searchParams.get('continueAsGuest') ? searchParams.get('continueAsGuest') === 'true': false;

  
    if (!auth) {
      return <Navigate to={`/login${continueAsGuest ? '?continueAsGuest=true': ''}`}/>;
    }
  
    return <Outlet />;
  }