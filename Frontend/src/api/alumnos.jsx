import { useState } from "react";
import { dominio } from "../utils/dominio";
const url = dominio + "/alumnos"

export default function useAlumnos () {
    
    const getAlumnos = async () => {
        try {
            const response = await fetch(url);
            
            const alumno = await response.json();
            if(!alumno.success ){
                throw Error("Error al obtener alumnos.")
            }

            return alumno;
        } catch (err) {
            console.error("Error al obtener")
            return {success: false};
        }
        
    }; 

    const getAlumnosByid = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`);
            
            const alumno = await response.json();

            if(!alumno.ok ){
                throw Error("Error al obtener alumno.")
            }

            return alumno;
        } catch (err) {
            return {success: false};
        }
    }; 

    const postAlumnos = async (alumnos) => {
        try {
            const response = await fetch(url,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ alumnos }),
            });
            
            const alumno = await response.json();

            if(!alumno.ok ){
                throw Error("Error al crear alumnos.")
            }

            return alumno;
        } catch (err) {
            return {success: false};
        }
    };

    const putAlumnos = async (alumnos) => {
        try {
            const response = await fetch(`${url}/${alumnos.id}`,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ alumnos }),
            });
            
            const alumno = await response.json();

            if(!alumno.ok ){
                throw Error("Error al actualizar alumnos.")
            }

            return alumno;
        } catch (err) {
            return {success: false};
        }
    };

    const deleteAlumnos = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`,{
                method: "DELETE"
            });
            
            const alumno = await response.json();

            if(!alumno.ok ){
                throw Error("Error al actualizar alumnos.")
            }

            return alumno;
        } catch (err) {
            return {success: false};
        }
    }; 

    return {getAlumnos, getAlumnosByid, postAlumnos, putAlumnos, deleteAlumnos}
}