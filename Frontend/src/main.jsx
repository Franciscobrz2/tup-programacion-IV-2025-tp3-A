import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@picocss/pico";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/Layout/Layout.jsx";
import { HomePage } from './pages/homePage/HomePage';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}/>
        <Route index element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
