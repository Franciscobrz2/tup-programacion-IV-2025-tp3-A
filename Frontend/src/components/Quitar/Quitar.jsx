import { useState } from "react";
import "./Quitar.css"
export const Quitar = ({id, datos, handleQuitar}) => {
    const [ open, setOpen] = useState(false)
    return(
        <>
            <button className="QuitarButton" onClick={()=> setOpen(true)}>Quitar</button>
            <dialog open={open}>
                <article>
                    <h1>Eliminar {datos}</h1>
                    <p>¿Esta seguro que quiere eliminar {datos} con id:{id}?</p>
                    <button onClick={()=>{
                        handleQuitar(id)
                        setOpen(false)
                    }}>Si</button> 
                    <button  onClick={()=> setOpen(false)}>
                        No
                    </button>
                </article>
            </dialog>
        </>
    );
}