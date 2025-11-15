import { useState, useEffect, useCallback } from "react";
import Tabla from "../../components/Tabla/Tabla";
import { useAuth } from "../../Auth/Auth";
import { dominio } from "../../utils/dominio";
import "../Page.css"
const url = `${dominio}/alumnos`

export const AlumnosPage = () => {

    const [ listaAlumnos, setListaAlumnos ] = useState([]);
    const [columnas, setColumnas] = useState([]);
    const {fetchAuth} = useAuth();
    const [buscar, setBuscar] = useState("");

    const fetchAlumnos = useCallback(
        async (buscar) => {
        const searchParams = new URLSearchParams();

        if (buscar) {
            searchParams.append("buscar", buscar);
        }

        const response = await fetchAuth(
            url +
            (searchParams.size > 0 ? "?" + searchParams.toString() : "")
        );
        const data = await response.json();

        if (!response.ok) {
            console.log("Error:", data.error);
            return;
        }

        setColumnas(data.columnasAlumno);
        setListaAlumnos(data.alumnos);
        },
        [fetchAuth]
    );

    useEffect(() => {
        fetchAlumnos();
    }, [fetchAlumnos]);

    const alumnosColumnas = columnas?.reduce((acc, col) =>
        [...acc,{key: col, th: col.charAt(0).toUpperCase() + col.slice(1)}]
    ,[])

    const handleQuitar = async (id) => {
        
        const response = await fetchAuth(`${url}/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
            return window.alert("Error al quitar alumno");
        }

        await fetchAlumnos();
        
    }


    return(
        <>
            <h1 className="title">Lista de alumnos</h1>

            <div className="group">
            <input
                className="busqueda"
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
            />
            
            <button className= "busqueda"onClick={() => fetchAlumnos(buscar)}>
                Buscar
            </button>
            </div>

            <Tabla
            columnas={alumnosColumnas}
            lista={listaAlumnos}
            handleQuitar={handleQuitar}
            />
        </>
    );
}