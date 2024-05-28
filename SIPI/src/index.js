import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Inicio from './rutas/Inicio';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route index element={<Inicio />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

