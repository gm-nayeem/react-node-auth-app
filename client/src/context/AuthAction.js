export const loginStart = () => (
    {
        type: "LOGIN_START",
    }
);
export const loginSuccessful = (user) => (
    {
        type: "LOGIN_SUCCESSFUL",
        payload: user
    }
);
export const loginFailure = () => (
    {
        type: "LOGIN_FAILURE",
    }
);

export const logout = () => (
    {
        type: "LOGOUT"
    }
);
