
export const Login = () => {

    return (
        <>
            <div>
                <form>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email"  
                        value={""}
                        onChange={null}
                        className=""
                        placeholder="@ejemplo.com"
                    />
                    <br />
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        type="password" 
                        name="password"  
                        value={""}
                        onChange={null}
                        className=""
                        placeholder="contraseñas"
                    />
                    <button type="submit">Iniciar sesion</button>
                </form>

            </div>
        </>
    );
}