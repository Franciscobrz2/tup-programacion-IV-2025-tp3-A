import { body } from "express-validator";
import { db } from "../../config/db.js";
import bcrypt from "bcrypt";

export const validarUsuario = [
    body('nombre')
        .isAlpha("es-ES")
        .withMessage('El nombre no puede estar vacio y no puede contener numeros'),
    body('email')
        .isEmail({host_whitelist: ["gmail.com","hotmail.com","outlook.com"]})
        .withMessage('El email debe ser valido @gmail/hotmail/outlook.com .')
        .custom(async (email, {req}) =>{
            //si es para actualizar no verifica si el email existe
            //esta autenticado
            if(req.params.id){
                return true
            }
            const [resultEmail] = await db.execute(
                "SELECT email FROM usuario WHERE email = ?",[
                    email
                ]
            )
            
            if(resultEmail.length > 0){
                throw Error("Esta email ya se encuentra registrado.")
            }
        }),
    body('password')
        .notEmpty()
        .isStrongPassword({ 
            minLength: 8, 
            minLowercase: 1,
            minUppercase: 1, 
            minNumbers: 1, 
            minSymbols: 1,
        })
        .withMessage(`La contraseña debe tener: 8 caracteres,1 letra mayuscula y minuscula, 1 numero y 1 simbolo`),
    body('nueva_password')
        .notEmpty()
        .isStrongPassword({ 
            minLength: 8, 
            minLowercase: 1,
            minUppercase: 1, 
            minNumbers: 1, 
            minSymbols: 1,
        })
        .withMessage(`La nueva contraseña debe tener: 8 caracteres,1 letra mayuscula y minuscula, 1 numero y 1 simbolo`)
        .custom(async(nueva_password, {req}) =>{
            if(nueva_password === req.body.password){
                throw Error("La contraseña no puede ser la misma.")
            }
            const [password_actual] = await db.execute(
                "SELECT password_hash FROM usuario WHERE id = ?",[
                    req.params.id
                ]
            )
            const password_DB = password_actual[0].password_hash

            const compare = await bcrypt.compare(nueva_password, password_DB) 
            console.log("Sa",compare)
            if(compare){
                throw Error("La contraseña no puede ser la misma.")
            }
        })
        .optional(),

]


export const validarUsuarioPut = [
    body('nombre')
        .isAlpha("es-ES").optional()
        .withMessage('El nombre no puede estar vacio y no puede contener numeros'),
    body('email')
        .isEmail({host_whitelist: ["gmail.com","hotmail.com","outlook.com"]})
        .withMessage('El email debe ser valido @gmail/hotmail/outlook.com .')
        .custom(async (email, {req}) =>{
            
            if(!req.params.id){
                return true
            }
            const [resultEmail] = await db.execute(
                "SELECT email FROM usuario WHERE email = ?",[
                    email
                ]
            )
            
            if(resultEmail.length > 0){
                throw Error("Esta email ya se encuentra registrado.")
            }
        }).optional(),
    body('password')
        .notEmpty()
        .isStrongPassword({ 
            minLength: 8, 
            minLowercase: 1,
            minUppercase: 1, 
            minNumbers: 1, 
            minSymbols: 1,
        })
        .withMessage(`La contraseña debe tener: 8 caracteres,1 letra mayuscula y minuscula, 1 numero y 1 simbolo`)
        .optional(),
    body('nueva_password')
        .notEmpty()
        .isStrongPassword({ 
            minLength: 8, 
            minLowercase: 1,
            minUppercase: 1, 
            minNumbers: 1, 
            minSymbols: 1,
        })
        .withMessage(`La nueva contraseña debe tener: 8 caracteres,1 letra mayuscula y minuscula, 1 numero y 1 simbolo`)
        .custom(async(nueva_password, {req}) =>{
            if(nueva_password === req.body.password){
                throw Error("La contraseña no puede ser la misma.")
            }
            const [password_actual] = await db.execute(
                "SELECT password_hash FROM usuario WHERE id = ?",[
                    req.params.id
                ]
            )
            const password_DB = password_actual[0].password_hash

            const compare = await bcrypt.compare(nueva_password, password_DB) 
            console.log("Sa",compare)
            if(compare){
                throw Error("La contraseña no puede ser la misma.")
            }
        })
        .optional(),

]