import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './rutas/Inicio';
import Movie from './rutas/Movie';
import Registro from './rutas/Registro';
import Login from './rutas/Login';
import Usuario from './rutas/Usuario';
import Perfil from './rutas/Perfil';
import MovieUsuario from './rutas/MovieUsuario';
import Grupo from './rutas/Grupo';
import GrupoUsuario from './rutas/GrupoUsuario';
import ProtectedRoute from './componentes/ProtectedRoute';
import ProtectedInicio from './componentes/ProtectedInicio';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route index element={
              <ProtectedInicio>
              <Inicio />
              </ProtectedInicio>} />
            <Route path='/movie/:id' element={
              <ProtectedInicio>
                <Movie />
                </ProtectedInicio>} />
            <Route path='/login' element={
              <ProtectedInicio>
              <Login />
              </ProtectedInicio>} />
            <Route path='/registro' element={
              <ProtectedInicio>
                <Registro />
                </ProtectedInicio>} />
            <Route 
              path='/:nom_usuario' 
              element={
                <ProtectedRoute>
                  <Usuario />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/perfil/:nom_usuario' 
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/perfil/:nom_usuario/movie/:id' 
              element={
                <ProtectedRoute>
                  <MovieUsuario />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/grupo/:nombre_grupo' 
              element={
                <ProtectedRoute>
                  <Grupo />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/grupo/usuario/:nom_usuario' 
              element={
                <ProtectedRoute>
                  <GrupoUsuario />
                </ProtectedRoute>
              } 
            />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
