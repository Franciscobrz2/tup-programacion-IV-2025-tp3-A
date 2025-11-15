import express from "express";
import { getAllNotas, getNotaById, createNota, updateNota, deleteNota} from "./notasController.js";
import { validarId, verificarValidacion} from "../../utils/verificarValidacion.js";
import { validarNota } from "./notasValidations.js";
import { verificarAutenticacion } from "../auth/auth.js";
const router = express.Router();

router.get("/", verificarAutenticacion, getAllNotas);
router.get("/:id", verificarAutenticacion, validarId("id"), verificarValidacion, getNotaById);
router.post("/", verificarAutenticacion, validarNota, verificarValidacion, createNota);
router.put("/:id", verificarAutenticacion, validarNota, validarId("id"), verificarValidacion, updateNota);
router.delete("/:id", verificarAutenticacion, validarId("id"), verificarValidacion, deleteNota);

export default router;