import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        isAuthenticated: false,
        user: null
    });

    
    /* Function to check if the user is authenticated
    const checkAuth = async ({email, pass}) => {
        // Fetch the authentication state from the server
        // Assuming '/isAuth' endpoint verifies the JWT token and returns user data if valid
        try {
            const response = await fetch('/isAuth', { method: 'GET' });
            const data = await response.json();
            if (data.isAuthenticated) {
                setAuthState({
                    token: data.token,
                    isAuthenticated: true,
                    user: data.user
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []); */

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};