import { NotasPage } from "../NotasPage/NotasPage";
import { LoginPage } from "../Auth/LoginPage";

export const HomePage = () => {
    const autenticado = true

    return(
        !autenticado ? <LoginPage/>:<NotasPage/>
    );
}