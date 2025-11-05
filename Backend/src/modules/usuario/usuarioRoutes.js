import { getAllUsuarios, getUsuariosById, createUsuario, updateUsuario, deleteUsuario } from "./usuarioController.js";
import { validarId, verificarValidacion} from "../../utils/verificarValidacion.js";
import express from "express";
import { validarUsuario, validarUsuarioPut } from "./usuarioValidations.js";

const router = express.Router();

router.get("/", getAllUsuarios);
router.get("/:id", validarId("id"), verificarValidacion, getUsuariosById);
router.post("/", validarUsuario, verificarValidacion, createUsuario);
router.put("/:id", validarUsuarioPut, validarId("id"), verificarValidacion, updateUsuario);
router.delete("/:id", validarId("id"), verificarValidacion, deleteUsuario);

export default router;