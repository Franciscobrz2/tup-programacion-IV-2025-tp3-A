import { body } from "express-validator";

export const validarAuth = [
    body("email").isEmail({host_whitelist: ["gmail.com","hotmail.com","outlook.com"]})
    .withMessage('El email debe ser valido @gmail/hotmail/outlook.com .')
    .isLength({ max: 60 }).withMessage('El email no puede superar los 60 caracteres.'),
    body("password").isStrongPassword({
        minLength: 8, // Minimo de 8 caracteres
        minLowercase: 1, // Al menos una letra en minusculas
        minUppercase: 1, // Al menos una letra en mayuscula 
        minNumbers: 1, // Al menos un número
        minSymbols: 1, // Al menos un simbolo
    })
    .withMessage(`La contraseña debe tener: 8 caracteres,1 letra mayuscula y minuscula, 1 numero y 1 simbolo`),
]