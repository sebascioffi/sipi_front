import React, { useEffect, useRef, useState } from 'react'
import "../estilos/global.css"
import { Link } from "react-router-dom"
import item from "../imagenes/im.png"
import lupa from "../imagenes/lupa.png"

const Inicio = () => {

    const [tipoBorderColor, setTipoBorderColor] = useState('#E86405');
    const [plataformaBorderColor, setPlataformaBorderColor] = useState('#E86405');
    const [generoBorderColor, setGeneroBorderColor] = useState('#E86405');
    const [añoBorderColor, setAñoBorderColor] = useState('#E86405');
    const [showInput, setShowInput] = useState(false);
    const [movies, setMovies] = useState([]);

    const fetch = require('node-fetch');
    const containerRef = useRef(null);
  
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

    const fetchPopularMovies = async () => {
      const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWM5OTZmNTQ4OTIzOTZhMzBlMWMyYjhkYmY1YjZiYSIsInN1YiI6IjYyODA2N2NkY2VlNDgxMDA2NjYyMGJlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e2pzE4WfInKObTQxR2DG5-GEZUJmwCyW6NCErHkdo2g'
        }
      };
  
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('error:', error);
      }
    };
  
    useEffect(() => {
      fetchPopularMovies();
    }, []);
  
    const scrollContainer = (direction) => {
      if (direction === 'left') {
        containerRef.current.scrollBy({ left: -600, behavior: 'smooth' });
      } else {
        containerRef.current.scrollBy({ left: 600, behavior: 'smooth' });
      }
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

      <div className="container-m">
      <div className='container-tm'>
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 9.025L0 19V0L19 9.025Z" fill="#E86405"/>
</svg>

        <h1 className='popmovies'>Tendencias</h1>
      </div>
      <div className="movies-wrapper">
        <button className="nav-button left" onClick={() => scrollContainer('left')}>{'<'}</button>
        <div className="movies-container" ref={containerRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            </div>
          ))}
        </div>
        <button className="nav-button right" onClick={() => scrollContainer('right')}>{'>'}</button>
      </div>
    </div>
    </main>
    </>
  )
}

export default Inicio
