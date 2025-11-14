import { useState } from "react";
import { createContext, useContext } from "react";
import { dominio } from "../utils/dominio";

const authContext = createContext(null);

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [error, setError] = useState(null);

    const login = async (registro) => {
        setError(null);
        try{
            const response = await fetch(`${dominio}/auth/login`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(registro)
            });

            const session = await response.json();

            if(!response.ok && response.status === 400){
                setError(session.errors > 0 ? session.errors: session.errors);
                throw new Error(session.errors);
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
        if(!token){
            throw Error("No inicio session")
        }   
        return await fetch(url, 
            // {...options}
            { ...options,
            headers: { ...options.headers, Authorization: `Bearer ${token}` }
            },
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
            error,
        }}>
            {children}
        </authContext.Provider>
    );
} 

export const AuthPage = ({children}) => {
    const {isAuthenticated} = useAuth();
    if(!isAuthenticated){
        return <h4>Ingrese para ver esta pagina</h4>
    }
    return children;
}
export const ProtectedComponents = ({children}) => {
    const {isAuthenticated} = useAuth();
    if(!isAuthenticated){
        return null
    }
    return children;
}