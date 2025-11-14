import { body } from "express-validator";
import { db } from "../../config/db.js";

export const validarNota = [
    body('alumno_id')
        .isInt({min: 1})
        .withMessage('Las notas deben tener un alumno.'),
    body('materia_id')
        .isInt({min: 1})
        .withMessage('Las notas deben tener una materia.')
        .custom(async (materia_id,{req}) => {
         
            const [existe] = await db.execute(
                `SELECT 
                    n.id,
                    a.nombre AS alumno,
                    a.apellido,
                    m.nombre AS materia,
                    n.nota1,
                    n.nota2,
                    n.nota3
                FROM nota n 
                JOIN alumno a ON n.alumno_id = a.id
                JOIN materia m ON n.materia_id = m.id
                WHERE alumno_id = ? AND materia_id = ?
                `,[
                    req.body.alumno_id, materia_id
                ]
            )
            //no existe salta y se inserta las notas
            if(existe.length === 0){
                return true
            }
            const nota1 = Number(existe[0].nota1) 
            const nota2 = Number(existe[0].nota2)
            const nota3 = Number(existe[0].nota3)

            //si existe id es un PUT -> debe permitir que 
            // que se puedan cambiar las notas aunque sea el mismo alumno y materia
            // entonces tiene que saltar la validacion.
            if(
                req.params.id &&
                (
                req.body.nota1 !== nota1 ||
                req.body.nota2 !== nota2 ||
                req.body.nota3 !== nota3  
                )
            ){
                return true
            }
            const alumno = existe[0]?.alumno
            const apellido = existe[0]?.apellido
            const materia = existe[0]?.materia
            if(existe.length > 0){
                throw Error(`La notas de "${alumno} ${apellido}" ya estan cargadas en ${materia}.`)
            }
        }),
    body('nota1')
        .isFloat({min: 0, max: 10})
        .withMessage('La nota1 debe ser un numero en la escala del 0 a 10'),
    body('nota2')
        .isFloat({min: 0, max: 10})
        .withMessage('La nota2 debe ser un numero en la escala del 0 a 10'),
    body('nota3')
        .isFloat({min: 0, max: 10})
        .withMessage('La nota3 debe ser un numero en la escala del 0 a 10'),
  
]

