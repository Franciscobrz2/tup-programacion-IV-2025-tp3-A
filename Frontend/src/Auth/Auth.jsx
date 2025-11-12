import { useState } from "react";
import { createContext, useContext } from "react";
import { dominio } from "../utils/dominio";

const authContext = createContext(null);

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [nombre, setNombre] = useState(null);
    
    const login = async (registro) => {
        try{
            const response = await fetch(`${dominio}/login`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(registro)
            });

            const session = await response.json();

            if(!response.ok && response.status === 400){
                throw new Error(session.error);
            }

            setToken(session.token);
            setNombre(session.nombre);
            return { success: true};
        }catch(err){
            return { success: false };
        }
    }
    
    const logout = () => {
        setToken(null);
        setNombre(null);
    };

    const fetchAuth = async (url, options = {}) => {
        return await fetch(url, 
           { ...options},
        )
    }
    return (
        <authContext.Provider value={{
            token, 
            nombre, 
            login, 
            logout,
            isAuthenticated: !!token,
            fetchAuth,
        }}>
            {children}
        </authContext.Provider>
    );
} 