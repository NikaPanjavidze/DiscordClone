import React, { useEffect } from "react";
import { useMeQuery } from "../features/auth/queries";
import Loading from "./shared/Loading";
import { useAuthStore } from "../store/auth.store";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const initSocket = useAuthStore((state) => state.initSocket);
  const socket = useAuthStore((state) => state.socket);

  const { data, isLoading, isError } = useMeQuery();

  useEffect(() => {
    if (data) {
      setUser(data.user);
      if (!socket) {
        initSocket();
      }
    }
  }, [setUser, data]);

  //Show loading while fetching /me
  if (isLoading) {
    return <Loading />;
  }

  // Redirect if user is not logged in
  if (isError || (!user && !data)) {
    return <Navigate to="/login" replace />;
  }

  //Return the private route
  return children;
};

export default PrivateRoute;
