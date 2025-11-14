
export const Select = ({lista,keys, onChange, isSelected, error}) => {

    return(
        <>
            <select 
                key={keys}
                onChange={onChange}
                aria-invalid={!!error}
                style={{
                    borderColor: error ? "red" : undefined
                }}
            >
                <option value="" hidden >{isSelected}</option>
                {lista.map( item => (
                    <option 
                        key={item.id} 
                        value={item.id}
                    >
                        {item.nombre} {item?.apellido}
                    </option>
                ))}
            </select>
            {error && (
                <small style={{ color: "red" }}>{error}</small>
            )}
        </>
    );
}