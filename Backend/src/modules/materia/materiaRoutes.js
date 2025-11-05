import express from "express";
import { getAllMaterias, getMateriaById, createMateria, updateMateria, deleteMateria} from "./materiaController.js";
import { validarId, verificarValidacion} from "../../utils/verificarValidacion.js";
import { validarMateria } from "./materiaValidations.js";

const router = express.Router();

router.get("/", getAllMaterias);
router.get("/:id", validarId("id"), verificarValidacion, getMateriaById);
router.post("/", validarMateria, verificarValidacion, createMateria);
router.put("/:id", validarMateria, validarId("id"), verificarValidacion, updateMateria);
router.delete("/:id", validarId("id"), verificarValidacion, deleteMateria);

export default router;