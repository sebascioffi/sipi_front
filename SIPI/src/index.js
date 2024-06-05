import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Inicio from './rutas/Inicio';
import Movie from './rutas/Movie';
import Registro from './rutas/Registro';
import Login from './rutas/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route index element={<Inicio />} />
            <Route path='/movie/:id' element={<Movie />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Registro />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

