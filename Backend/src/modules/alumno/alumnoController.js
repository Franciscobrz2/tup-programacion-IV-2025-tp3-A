import { db } from "../../config/db.js";

export async function getAllAlumnos (req, res) {
    const filter = req.query.filter;
    const [resultAlumno] = await db.execute("SELECT * FROM alumno");

    res.json({
        succes: true,
        alumnos: resultAlumno
    });

}

export async function getAlumnosById (req, res) {
    const id = Number(req.params.id);

    const [resultAlumno] = await db.execute("SELECT * FROM alumno WHERE id = ?" ,[
        id
    ]);

    if(resultAlumno.length === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro un alumno con ese id."
        })
    }

    res.json({
        succes: true,
        alumnos: resultAlumno
    })

}

export async function createAlumno (req, res) {
    const { nombre, apellido } = req.body;
    const dni = Number(req.body.dni);


    const [resultAlumno] = await db.execute("INSERT INTO alumno (nombre, apellido, dni) VALUES(?, ?, ?)" ,[
        nombre, apellido, dni
    ]);

    if(resultAlumno.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo crear el alumno."
        });
    }

    res.json({
        succes: true,
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
        nombre, apellido, dni, id
    ]);

    if(resultAlumno.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro un alumno con ese id."
        });
    }

    res.json({
        succes: true,
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
        succes: true,
        message: `Se elimino el alumno con el id ${id}.`
    });

}