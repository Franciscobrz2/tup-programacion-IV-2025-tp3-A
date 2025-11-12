import { db } from "../../config/db.js";

export async function getAllMaterias (req, res) {
    const filter = req.query.filter;
    const [resultMateria, tabla] = await db.execute("SELECT * FROM materia");

    const columnasMateria = tabla.map( t => t.name)
    res.json({
        success: true,
        materias: resultMateria,
        columnasMateria
    });

}

export async function getMateriaById (req, res) {
    const id = Number(req.params.id);

    const [resultMateria, tabla] = await db.execute("SELECT * FROM materia WHERE id = ?" ,[
        id
    ]);
    const columnasMateria = tabla.map(t => {
        return t.name
    })
    if(resultMateria.length === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro una materia con ese id."
        })
    }

    res.json({
        success: true,
        materias: resultMateria,
        columnasMateria
    })

}

export async function createMateria (req, res) {
    const { nombre, codigo } = req.body;
    const año = new Date(req.body.año);


    const [resultMateria] = await db.execute("INSERT INTO materia (nombre, codigo, año) VALUES(?, ?, ?)" ,[
        nombre, codigo, año
    ]);

    if(resultMateria.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo crear la materia."
        });
    }

    res.json({
        success: true,
        data: {id: resultMateria.insertId, nombre, codigo, año},
        message: "Materia creada con exito."
    });

}

export async function updateMateria (req, res) {
    const id = Number(req.params.id);
    const { nombre, codigo } = req.body;
    const año = new Date(req.body.año);

    let sql = "UPDATE materia SET nombre = ?, codigo = ?, año = ? WHERE id = ?";

    const [resultMateria] = await db.execute(sql, [
        nombre, codigo, año, id
    ]);

    if(resultMateria.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro una materia con ese id."
        });
    }

    res.json({
        success: true,
        data: {id, nombre, codigo, año},
        message: "Materia actualizada con exito."
    });

}

export async function deleteMateria (req, res) {
    const id = Number(req.params.id);

    const [resultMateria] = await db.execute("DELETE FROM materia WHERE id = ?" ,[
        id
    ]);

    if(resultMateria.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro una materia con ese id."
        });
    }

    res.json({
        success: true,
        message: `Se elimino la materia con el id ${id}.`
    });

}