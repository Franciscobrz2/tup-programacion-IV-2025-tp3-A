import { body } from "express-validator";
import { db } from "../../config/db.js";

export const validarAlumno = [
    body('nombre')
        .isAlpha("es-ES", {ignore: " "})
        .withMessage('El nombre no puede estar vacio y no puede contener numeros.')
        .isLength({max:20}).withMessage('El nombre no debe exceder los 20 caracterers'),
    body('apellido')
        .isAlpha("es-ES", {ignore: " "})
        .withMessage('No puede contener numeros.')
        .isLength({max:20}).withMessage('El nombre no debe exceder los 20 caracterers'),
    body('dni')
        .isInt({min:0})
        .withMessage('El DNI debe ser un numero entero positivo.')
        .isLength({min:8, max:8}).withMessage('El DNI debe tener 8 digitos y sin puntos.')
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

