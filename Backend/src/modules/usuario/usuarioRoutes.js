import { getAllUsuarios, getUsuariosById, createUsuario, updateUsuario, deleteUsuario } from "./usuarioController.js";
import { validarId, verificarValidacion} from "../../utils/verificarValidacion.js";
import express from "express";
import { validarUsuario, validarUsuarioPut } from "./usuarioValidations.js";
import { verificarAutenticacion } from "../auth/auth.js";
const router = express.Router();

router.get("/", verificarAutenticacion, getAllUsuarios);
router.get("/:id", verificarAutenticacion, validarId("id"), verificarValidacion, getUsuariosById);
router.post("/", verificarAutenticacion, validarUsuario, verificarValidacion, createUsuario);
router.put("/:id", verificarAutenticacion, validarUsuarioPut, validarId("id"), verificarValidacion, updateUsuario);
router.delete("/:id", verificarAutenticacion, validarId("id"), verificarValidacion, deleteUsuario);

export default router;