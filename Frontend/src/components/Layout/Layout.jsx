import { Link, Outlet } from "react-router";
import { ProtectedComponents, useAuth } from "../../Auth/Auth";
export const Layout = () => {
    const {logout, isAuthenticated} = useAuth();
    return(
        <main className="container">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <ProtectedComponents>
                        <li>
                            <Link to="/alumnos">Alumnos</Link>
                        </li>
                        <li>
                            <Link to="/materias">Materias</Link>
                        </li>
                        <li>
                            <Link to="/notas">Notas</Link>
                        </li>
                    </ProtectedComponents>
                </ul>
                <li>
                    {isAuthenticated ? (
                        <button onClick={() => logout()}>Salir</button>
                    ) : (
                        <Link type="button" to="/Login">Ingresar</Link>
                    )}
                </li>
            </nav>
            <Outlet/>
        </main>
    );
}