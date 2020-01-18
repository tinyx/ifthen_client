import React from "react";
import useAuth from "../hooks/useAuth";
import UserContext from "./AuthContext";

const AuthContainer = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <>
      <div>
        User Status:{" "}
        {user?.email || (
          <a href={`http://auth.yitao.io/?redirect=${window.location}`}>
            Login
          </a>
        )}
        {user?.email && <button onClick={logout}>Logout</button>}
      </div>
      <UserContext.Provider value={{ ...user }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export default AuthContainer;
