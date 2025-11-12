import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../Auth/Auth";
import { useNavigate, useParams } from "react-router";
import useNotas from "../../api/notas";
import useAlumnos from "../../api/alumnos";
import useMaterias from "../../api/materias";
import { dominio } from "../../utils/dominio";
import { Select } from "../Select/Select";


export const Modificar = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const {ruta} = useParams();
  const {getNotas } = useNotas();
  const { getAlumnos } = useAlumnos();
  const { getMaterias } = useMaterias();
  //algo como: http://localhost:3000/api/alumnos/1
  const url = `${dominio}/${ruta}/${id}`;
  console.log("url",url)

  const navigate = useNavigate();

  const [values, setValues] = useState(null);
  const [columnas, setColumnas] = useState([]);
  const [listaMaterias, setListaMaterias] = useState([]);
  const [listaAlumnos, setListaAlumnos] = useState([]);

  const fetchUsuario = useCallback(async () => {
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
      setValues(nota.notas)
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
      console.log(data)
      setValues(data.alumnos);
      setColumnas(data.columnasAlumno);
    }else{
      setValues(data.materias);
      setColumnas(data.columnasMateria);
    }
    
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchUsuario();
  }, [fetchUsuario]);

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
      return window.alert(`Error al modificar ${ruta}`);
    }

    navigate(`/${ruta}`);
  };

  if (!values) {
    return null;
  }

  const columnasProps = columnas?.reduce((acc, col) =>
    [...acc,{key: col, label: col.includes("_id") ? (col.charAt(0).toUpperCase() + col.slice(1)).split("_id")[0] :col.charAt(0).toUpperCase() + col.slice(1)}]
  ,[])
  
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
              <Select key={i} lista={listaAlumnos}/>
              : 
                <Select key={i} lista={listaMaterias}/>
              ):
              (<input key={i} required value={values[col.key]} onChange={(e) =>
                setValues({ ...values, [col.key]: e.target.value })} 
              />)
              }
            </label>
          ))}
        </fieldset>
        <button type="submit">Modificar {ruta}</button>
      </form>
    </article>
  );
};