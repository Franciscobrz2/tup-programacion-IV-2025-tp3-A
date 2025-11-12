import { useState, useEffect, useCallback } from "react";
import Tabla from "../../components/Tabla/Tabla";
import { useAuth } from "../../Auth/Auth.jsx";
import { dominio } from "../../utils/dominio.js";
const url = `${dominio}/materias`

export const MateriasPage = () => {
    const [ listaMaterias, setListaMaterias ] = useState([]);
    const [columnas, setColumnas] = useState([])
    const {fetchAuth} = useAuth()
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
        setColumnas(data.columnasMateria);
        setListaMaterias(data.materias?.map(m => ({...m, año: m.año.split("-")[0]})));
        },
        [fetchAuth]
    );

    useEffect(() => {
        fetchUsuarios();
    }, [fetchUsuarios]);

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
    const materiasColumnas = columnas?.reduce((acc, col) =>
        [...acc,{key: col, th: col.charAt(0).toUpperCase() + col.slice(1)}]
    ,[])

    if(!listaMaterias.length) return <h2>No existen materias para mostrar</h2>

    return(
        <>
            <h1>lista de materias</h1>
            <div className="group">
                <input value={buscar} onChange={(e) => setBuscar(e.target.value)} />
                <button onClick={() => fetchUsuarios(buscar)}>Buscar</button>
            </div>
            <Tabla columnas={materiasColumnas} lista={listaMaterias}  handleQuitar={handleQuitar}/>
        </>
    );
}