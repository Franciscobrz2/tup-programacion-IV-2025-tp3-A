import express from "express";
import { authLogin } from "./auth.js";
import { verificarValidacion} from "../../utils/verificarValidacion.js";
import { validarAuth } from "./authValidations.js";
const router = express.Router();

router.post("/", validarAuth, verificarValidacion, authLogin);


export default router;