import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("authUser")) || null,
    isFetching: false,
    error: false
}


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    // store user state in local storage
    useEffect(() => {
        localStorage.setItem("authUser", JSON.stringify(state.user));
    }, [state.user]);


    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};
