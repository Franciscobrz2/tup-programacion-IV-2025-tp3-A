import { Link, useLocation } from "react-router";

export default function Tabla({ columnas, lista, handleQuitar }) {
  const {pathname} = useLocation();
  console.log("->",location.href)
  const ruta = `http://localhost:5173${pathname}`

  return (

    <>

      <Link type="button" to={`${ruta}/crear`}>
        {pathname.at(-2) === "a" ? "Nuevas":"Nuevos" } {pathname.split("/")}
      </Link>
      <table>
        <thead>
          <tr>
            {columnas.map(col => (
              <th key={col.key}>{col.th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
            <tr key={item.id}>
              {columnas.map(col => (
                <td key={col.key}>{item[col.key]} 
                  
                </td>
              ))}
              <td>
                <Link role="button" to={`${ruta}/${item.id}/modificar`}>
                  Modificar
                </Link>
                
                { pathname !== "/notas" && 
                  <button onClick={() => handleQuitar(item.id)}>Quitar</button>
                }                  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
