import { useState } from "react";
import { dominio } from "../utils/dominio";
const url = dominio + "/usuarios"

export default function useUsuarios () {
    const [errores, setErrores] = useState(null)
    
    const getUsuarios = async () => {
        try {
            const response = await fetch(url);
            
            const usuarios = await response.json();

            if(!usuarios.ok ){
                throw Error("Error al obtener usuarios.")
            }

            return usuarios;
        } catch (err) {
            return {success: false};
        }
        
    }; 

    const getUsuariosById = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`);
            
            const usuarios = await response.json();

            if(!usuarios.ok ){
                throw Error("Error al obtener usuario.")
            }

            return usuarios;
        } catch (err) {
            return {success: false};
        }
    }; 

    const postUsuarios = async (usuario) => {
        try {
            const response = await fetch(url,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario),
            });
            
            const usuarios = await response.json();
            
            if(!usuarios.success ){
                setErrores(usuarios.errors)
                throw Error("Error al crear usuarios.")
            }

            return usuarios;
        } catch (err) {
            return {success: false, err};
        }
    };

    const putUsuarios = async (usuario) => {
        try {
            const response = await fetch(`${url}/${usuario.id}`,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario }),
            });
            
            const usuarios = await response.json();

            if(!usuarios.ok ){
                throw Error("Error al actualizar usuarios.")
            }

            return usuarios;
        } catch (err) {
            return {success: false};
        }
    };

    const deleteUsuarios = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`,{
                method: "DELETE"
            });
            
            const usuarios = await response.json();

            if(!usuarios.ok ){
                throw Error("Error al actualizar usuarios.")
            }

            return usuarios;
        } catch (err) {
            return {success: false};
        }
    }; 

    return {getUsuarios, getUsuariosById, postUsuarios, putUsuarios, deleteUsuarios, errores}
}