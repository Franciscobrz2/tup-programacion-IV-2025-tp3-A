import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../Auth/Auth.jsx";
import { useNavigate, useParams } from "react-router";
import { dominio } from "../../utils/dominio.js";
import useNotas from "../../api/notas.jsx";
import useAlumnos from "../../api/alumnos.jsx";
import useMaterias from "../../api/materias.jsx";
import { Select } from "../Select/Select.jsx";

export const Crear = () => {
  console.log("en crear")
  const { fetchAuth } = useAuth();
  const {ruta} = useParams();
  const {getNotas } = useNotas();
  const { getAlumnos } = useAlumnos();
  const { getMaterias } = useMaterias();
  const navigate = useNavigate();
  const [errores, setErrores] = useState(null);

  const url = `${dominio}/${ruta}`;

  const [values, setValues] = useState(null);
  const [columnas, setColumnas] = useState([]);
  const [listaMaterias, setListaMaterias] = useState([]);
  const [listaAlumnos, setListaAlumnos] = useState([]);

  const fetchData = useCallback(async () => {
    if("notas" === ruta){
      const [nota, alumno, materia] = await Promise.all([
        getNotas(),
        getAlumnos(),
        getMaterias(),
      ])
      if(!nota.success || !alumno.success || !materia.success ){
        return console.error("Error al obtener datos.",nota, alumno, materia)
      }
      setColumnas(nota.columnasNota)
      setValues( () => {
        return nota.columnasNota.reduce((acc,item) => (
          {...acc,[item]: ""}
        ),{}) 
      })
      setListaAlumnos(alumno.alumnos)
      setListaMaterias(materia.materias)
      return
    }

    //si no es notas

    const response = await fetchAuth(url);
    const data = await response.json();
    if (!response.ok || !data.success) {
      console.log(`Error al consultar por ${ruta} `, data.error);
      return;
    }
    //si en el back devuelve como data/columnas se saca el if
    if("alumnos" === ruta){
      setValues(() => {
        return data.columnasAlumno.reduce((acc,item) => (
          {...acc,[item]: ""}
        ),{})  
      });
      setColumnas(data.columnasAlumno);
    }else{
      setValues(() => {
        return data.columnasMateria.reduce((acc,item) => (
          {...acc,[item]: ""}
        ),{}) 
      });
      setColumnas(data.columnasMateria);
    }
    
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!values) {
    return null;
  }

  //crea un arreglo con objetos con key, label con nombre de las columnsa como valores
  const columnasProps = columnas?.filter(c => c !== "id")
    .reduce((acc, col) =>
      [...acc,{
        key: col, 
        //se pone mayuscula la primera letra y se saca el _id 
        label: (col.charAt(0).toUpperCase() + col.slice(1)).split("_id")[0] }
      ]
    ,[]
  )
  console.log(values)
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores(null);
    console.log(values)
    const response = await fetchAuth(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log("error",data.errors)
    if (!response.ok || !data.success) {
      console.error(data)
      if (response.status === 400) {
        return setErrores(data.errors);
      }
      return window.alert("Error al crear usuario");
    }
    navigate(`/${ruta}`);
  };

  return (
    <article>
      <h2>Crear {ruta}</h2>
       <form onSubmit={handleSubmit}>
          <fieldset>
            {columnasProps?.map((col, i) =>(
              <label key={i}>
                {col.label}
                
                { col.key.includes("_id") ? 
                ( col.key.includes("alumno") ?
                  <Select 
                    keys={i} 
                    lista={listaAlumnos} 
                    isSelected = {"Alumnos"} 
                    onChange={(e) =>{
                      let nuevoValues = {...values}
                      nuevoValues= {...nuevoValues, [col.key]: e.target.value};
                      setValues(nuevoValues);
                    }} 
                    error={errores?.find(e => e.path === col.key)?.msg}
                  />
                : 
                  <Select 
                    keys={i} 
                    lista={listaMaterias} 
                    isSelected = {"Materias"}
                    onChange={(e) =>{
                      let nuevoValues = {...values}
                      nuevoValues= {...nuevoValues, [col.key]: e.target.value};
                      setValues(nuevoValues);
                    }} 
                    error={errores?.find(e => e.path === col.key)?.msg}
                  />
                ):
                (
                  <>
                    <input 
                      disabled={ col.key === "id"} 
                      required 
                      value={values[col.key]} 
                      onChange={(e) =>{
                        let nuevoValues = {...values}
                        nuevoValues= {...nuevoValues, [col.key]: e.target.value};
                        setValues(nuevoValues);
                      }} 
                      aria-invalid={
                        errores && errores.some((e) => e.path === col.key)  
                      }
                    />
                    {errores?.filter(e => e.path === col.key)
                      .map((err, i) => (
                        <small key={i} style={{ color: "red" }}>{err.msg}</small>
                      ))
                    }
                  </>

                )
                }
              </label>
            ))}
          </fieldset>
          <button type="submit">Crear {ruta}</button>
        </form>
    </article>
  );
};