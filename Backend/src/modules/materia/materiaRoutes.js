import express from "express";
import { getAllMaterias, getMateriaById, createMateria, updateMateria, deleteMateria} from "./materiaController.js";
import { validarId, verificarValidacion} from "../../utils/verificarValidacion.js";
import { validarMateria } from "./materiaValidations.js";
import { verificarAutenticacion } from "../auth/auth.js";
const router = express.Router();

router.get("/", verificarAutenticacion, getAllMaterias);
router.get("/:id", verificarAutenticacion, validarId("id"), verificarValidacion, getMateriaById);
router.post("/", verificarAutenticacion, validarMateria, verificarValidacion, createMateria);
router.put("/:id", verificarAutenticacion, validarMateria, validarId("id"), verificarValidacion, updateMateria);
router.delete("/:id", verificarAutenticacion, validarId("id"), verificarValidacion, deleteMateria);

export default router;