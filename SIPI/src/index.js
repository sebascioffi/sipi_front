import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Inicio from './rutas/Inicio';
import Movie from './rutas/Movie';
import Registro from './rutas/Registro';
import Login from './rutas/Login';
import Usuario from './rutas/Usuario';
import Perfil from './rutas/Perfil';
import MovieUsuario from './rutas/MovieUsuario';

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
            <Route path='/perfil/:nom_usuario' element={<Perfil />} />
            <Route path='/perfil/:nom_usuario/movie/:id' element={<MovieUsuario />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

