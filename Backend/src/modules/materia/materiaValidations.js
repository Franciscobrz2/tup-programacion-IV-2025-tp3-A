import { body } from "express-validator";

const formatearFecha = (date) =>{
    
}
export const validarMateria = [
    body('nombre')
        .isAlpha("es-ES", {ignore: " "})
        .withMessage('El nombre no puede estar vacio y no puede contener numeros.'),
    body('codigo')
        .isAlphanumeric()
        .withMessage('El codigo debe ser alfanumerico y sin espacios.'),
    body('año')
        .isDate({delimiters:['/','-']}).withMessage('El formato de la fecha debe ser YYYY/MM/DD.'),
  
]

