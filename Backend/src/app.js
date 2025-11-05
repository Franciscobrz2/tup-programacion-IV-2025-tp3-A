import express from "express";
import cors from "cors";
import { conectarDB } from "./config/db.js";
import usuarioRouter from "./modules/usuario/usuarioRoutes.js";
import alumnoRouter from "./modules/alumno/alumnoRoutes.js";
import materiaRouter from "./modules/materia/materiaRoutes.js";
conectarDB();

const app = express();
const port = 3000;

//habilitar cors
app.use(cors())
// Para interpretar body como JSON
app.use(express.json());

app.use("/api/usuarios", usuarioRouter);
app.use("/api/alumnos", alumnoRouter);
app.use("/api/materias", materiaRouter);
app.use("/api/notas", usuarioRouter);



//para recurso no existente
app.use((req,res) => {
  res.status(404).json({
    succes: false,
    message: `404 Not Found. Recurso (${req.method} ${req.hostname}${req.path})no encontrado.`
  })
})

app.listen(port, () => {
  console.log(`La aplicación esta funcionando en el puerto ${port}`);
});