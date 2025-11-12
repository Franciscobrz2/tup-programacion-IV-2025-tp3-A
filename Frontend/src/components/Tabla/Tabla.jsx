import { Link } from "react-router";
export default function Tabla({ columnas, lista, handleQuitar }) {

  return (
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
              <Link role="button" to={`/usuarios/${item.id}/modificar`}>
                Modificar
              </Link>
              <button onClick={() => handleQuitar(item.id)}>Quitar</button>
                 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
