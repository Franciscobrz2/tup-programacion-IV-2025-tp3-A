import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@picocss/pico";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/Layout/Layout.jsx";
import { HomePage } from './pages/homePage/HomePage';
import { AuthProvider } from './Auth/Auth.jsx';
import { AlumnosPage } from './pages/AlumnosPage/AlumnosPage.jsx';
import { MateriasPage } from './pages/MateriasPage/MateriasPage.jsx';
import { NotasPage } from './pages/NotasPage/NotasPage.jsx';
createRoot(document.getElementById('root')).render(
  <AuthProvider>
     <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}> 
            <Route index element={<HomePage/>}/>
            <Route path="/alumnos" element={<AlumnosPage/>}/>
            <Route path="/materias" element={<MateriasPage/>}/>
            <Route path="/notas" element={<NotasPage/>}/>
          </Route>
   
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  </AuthProvider>
)
