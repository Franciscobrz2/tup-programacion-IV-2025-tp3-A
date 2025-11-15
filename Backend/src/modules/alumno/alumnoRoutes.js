import express from "express";
import { getAllAlumnos, getAlumnosById, createAlumno, updateAlumno, deleteAlumno} from "./alumnoController.js";
import { validarId, verificarValidacion} from "../../utils/verificarValidacion.js";
import { validarAlumno } from "./alumnoValidations.js";
import { verificarAutenticacion } from "../auth/auth.js";
const router = express.Router();

router.get("/", verificarAutenticacion, getAllAlumnos);
router.get("/:id", verificarAutenticacion, validarId("id"), verificarValidacion, getAlumnosById);
router.post("/", verificarAutenticacion, validarAlumno, verificarValidacion, createAlumno);
router.put("/:id", verificarAutenticacion, validarAlumno, validarId("id"), verificarValidacion, updateAlumno);
router.delete("/:id", verificarAutenticacion, validarId("id"), verificarValidacion, deleteAlumno);

export default router;