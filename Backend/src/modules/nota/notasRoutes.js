import express from "express";
import { getAllNotas, getNotaById, createNota, updateNota, deleteNota} from "./notasController.js";
import { validarId, verificarValidacion} from "../../utils/verificarValidacion.js";
import { validarNota } from "./notasValidations.js";

const router = express.Router();

router.get("/", getAllNotas);
router.get("/:id", validarId("id"), verificarValidacion, getNotaById);
router.post("/", validarNota, verificarValidacion, createNota);
router.put("/:id", validarNota, validarId("id"), verificarValidacion, updateNota);
router.delete("/:id", validarId("id"), verificarValidacion, deleteNota);

export default router;