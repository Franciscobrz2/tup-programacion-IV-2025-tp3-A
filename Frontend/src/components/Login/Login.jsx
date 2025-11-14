import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../Auth/Auth";
import { useNavigate } from "react-router";

export const Login = () => {
    const navigator = useNavigate();
    const valoresIniciales = {
        email: "",
        password: "",
    }
    const [values, setValues] = useState(valoresIniciales);
    const { error, login } = useAuth();
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setValues( (p) => (
        {...p, 
            [name]: value
        }
        ))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("envia", values)
        const verificar = await login(values)
        console.log("s",verificar)
        if(verificar.success){
            navigator("/")     
        }
        
    };
    console.log("->>>",error)
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input 
                        required
                        type="email" 
                        name="email"  
                        value={values?.email}
                        onChange={handleChange}
                        className=""
                        placeholder="@ejemplo.com"
                        aria-invalid={
                            error  && error.some((e) => e?.path === "email")
                        }
                    />
                    {error && (
                        <small>
                            {error
                            .filter((e) => e?.path === "email")
                            .map((e) => e?.msg)
                            .join(", ")}
                        </small>
                    )}
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        required
                        type="password" 
                        name="password"  
                        value={values?.password}
                        onChange={handleChange}
                        className=""
                        placeholder="contraseña"
                        aria-invalid={
                            error && error.some((e) => e?.path === "password")
                        }
                    />
                    {error && (
                        <small>
                            {error
                            .filter((e) => e?.path === "password")
                            .map((e) => e?.msg)
                            .join(", ")}
                        </small>
                    )}
                    {error && (
                        <small style={{color:"red"}}>
                            {error
                            .map((e) => e?.session)
                            }
                        </small>
                    )}
                    <label>No tienes cuenta?</label>
                    <Link to="/register">
                        Crear ahora
                    </Link>
                    <button type="submit">Iniciar sesion</button>
                </form>

            </div>
        </>
    );
}