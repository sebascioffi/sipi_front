import React, { useEffect, useRef, useState } from 'react'
import "../estilos/global.css"
import { Link } from "react-router-dom"
import lupa from "../imagenes/lupa.png"

const Inicio = () => {

    const [tipoBorderColor, setTipoBorderColor] = useState('#E86405');
    const [plataformaBorderColor, setPlataformaBorderColor] = useState('#E86405');
    const [generoBorderColor, setGeneroBorderColor] = useState('#E86405');
    const [añoBorderColor, setAñoBorderColor] = useState('#E86405');
    const [showInput, setShowInput] = useState(false);
    const [movies, setMovies] = useState([]);
    const [sciFi, setSciFi] = useState([]);
    const [terror, setTerror] = useState([]);
    const [peliculasFiltro, setPeliculasFiltro] = useState([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('');
    const [generoSeleccionado, setGeneroSeleccionado] = useState('');

    const fetch = require('node-fetch');
    const containerRef1 = useRef(null);
    const containerRef2 = useRef(null);
    const containerRef3 = useRef(null);

    useEffect(() => {
      const fetchData = async () => {
        if (!tipoSeleccionado && !generoSeleccionado) {
          setPeliculasFiltro([]);
          return;
        }
  
        const baseUrl = 'https://api.themoviedb.org/3/';
        let endpoint = '';
        if (tipoSeleccionado) {
          endpoint = tipoSeleccionado === 'Película' ? 'discover/movie' : 'discover/tv';
        } else {
          endpoint = 'discover/movie';  // Por defecto buscará películas si no hay tipo seleccionado
        }
  
        let genreFilter = '';
        if (generoSeleccionado) {
          if (endpoint==="discover/movie"){
            if (generoSeleccionado === "10759"){
              generoSeleccionado = "28";
            }
            if (generoSeleccionado === "10765"){
              generoSeleccionado = "878";
            }
            if (generoSeleccionado === "10768"){
              generoSeleccionado = "10752";
            }
          }
          genreFilter = `&with_genres=${generoSeleccionado}`;
        }
  
        let allResults = [];
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWM5OTZmNTQ4OTIzOTZhMzBlMWMyYjhkYmY1YjZiYSIsInN1YiI6IjYyODA2N2NkY2VlNDgxMDA2NjYyMGJlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e2pzE4WfInKObTQxR2DG5-GEZUJmwCyW6NCErHkdo2g'
          }
        };
  
        for (let page = 1; page <= 5; page++) {
          const url = `${baseUrl}${endpoint}?language=en-US&page=${page}&region=US&include_adult=false&vote_count.gte=100&vote_average.gte=7${genreFilter}`;
          try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (data && data.results) {
              allResults = allResults.concat(data.results);
            } else {
              console.error('No results found:', data);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
  
        setPeliculasFiltro(allResults);
      };
  
      fetchData();
    }, [tipoSeleccionado, generoSeleccionado]);
    
  
    const handleSelectChange = (setSeleccionado, setBorderColor) => (event) => {
      const value = event.target.value;
      setSeleccionado(value);
      setBorderColor(value === '' ? '#E86405' : '#FFFFFF');
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

    const fetchSciFiMovies = async () => {
      const url = 'https://api.themoviedb.org/3/discover/movie?with_genres=878&sort_by=popularity.desc&language=en-US&page=2';
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
        setSciFi(data.results);
      } catch (error) {
        console.error('error:', error);
      }
    };

    const fetchTerrorMovies = async () => {
      const url = 'https://api.themoviedb.org/3/discover/movie?with_genres=27&sort_by=popularity.desc&language=en-US&page=2';
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
        setTerror(data.results);
      } catch (error) {
        console.error('error:', error);
      }
    };
    
    const scrollContainer1 = (direction) => {
      if (direction === 'left') {
        containerRef1.current.scrollBy({ left: -600, behavior: 'smooth' });
      } else {
        containerRef1.current.scrollBy({ left: 600, behavior: 'smooth' });
      }
    };

    const scrollContainer2 = (direction) => {
      if (direction === 'left') {
        containerRef2.current.scrollBy({ left: -600, behavior: 'smooth' });
      } else {
        containerRef2.current.scrollBy({ left: 600, behavior: 'smooth' });
      }
    };

    const scrollContainer3 = (direction) => {
      if (direction === 'left') {
        containerRef3.current.scrollBy({ left: -600, behavior: 'smooth' });
      } else {
        containerRef3.current.scrollBy({ left: 600, behavior: 'smooth' });
      }
    };
  
    useEffect(() => {
      fetchPopularMovies();
      fetchSciFiMovies();
      fetchTerrorMovies();
    }, []);
  

  return (
    <>
    <header className='header'>
        <div className='menu'>
            <Link to={"/registro"} className="btn btn-registrate">Regístrate</Link>
            <Link to={"/login"} className="btn btn-inicia-sesion">Inicia Sesión</Link>
        </div>
        <div className='encabezado'>
            <h2 className='encabezado-h2'>Busca que ver de forma rápida y eficiente</h2>
            <p className='encabezado-p'>Tu destino definitivo para descubrir y explorar películas o series en base a tus gustos y a tu plataforma de streaming preferida.</p>
            <p className='encabezado-p-com'><Link to={"/login"}><strong>Inicia Sesión</strong></Link> o <Link to={"/registro"}><strong>Regístrate</strong></Link> para comenzar!</p>
        </div>
    </header>
    <main>
        <div className="filter-container">
            <div className='selectdiv'>
            <span className="filter-label">Filtrar por:</span>
            
            <select
  className="filter-select"
  style={{ borderColor: tipoBorderColor }}
  onChange={handleSelectChange(setTipoSeleccionado, setTipoBorderColor)}
>
  <option value="">Tipo</option>
  <option value="Película">Película</option>
  <option value="Serie">Serie</option>
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

            <select
  className="filter-select"
  style={{ borderColor: generoBorderColor }}
  onChange={handleSelectChange(setGeneroSeleccionado, setGeneroBorderColor)}
>
  <option value="">Género</option>
  <option value="10759">Acción</option>
  <option value="18">Drama</option>
  <option value="10765">Ciencia Ficción</option>
  <option value="35">Comedia</option>
  <option value="16">Animación</option>
  <option value="80">Crimen</option>
  <option value="9648">Terror</option>
  <option value="10751">Romance</option>
  <option value="37">Wéstern</option>
  <option value="10768">Bélica</option>
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


      {peliculasFiltro.length>0 ? (
               <>
        <div className="movies-container-filtro">
        {peliculasFiltro.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
          <div key={movie.id} className="movie">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
          </div>
          </Link>
        ))}
        </div>
               </>
      ): (
        <>
      <div className="container-m">
      <div className='container-tm'>
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 9.025L0 19V0L19 9.025Z" fill="#E86405"/>
        </svg>
        <h1 className='popmovies'>Tendencias</h1>
      </div>
      <div className="movies-wrapper">
        <button className="nav-button left" onClick={() => scrollContainer1('left')}>{'<'}</button>
        <div className="movies-container" ref={containerRef1}>
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
          <div key={movie.id} className="movie">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
          </div>
          </Link>
        ))}
        </div>
        <button className="nav-button right" onClick={() => scrollContainer1('right')}>{'>'}</button>
      </div>
    </div>


    <div className="container-m">
      <div className='container-tm'>
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 9.025L0 19V0L19 9.025Z" fill="#E86405"/>
        </svg>
        <h1 className='popmovies'>Ciencia Ficción</h1>
      </div>
      <div className="movies-wrapper">
        <button className="nav-button left" onClick={() => scrollContainer2('left')}>{'<'}</button>
        <div className="movies-container" ref={containerRef2}>
        {sciFi.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
          <div key={movie.id} className="movie">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
        </div>
        </Link>
        ))}
        </div>
        <button className="nav-button right" onClick={() => scrollContainer2('right')}>{'>'}</button>
      </div>
    </div>

    <div className="container-m">
      <div className='container-tm'>
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 9.025L0 19V0L19 9.025Z" fill="#E86405"/>
        </svg>
        <h1 className='popmovies'>Terror</h1>
      </div>
      <div className="movies-wrapper">
        <button className="nav-button left" onClick={() => scrollContainer3('left')}>{'<'}</button>
        <div className="movies-container" ref={containerRef3}>
        {terror.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
          <div key={movie.id} className="movie">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
        </div>
        </Link>
        ))}
        </div>
        <button className="nav-button right" onClick={() => scrollContainer3('right')}>{'>'}</button>
      </div>
    </div>
    </>
      )}


    </main>
    </>
  )
}

export default Inicio
