import { Link, Outlet } from "react-router";
import { useAuth } from "../../Auth/Auth";
export const Layout = () => {
    const {logout, isAuthenticated} = useAuth();
    return(
        <main className="container">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/alumnos">Alumnos</Link>
                    </li>
                    <li>
                        <Link to="/materias">Materias</Link>
                    </li>
                    <li>
                        <Link to="/notas">Notas</Link>
                    </li>
                </ul>
                <li>
                    { isAuthenticated  && 
                        <button onClick={() => logout()}>Salir</button>
                    }
                </li>
            </nav>
            <Outlet/>
        </main>
    );
}