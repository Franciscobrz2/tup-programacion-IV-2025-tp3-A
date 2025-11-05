import express from "express";
import { getAllAlumnos, getAlumnosById, createAlumno, updateAlumno, deleteAlumno} from "./alumnoController.js";
import { validarId, verificarValidacion} from "../../utils/verificarValidacion.js";
import { validarAlumno } from "./alumnoValidations.js";

const router = express.Router();

router.get("/", getAllAlumnos);
router.get("/:id", validarId("id"), verificarValidacion, getAlumnosById);
router.post("/", validarAlumno, verificarValidacion, createAlumno);
router.put("/:id", validarAlumno, validarId("id"), verificarValidacion, updateAlumno);
router.delete("/:id", validarId("id"), verificarValidacion, deleteAlumno);

export default router;