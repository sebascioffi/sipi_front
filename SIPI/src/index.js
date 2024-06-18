import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Inicio from './rutas/Inicio';
import Movie from './rutas/Movie';
import Registro from './rutas/Registro';
import Login from './rutas/Login';
import Usuario from './rutas/Usuario';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route index element={<Inicio />} />
            <Route path='/movie/:id' element={<Movie />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Registro />} />
            <Route path='/:nom_usuario' element={<Usuario />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

