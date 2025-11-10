import { useState } from "react";
import { dominio } from "../utils/dominio";
const url = dominio + "/materias"

export default function useMaterias () {
    
    const getMaterias = async () => {
        try {
            const response = await fetch(url);
            
            const materias = await response.json();

            if(!materias.success ){
                throw Error("Error al obtener materias.")
            }

            return materias;
        } catch (err) {
            return {success: false};
        }
        
    }; 

    const getMateriaByid = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`);
            
            const materias = await response.json();

            if(!materias.success ){
                throw Error("Error al obtener materia.")
            }

            return materias;
        } catch (err) {
            return {success: false};
        }
    }; 

    const postMaterias = async (materia) => {
        try {
            const response = await fetch(url,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ materia }),
            });
            
            const materias = await response.json();

            if(!materias.success ){
                throw Error("Error al crear materias.")
            }

            return materias;
        } catch (err) {
            return {success: false};
        }
    };

    const putMaterias = async (materia) => {
        try {
            const response = await fetch(`${url}/${materia.id}`,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ materia }),
            });
            
            const materias = await response.json();

            if(!materias.success ){
                throw Error("Error al actualizar materias.")
            }

            return materias;
        } catch (err) {
            return {success: false};
        }
    };

    const deleteMaterias = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`,{
                method: "DELETE"
            });
            
            const materias = await response.json();

            if(!materias.success ){
                throw Error("Error al actualizar materias.")
            }

            return materias;
        } catch (err) {
            return {success: false};
        }
    }; 

    return {getMaterias, getMateriaByid, postMaterias, putMaterias, deleteMaterias}
}