import { body } from "express-validator";
import { db } from "../../config/db.js";

export const validarAlumno = [
    body('nombre')
        .isAlpha("es-ES", {ignore: " "})
        .withMessage('El nombre no puede estar vacio y no puede contener numeros.'),
    body('apellido')
        .isAlpha("es-ES", {ignore: " "})
        .withMessage('El apellido no puede estar vacio y no puede contener numeros.'),
    body('dni')
        .isLength({min:8, max:8})
        .isInt({min:0})
        .withMessage('El DNI solo debe ser una cadena de numeros sin puntos.')
        .custom(async(dni, {req}) =>{
            console.log(req.params.id)
            if(req.params.id){
                return true
            }
            const [existe] = await db.execute(
                "SELECT nombre FROM alumno WHERE dni = ?",[
                    dni
                ]
            )

            if(existe.length > 0){
                throw Error("Ya existe un alumno con ese dni.")
            }
        }),
  

]

