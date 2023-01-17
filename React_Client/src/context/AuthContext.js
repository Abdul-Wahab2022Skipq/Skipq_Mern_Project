import React from "react";
import AuthReducer from "./AuthReduce";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
INITIAL_STATE.user = userInfo;

export const AuthContext = React.createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(AuthReducer, INITIAL_STATE);

  React.useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(state.user));
  });
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
