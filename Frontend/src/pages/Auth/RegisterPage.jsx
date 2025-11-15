import { useState } from "react";
import {Link} from "react-router";
import useUsuarios from "../../api/usuarios.jsx";
import { useNavigate } from "react-router";

export const RegisterPage = () => {
  const { postUsuarios, errores } = useUsuarios();
  // const [errores, setErrores] = useState(null);
  const navigate = useNavigate();
  const valoresIniciales = {
    nombre: "",
    email: "",
    password: "",
  }
  const [values, setValues] = useState(valoresIniciales);
  const handleChange = (e) => {
    const {name, value} = e.target
    setValues( (p) => (
      {...p, 
        [name]: value
      }
    ))
  }
  console.log(values)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // setErrores(null);
    console.log(values)
    const result = await postUsuarios(values)
   
    if (!result.success) {
      return console.error(result)
    }
    setValues(valoresIniciales)
    navigate(`/login`);
  };
  console.log("er", errores)
  return(
    <>
      <h1>Crear cuenta</h1>
      <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre</label>
            <input 
              required
              type="text" 
              name="nombre"  
              value={values?.nombre}
              onChange={handleChange}
              className=""
              placeholder="nombre"
              aria-invalid={
                errores && errores.some((e) => e.path === "nombre")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "nombre")
                  .map((e) => e.msg)
                  .join(", ")
                }
              </small>
            )}
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
                errores && errores.some((e) => e.path === "email")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "email")
                  .map((e) => e.msg)
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
                errores && errores.some((e) => e.path === "password")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "password")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
            <Link to="/login">
              Ya estoy registrado
            </Link>
            <button type="submit">Crear</button>
        </form>
        {/* {errores?.filter(e => e.path === col.key)
          .map((err, i) => (
            <small style={{ color: "red" }}>{err.msg}</small>
          ))
        } */}
      </div>
    </>
  );
}