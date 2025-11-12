
export const Select = ({lista,keys}) => {

    return(
        <>
           <select key={keys}>
                {lista.map( item => (
                    <option key={item.id} value={item.id}>
                        {item.nombre} {item?.apellido}
                    </option>
                ))}
           </select>
        </>
    );
}