import { db } from "../../config/db.js";

export async function getAllNotas (req, res) {
    const filter = req.query.filter;
    const [resultNota, tabla] = await db.execute("SELECT * FROM nota");
    const columnasNota = tabla.map( t => t.name)

    res.json({
        success: true,
        notas: resultNota,
        columnasNota
    });

}

export async function getNotaById (req, res) {
    const id = Number(req.params.id);

    const [resultNota, tabla] = await db.execute("SELECT * FROM nota WHERE id = ?" ,[
        id
    ]);

    const columnasNota = tabla.map(t => {
        return t.name
    })

    if(resultNota.length === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro una nota con ese id."
        })
    }

    res.json({
        success: true,
        notas: resultNota,
        columnasNota
    })

}

export async function createNota (req, res) {
    const alumno_id = Number(req.body.alumno_id);
    const materia_id = Number(req.body.materia_id);
    const nota1 = Number(req.body.nota1);
    const nota2 = Number(req.body.nota2);
    const nota3 = Number(req.body.nota3);

    let sql = `
        INSERT INTO nota 
        (
            alumno_id, 
            materia_id, 
            nota1, 
            nota2, 
            nota3
        ) 
        VALUES(?, ?, ?, ?, ?)
    `
    const [resultNota] = await db.execute(sql ,[
        alumno_id, materia_id, nota1, nota2, nota3
    ]);

    if(resultNota.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo crear la nota."
        });
    }

    res.json({
        success: true,
        data: {id: resultNota.insertId, alumno_id, materia_id, nota1, nota2, nota3},
        message: "Nota creada con exito."
    });

}

export async function updateNota (req, res) {
    const id = Number(req.params.id);
    const alumno_id = Number(req.body.alumno_id);
    const materia_id = Number(req.body.materia_id);
    const nota1 = Number(req.body.nota1);
    const nota2 = Number(req.body.nota2);
    const nota3 = Number(req.body.nota3);

    let sql = `
        UPDATE nota SET 
            alumno_id = ?, 
            materia_id = ?, 
            nota1 = ?, 
            nota2 = ?, 
            nota3 = ? 
        WHERE id = ?
    `;

    const [resultNota] = await db.execute(sql, [
        alumno_id, materia_id, nota1, nota2, nota3, id
    ]);

    if(resultNota.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro una nota con ese id."
        });
    }

    res.json({
        success: true,
        data: {id, alumno_id, materia_id, nota1, nota2, nota3},
        message: "Nota actualizada con exito."
    });

}

export async function deleteNota (req, res) {
    const id = Number(req.params.id);

    const [resultNota] = await db.execute("DELETE FROM nota WHERE id = ?" ,[
        id
    ]);

    if(resultNota.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro una nota con ese id."
        });
    }

    res.json({
        success: true,
        message: `Se elimino la nota con el id ${id}.`
    });

}