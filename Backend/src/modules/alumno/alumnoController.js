import { db } from "../../config/db.js";
import { limpiarValues } from "../../utils/limpiarValores.js";
export async function getAllAlumnos (req, res) {
    const {buscar} = req.query;

    if(!buscar){
        const [resultAlumno, tabla] = await db.execute("SELECT * FROM alumno");
   
        const columnasAlumno = tabla.map(t => {
            return t.name
        })

        return res.json({
            success: true,
            alumnos: resultAlumno,
            columnasAlumno
        });
    }

   const sql = `
        SELECT * FROM alumno
        WHERE 
            id LIKE ?
            OR nombre LIKE ?
            OR apellido LIKE ?
            OR dni LIKE ?
    `;

    const parametros = [
        `%${buscar}%`,
        `%${buscar}%`,
        `%${buscar}%`,
        `%${buscar}%`,
    ];

    const [resultAlumno, tabla] = await db.execute(sql, parametros);
    const columnasAlumno = tabla.map(t => t.name);

    return res.json({
        success: true,
        alumnos: resultAlumno,
        columnasAlumno
    });

}

export async function getAlumnosById (req, res) {
    const id = Number(req.params.id);

    const [resultAlumno, tabla] = await db.execute("SELECT * FROM alumno WHERE id = ?" ,[
        id
    ]);
    const columnasAlumno = tabla.map(t => {
        return t.name
    })

    if(resultAlumno.length === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro un alumno con ese id."
        })
    }

    res.json({
        success: true,
        alumnos: resultAlumno,
        columnasAlumno
    })

}

export async function createAlumno (req, res) {
    const { nombre, apellido } = req.body;
    const dni = Number(req.body.dni);


    const [resultAlumno] = await db.execute("INSERT INTO alumno (nombre, apellido, dni) VALUES(?, ?, ?)" ,[
        limpiarValues(nombre), limpiarValues(apellido), dni
    ]);

    if(resultAlumno.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo crear el alumno."
        });
    }

    res.json({
        success: true,
        data: {id: resultAlumno.insertId, nombre, apellido, dni},
        message: "Alumno creado creado con exito."
    });

}

export async function updateAlumno (req, res) {
    const id = Number(req.params.id);
    const { nombre, apellido } = req.body;
    const dni = Number(req.body.dni);

    let sql = "UPDATE alumno SET nombre = ?, apellido = ?, dni = ? WHERE id = ?";

    const [resultAlumno] = await db.execute(sql, [
        limpiarValues(nombre), limpiarValues(apellido), dni, id
    ]);

    if(resultAlumno.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro un alumno con ese id."
        });
    }

    res.json({
        success: true,
        data: {id, nombre, apellido, dni},
        message: "Alumno actualizado con exito."
    });

}

export async function deleteAlumno (req, res) {
    const id = Number(req.params.id);

    const [resultAlumno] = await db.execute("DELETE FROM alumno WHERE id = ?" ,[
        id
    ]);

    if(resultAlumno.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro un alumno con ese id."
        });
    }

    res.json({
        success: true,
        message: `Se elimino el alumno con el id ${id}.`
    });

}