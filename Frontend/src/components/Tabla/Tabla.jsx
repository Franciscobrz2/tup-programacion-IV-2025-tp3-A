import { Link, useLocation } from "react-router";
import { Quitar } from "../Quitar/Quitar";
import "./Tabla.css";

export default function Tabla({ columnas, lista, handleQuitar }) {
  const { pathname } = useLocation();
  const ruta = `http://localhost:5173${pathname}`;

  return (
    <div className="tabla-container">

      <Link type="button" className="tabla-crear-btn" to={`${ruta}/crear`}>
        {pathname.at(-2) === "a" ? "Nuevas" : "Nuevos"} {pathname.split("/")}
      </Link>

      <table className="tabla">
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col.key}>{col.th}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {lista.map((item) => (
            <tr key={item.id}>
              {columnas.map((col) => (
                <td key={col.key}>{item[col.key]}</td>
              ))}

              <td className="tabla-acciones">
                <Link role="button" to={`${ruta}/${item.id}/modificar`}>
                  Modificar
                </Link>

                {pathname !== "/notas" && (
                  <Quitar id={item.id} handleQuitar={handleQuitar} datos={item.nombre} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
