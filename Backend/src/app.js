import express from "express";
import cors from "cors";
import { conectarDB } from "./config/db.js";
import usuarioRouter from "./modules/usuario/usuarioRoutes.js";
import alumnoRouter from "./modules/alumno/alumnoRoutes.js";
import materiaRouter from "./modules/materia/materiaRoutes.js";
import notaRouter from "./modules/nota/notasRoutes.js";
import authRouter from "./modules/auth/authRoutes.js";
import { authConfig } from "./modules/auth/auth.js";
conectarDB();

const app = express();
const port = 3000;

//habilitar cors
app.use(cors())

authConfig();

// Para interpretar body como JSON
app.use(express.json());

app.use("/api/usuarios", usuarioRouter);
app.use("/api/alumnos", alumnoRouter);
app.use("/api/materias", materiaRouter);
app.use("/api/notas", notaRouter);
app.use("/api/auth/login", authRouter);



//para recurso no existente
app.use((req,res) => {
  res.status(404).json({
    success: false,
    message: `404 Not Found. Recurso (${req.method} ${req.hostname}${req.path})no encontrado.`
  })
})

app.listen(port, () => {
  console.log(`La aplicación esta funcionando en el puerto ${port}`);
});