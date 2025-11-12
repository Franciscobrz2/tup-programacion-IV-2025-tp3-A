import { useState, useEffect, useCallback } from "react";
import Tabla from "../../components/Tabla/Tabla";
import { useAuth } from "../../Auth/Auth";
import { dominio } from "../../utils/dominio";
const url = `${dominio}/alumnos`

export const AlumnosPage = () => {

    const [ listaAlumnos, setListaAlumnos ] = useState([]);
    const [columnas, setColumnas] = useState([]);
    const {fetchAuth} = useAuth();
    const [buscar, setBuscar] = useState("");

    const fetchUsuarios = useCallback(
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
        fetchUsuarios();
    }, [fetchUsuarios]);

    const alumnosColumnas = columnas?.reduce((acc, col) =>
        [...acc,{key: col, th: col.charAt(0).toUpperCase() + col.slice(1)}]
    ,[])

    const handleQuitar = async (id) => {
        if (window.confirm("¿Desea quitar el usuario?")) {
        // Pedir a la api que quite el usuario
        const response = await fetchAuth(`${url}/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
            return window.alert("Error al quitar usuario");
        }

        await fetchUsuarios();
        }
    }
    if(!listaAlumnos.length) return <h2>No existen notas para mostrar</h2>

    return(
        <>
            <h1>lista de alumnos</h1>
            <div className="group">
                <input value={buscar} onChange={(e) => setBuscar(e.target.value)} />
                <button onClick={() => fetchUsuarios(buscar)}>Buscar</button>
            </div>
            <Tabla columnas={alumnosColumnas} lista={listaAlumnos} handleQuitar={handleQuitar}/>
        </>
    );
}