import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@picocss/pico";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Layout } from "./components/Layout/Layout.jsx";
import { HomePage } from './pages/HomePage/HomePage';
import { AuthProvider } from './Auth/Auth.jsx';
import { AlumnosPage } from './pages/AlumnosPage/AlumnosPage.jsx';
import { MateriasPage } from './pages/MateriasPage/MateriasPage.jsx';
import { NotasPage } from './pages/NotasPage/NotasPage.jsx';
import { AuthPage } from './Auth/Auth.jsx';
import { LoginPage } from './pages/Auth/LoginPage.jsx';
import { RegisterPage } from './pages/Auth/RegisterPage.jsx';
import { Modificar } from './components/Modificar/Modificar.jsx';
import { Crear } from './components/Crear/Crear.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
     <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}> 
            <Route index element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            
            <Route
              path="/alumnos" 
              element={
                <AuthPage>
                  <AlumnosPage/>
                </AuthPage>
              }
            />
            <Route 
              path="/materias" 
              element={
                <AuthPage>
                  <MateriasPage/>
                </AuthPage>
              }
            />
            <Route 
              path="/notas" 
              element={
                <AuthPage>
                  <NotasPage/>
                </AuthPage>
              }
            />
            <Route 
              path="/:ruta/:id/modificar"
              element={
                <AuthPage>
                  <Modificar/>
                </AuthPage>
              }
            />
            <Route 
              path="/:ruta/crear"
              element={
                <AuthPage>
                  <Crear/>
                </AuthPage>
              }
            />
          </Route>
   
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>
)
