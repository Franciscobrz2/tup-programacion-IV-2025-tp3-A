import { db } from "../../config/db.js";
import bcrypt from "bcrypt";

export async function getAllUsuarios (req, res) {
    const filter = req.query.filter;
    const [resultUsuario] = await db.execute("SELECT id, nombre, email FROM usuario");

    res.json({
        success: true,
        usuarios: resultUsuario
    });

}

export async function getUsuariosById (req, res) {
    const id = Number(req.params.id);

    const [resultUsuario] = await db.execute("SELECT nombre, email FROM usuario WHERE id = ?" ,[
        id
    ]);

    if(resultUsuario.length === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro un usuario con ese id."
        })
    }

    res.json({
        success: true,
        usuarios: resultUsuario
    })

}

export async function createUsuario (req, res) {
    const { nombre, email, password } = req.body
    
    const password_hash = await bcrypt.hash(password, 12);

    const [resultUsuario] = await db.execute("INSERT INTO usuario (nombre, email, password_hash) VALUES(?, ?, ?)" ,[
        nombre, email, password_hash
    ]);

    if(resultUsuario.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se puedo crear el usuario."
        });
    }

    res.json({
        success: true,
        message: "Usuario creado creado con exito."
    });

}

export async function updateUsuario (req, res) {
    const id = Number(req.params.id);
    const { nombre, email, password, nueva_password } = req.body;

    let sql = "UPDATE usuario SET";
    let parametro = [];
    if(password && nueva_password){
        sql += " password_hash = ? ";
        const password_hash = await bcrypt.hash(nueva_password,12);
        parametro.push(password_hash)
    }else{
        sql += " nombre = ?";
        parametro.push(nombre)
    }
    sql += " WHERE id = ?" 

    parametro.push(id)
    const [resultUsuario] = await db.execute(sql, parametro);

    if(resultUsuario.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro un usuario con ese id."
        });
    }

    res.json({
        success: true,
        message: "Usuario actualizado con exito."
    });

}

export async function deleteUsuario (req, res) {
    const id = Number(req.params.id);

    const [resultUsuario] = await db.execute("DELETE FROM usuario WHERE id = ?" ,[
        id
    ]);

    if(resultUsuario.affectedRows === 0){
        return res.status(400).json({
            success: false,
            message: "No se encontro un usuario con ese id."
        });
    }

    res.json({
        success: true,
        message: `Se elimino el usuario con el id ${id}.`
    });

}