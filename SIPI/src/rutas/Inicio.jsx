import React, { useState } from 'react'
import "../estilos/global.css"
import { Link } from "react-router-dom"
import lupa from "../imagenes/lupa.png"

const Inicio = () => {

    const [tipoBorderColor, setTipoBorderColor] = useState('#E86405');
    const [plataformaBorderColor, setPlataformaBorderColor] = useState('#E86405');
    const [generoBorderColor, setGeneroBorderColor] = useState('#E86405');
    const [añoBorderColor, setAñoBorderColor] = useState('#E86405');
    const [showInput, setShowInput] = useState(false);
  
    const handleSelectChange = (tipo, event, setBorderColor) => {
      if (event.target.value === tipo) {
        setBorderColor('#E86405');
      } else {
        setBorderColor('#FFFFFF');
      }
    };

    const toggleInput = () => {
        setShowInput((prev) => !prev);
    };

  return (
    <>
    <header className='header'>
        <div className='menu'>
            <Link to={"/"} className="btn btn-registrate">Regístrate</Link>
            <Link to={"/"} className="btn btn-inicia-sesion">Inicia Sesión</Link>
        </div>
        <div className='encabezado'>
            <h2 className='encabezado-h2'>Busca que ver de forma rápida y eficiente</h2>
            <p className='encabezado-p'>Tu destino definitivo para descubrir y explorar películas o series en base a tus gustos y a tu plataforma de streaming preferida.</p>
            <p className='encabezado-p-com'><Link to={"/"}><strong>Inicia Sesión</strong></Link> o <Link to={"/"}><strong>Regístrate</strong></Link> para comenzar!</p>
        </div>
    </header>
    <main>
        <div className="filter-container">
            <div className='selectdiv'>
            <span className="filter-label">Filtrar por:</span>
            <select className="filter-select" style={{ borderColor: tipoBorderColor }} onChange={(event) => handleSelectChange('Tipo', event, setTipoBorderColor)}>
                <option>Tipo</option>
                <option>Película</option>
                <option>Serie</option>
            </select>
            <select className="filter-select" style={{ borderColor: plataformaBorderColor }} onChange={(event) => handleSelectChange('Plataforma', event, setPlataformaBorderColor)}>
                <option>Plataforma</option>
                <option>Netflix</option>
                <option>Disney+</option>
                <option>Star+</option>
                <option>Paramount</option>
                <option>Prime Video</option>
                <option>HBO Max</option>
            </select>
            <select className="filter-select" style={{ borderColor: generoBorderColor }} onChange={(event) => handleSelectChange('Género', event, setGeneroBorderColor)}>
                <option>Género</option>
                <option>Acción</option>
                <option>Aventura</option>
                <option>Ciencia Ficción</option>
                <option>Comedia</option>
                <option>Terror</option>
                <option>Documental</option>
                <option>Drama</option>
                <option>Fantasía</option>
                <option>Musical</option>
            </select>
            <select className="filter-select" style={{ borderColor: añoBorderColor }} onChange={(event) => handleSelectChange('Año', event, setAñoBorderColor)}>
                <option>Año</option>
                <option>1960-1969</option>
                <option>1970-1979</option>
                <option>1980-1989</option>
                <option>1990-1999</option>
                <option>2000-2009</option>
                <option>2010-2019</option>
                <option>2020-2024</option>
                <option>Este año</option>
            </select>
            </div>
            <div className={`search-container ${showInput ? 'expanded' : ''}`}>
        {showInput && <input type="text" className="search-input" />}
        <button className="search-button" onClick={toggleInput}>
          <img src={lupa} alt="Buscar" />
        </button>
      </div>
        </div>
    </main>
    </>
  )
}

export default Inicio
