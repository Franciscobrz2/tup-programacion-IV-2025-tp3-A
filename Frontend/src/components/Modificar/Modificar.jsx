import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../Auth/Auth";
import { useNavigate, useParams } from "react-router";
import { dominio } from "../../utils/dominio";
import { Select } from "../Select/Select";


export const Modificar = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const {ruta} = useParams();
  //algo como: http://localhost:3000/api/alumnos/1
  const url = `${dominio}/${ruta}/${id}`;
  console.log("url",url)

  const navigate = useNavigate();

  const [values, setValues] = useState(null);
  const [columnas, setColumnas] = useState([]);
  const [listaMaterias, setListaMaterias] = useState([]);
  const [listaAlumnos, setListaAlumnos] = useState([]);
  const [errores, setErrores] = useState(null);

  const fetchData = useCallback(async () => {
    if("notas" === ruta){
      const [nota, alumno, materia] = await Promise.all([
          fetchAuth(`${dominio}/notas`),
          fetchAuth(`${dominio}/alumnos`),
          fetchAuth(`${dominio}/materias`)
      ])

      if(!nota.ok || !alumno.ok || !materia.ok ){
          return console.error("Error al obtener datos.",nota, alumno, materia)
      }
      const notas = await nota.json();
      const alumnos = await alumno.json();
      const materias = await materia.json();
      setColumnas(notas.columnasNota)
      setValues(notas.notas[0])
      setListaAlumnos(alumnos.alumnos)
      setListaMaterias(materias.materias)
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
      console.log(data)
      setValues(data.alumnos[0]);
      setColumnas(data.columnasAlumno);
    }else{
      setValues(data.materias[0]);
      setColumnas(data.columnasMateria);
    }
    
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    const response = await fetchAuth(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      if (response.status === 400) {
        console.error("->", data)
        return setErrores(data.errors);
      }
    }

    navigate(`/${ruta}`);
  };

  if (!values) {
    return null;
  }
  
  //crea un arreglo con objetos con key, label con nombre de las columnsa como valores
  const columnasProps = columnas?.reduce((acc, col) =>
      [...acc,{
        key: col, 
        //se pone mayuscula la primera letra y se saca el _id 
        label: (col.charAt(0).toUpperCase() + col.slice(1)).split("_id")[0] }
      ]
    ,[]
  )
  
  return (
    <article>
      <h2>Modificar {ruta}</h2>
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
                    key={i}
                    disabled={ col.key === "id"? true : false} 
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
                      <small key={i}>{err.msg}</small>
                    ))
                  }
                </>
              )
              }
            </label>
          ))}
        </fieldset>
        <button type="submit">Modificar {ruta}</button>
      </form>
    </article>
  );
};