import { body } from "express-validator";

export const validarMateria = [
    body('nombre')
        .isAlpha("es-ES", {ignore: " "})
        .withMessage('No puede contener numeros.')
        .isLength({max: 20})
        .withMessage('No puede exceder los 20 caracteres.'),
    body('codigo')
        .isAlphanumeric()
        .withMessage('El codigo debe ser alfanumerico y sin espacios.')
        .isLength({max: 20})
        .withMessage('No puede exceder los 20 caracteres.'),
    body('año')
        .isInt({min: 1})
        .withMessage('El año debe ser un numero entero positivo.')
        .isLength({min:4, max:4})
        .withMessage('El año debe tener 4 digitos.'),

]

