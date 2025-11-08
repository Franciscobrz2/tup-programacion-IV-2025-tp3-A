import { Alumnos } from "../../components/Alumnos/Alumnos";
import { LoginPage } from "../Auth/LoginPage";

export const HomePage = () => {
    const autenticado = false

    return(
        !autenticado ? <LoginPage/>:<Alumnos/>
    );
}