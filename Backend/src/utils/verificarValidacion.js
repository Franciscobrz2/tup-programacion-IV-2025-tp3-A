import { validationResult, param } from "express-validator";

export const verificarValidacion = (req,res,next) => {
    const errors = validationResult(req);
    
    const listaErrors = errors.array()
    .map(e => ( e.path.includes("password")?
        {...e, value: undefined} : e)
    )
    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            errors: listaErrors
        });
    }
    next()
}

export function validarId(parametro) {
    return param(parametro, "Id invalido")
        .isInt({min:1}).withMessage("El id debe un numero entero positivo.")
}