import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import useAlumnos from "../../api/alumnos";
import useMaterias from "../../api/materias";
import useNotas from "../../api/notas";
import Tabla from "../../components/Tabla/Tabla";
import { useAuth } from "../../Auth/Auth";
import { dominio } from "../../utils/dominio";

export const NotasPage = () => {
    const url = `${dominio}/notas`
    const { getAlumnos } = useAlumnos();
    const { getMaterias } = useMaterias();
    const { getNotas } = useNotas();
    const { fetchAuth } = useAuth();

    const [ listaAlumnos, setListaAlumnos ] = useState([]);
    const [ listaMaterias, setListaMaterias ] = useState([]);
    const [ listaNotas, setListaNotas ] = useState([]);
    const [columnas, setColumnas] = useState([])

    const alumnosJoin = listaNotas?.map((n) => {
        const alumno = listaAlumnos?.find(a => n.alumno_id === a.id)
        const materia = listaMaterias?.find(m => n.materia_id === m.id)
        if(alumno || materia){
            return {... n, 
                alumno: alumno?.nombre, 
                apellido: alumno?.apellido,
                dni: alumno?.dni,
                materia: materia?.nombre,
                codigo: materia?.codigo,
                año: materia?.año,
                promedio: (
                    (Number(n?.nota1) + 
                    Number(n?.nota2) +
                    Number(n?.nota3))/3
                ).toFixed(2)
            }
        }
        return n
    });
    
    const fetchParalelo = useCallback(async () => {
        try{
            const [nota, alumno, materia] = await Promise.all([
                getNotas(),
                getAlumnos(),
                getMaterias(),
            ])

            if(!nota.success || !alumno.success || !materia.success ){
                return console.error("Error al obtener datos.",nota, alumno, materia)
            }
            //Estado para las columnas y saco los id, nombre y codigo en este caso
            setColumnas( () =>{
                const colum =  nota.columnasNota
                .concat(alumno?.columnasAlumno , materia?.columnasMateria)
                //Se saca lo repetido 
                .filter(c => c !== "id" && c !== "nombre" && c !== "codigo")
                //saca el _id
                .map(item => item.split("_")[0])
                colum.push("promedio")
                //se ordena alfabeticamente
                colum.sort()
                //se pushea id primero
                colum.splice(0,0,"id")
                return colum
            })
            
            setListaAlumnos(alumno.alumnos)
            setListaMaterias(materia.materias)
            setListaNotas(nota.notas)
        }catch(err){
            console.error("Error al cargar datos", err);
        }
    },[])
    
    useEffect(()=>{
        fetchParalelo();
    },[fetchParalelo]);
    
   
    
    const notasColumnas = columnas.reduce((acc, col) =>
        [...acc,{key: col, th: col.charAt(0).toUpperCase() + col.slice(1)}]
    ,[])

    const handleQuitar = async (id) => {
        if (window.confirm("¿Desea quitar el notas?")) {
        const response = await fetchAuth(`${url}/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
            return window.alert("Error al quitar notas");
        }

        await fetchParalelo();
        }
    }

    return(
        <>  
            <h1>lista de notas de alumnos</h1>
            
            <Tabla columnas={notasColumnas} lista={alumnosJoin} handleQuitar={handleQuitar}/>
        </>
    );
}