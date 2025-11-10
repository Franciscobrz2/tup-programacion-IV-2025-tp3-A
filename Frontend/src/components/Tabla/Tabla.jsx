
export default function Tabla({ columnas, lista }) {

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
              <td key={col.key}>{item[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
