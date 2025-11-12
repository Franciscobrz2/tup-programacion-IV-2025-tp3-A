import "./HomePage.css";
import { GraduationCap } from "lucide-react"
import { useAuth } from "../../Auth/Auth";
export const HomePage = () => {
  const {isAuthenticated} = useAuth();
  return (
    <div className="homepage-container">
      <h1>Sistema de Gestión de Alumnos</h1>
        <GraduationCap className="homepage-logo"/>
      <div className="homepage-content">
        <h2>¡Bienvenido!</h2>
        <p>
          Le damos la bienvenida al <strong>Sistema de Gestión de Alumnos</strong>, una herramienta diseñada para facilitar la administración académica de su institución.
        </p>
        <p>
          Desde esta plataforma podrá registrar nuevos alumnos, asignar calificaciones a cada materia y mantener un control eficiente de la información educativa. 
          Este sistema cuenta con una API segura que garantiza la protección y confidencialidad de los datos.
        </p>
        <p>
          Esperamos que esta solución le sea de gran utilidad para la gestión diaria de su institución.
        </p>
      </div>
      {!isAuthenticated && <button>Ingresar</button>}
    </div>
  );
};
