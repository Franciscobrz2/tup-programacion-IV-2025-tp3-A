import { useState } from "react";
import { dominio } from "../utils/dominio";
const url = dominio + "/notas"

export default function useNotas () {
    
    const getNotas = async () => {
        try {
            const response = await fetch(url);
            
            const notas = await response.json();

            if(!notas.success ){
                throw Error("Error al obtener notas.")
            }

            return notas;
        } catch (err) {
            return {success: false};
        }
        
    }; 

    const getNotasById = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`);
            
            const notas = await response.json();

            if(!notas.success ){
                throw Error("Error al obtener nota.")
            }

            return notas;
        } catch (err) {
            return {success: false};
        }
    }; 

    const postNotas = async (nota) => {
        try {
            const response = await fetch(url,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nota }),
            });
            
            const notas = await response.json();

            if(!notas.success ){
                throw Error("Error al crear notas.")
            }

            return notas;
        } catch (err) {
            return {success: false};
        }
    };

    const putNotas = async (nota) => {
        try {
            const response = await fetch(`${url}/${nota.id}`,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nota }),
            });
            
            const notas = await response.json();

            if(!notas.success ){
                throw Error("Error al actualizar notas.")
            }

            return notas;
        } catch (err) {
            return {success: false};
        }
    };

    const deleteNotas = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`,{
                method: "DELETE"
            });
            
            const notas = await response.json();

            if(!notas.success ){
                throw Error("Error al actualizar notas.")
            }

            return notas;
        } catch (err) {
            return {success: false};
        }
    }; 

    return {getNotas, getNotasById, postNotas, putNotas, deleteNotas}
}