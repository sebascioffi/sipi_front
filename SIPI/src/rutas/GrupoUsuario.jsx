import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import movietracker from '../imagenes/movietrackerlogo2.png'; 
import home from '../imagenes/homeusuario.png'; 
import logout from '../imagenes/logout.png'; 
import user from '../imagenes/user.png'; 


const GrupoUsuario = () => {
    const { nom_usuario } = useParams();

    const fetch = require('node-fetch');

    const [favoritasResults, setFavoritasResults] = useState([]);
    const [pendientesResults, setPendientesResults] = useState([]);
    const API_KEY = '5ac996f54892396a30e1c2b8dbf5b6ba';
    const usuarioActual = localStorage.getItem('usuario');


    const containerRef1 = useRef(null);
    const containerRef2 = useRef(null);

    const scrollContainer1 = (direction) => {
        if (direction === 'left') {
          containerRef1.current.scrollBy({ left: -600, behavior: 'smooth' });
        } else {
          containerRef1.current.scrollBy({ left: 600, behavior: 'smooth' });
        }
      };

      const scrollContainer2 = (direction) => {
        if (direction === 'left') {
          containerRef1.current.scrollBy({ left: -600, behavior: 'smooth' });
        } else {
          containerRef1.current.scrollBy({ left: 600, behavior: 'smooth' });
        }
      };

      useEffect(() => {
        const fetchFavoritas = async () => {
          try {
            const response = await fetch(`http://localhost:8080/user/favoritas/${nom_usuario}`);
            if (!response.ok) {
              throw new Error('Error fetching favoritas');
            }
            const data = await response.json();
            const peliculaIds = data.favoritas;
      
            const fetchPeliculaData = async (id) => {
              const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
              if (!tmdbResponse.ok) {
                const tvResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
                if (!tvResponse.ok) {
                  throw new Error(`Error fetching data for ID ${id}`);
                }
                return await tvResponse.json();
              }
              return await tmdbResponse.json();
            };
      
            const peliculasData = await Promise.all(peliculaIds.map(fetchPeliculaData));
            setFavoritasResults(peliculasData);
          } catch (error) {
            console.error('Error fetching favoritas:', error);
          }
        };
      
        if (nom_usuario) {
          fetchFavoritas();
        }
      }, [nom_usuario]);
      
      useEffect(() => {
        const fetchPendientes = async () => {
          try {
            const response = await fetch(`http://localhost:8080/user/pendientes/${nom_usuario}`);
            if (!response.ok) {
              throw new Error('Error fetching pendientes');
            }
            const data = await response.json();
            const peliculaIds = data.pendientes;
      
            const fetchPeliculaData = async (id) => {
              const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
              if (!tmdbResponse.ok) {
                const tvResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
                if (!tvResponse.ok) {
                  throw new Error(`Error fetching data for ID ${id}`);
                }
                return await tvResponse.json();
              }
              return await tmdbResponse.json();
            };
      
            const peliculasData = await Promise.all(peliculaIds.map(fetchPeliculaData));
            setPendientesResults(peliculasData);
          } catch (error) {
            console.error('Error fetching pendientes:', error);
          }
        };
      
        if (nom_usuario) {
          fetchPendientes();
        }
      }, [nom_usuario]);

  return (
    <>
        <header className='header usuario '>
    <div className='menu'>
    <Link to={`/${usuarioActual}`} className='movietrackerbtnusuario'>
        <img
          src={movietracker}
          width={"230px"}
          className='movietracker'
        />
        </Link>
        <Link to={`/perfil/${usuarioActual}`} style={{ display: 'flex', alignItems: 'center', marginRight: "40px" }}>
            <span style={{color: "#ffffff"}}>{usuarioActual}</span>
            <img src={user} alt="User Icon" style={{ width: '39px', height: '39px' }} />
            </Link>
        <Link to={`/${usuarioActual}`} style={{ display: 'flex', alignItems: 'center' }}>
        <img src={home} alt="User Icon" style={{ width: '39px', height: '39px' }} />
        </Link>
        <Link to={`/`} style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logout} alt="Cerrar Sesión" style={{ width: '32px', height: '32px', marginLeft: "50px", marginRight:"40px"}} />
        </Link>
    </div>
</header>
<main>
<div className="container-m">
 <div className='container-tm'>
   <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M19 9.025L0 19V0L19 9.025Z" fill="#E86405"/>
   </svg>
   <h1 className='popmovies'>Favoritas de {nom_usuario}</h1>
 </div>
 <div className="movies-wrapper">
   <button className="nav-button left" onClick={() => scrollContainer1('left')}>{'<'}</button>
   <div className="movies-container" ref={containerRef1}>
  {favoritasResults.length === 0 ? (
    <p className='sinpeliculas'>No ha añadido favoritas</p>
  ) : (
    favoritasResults.map((movie) => (
      <Link to={`/perfil/${usuarioActual}/movie/${movie.id}`} key={movie.id}>
        <div className="movie">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
        </div>
      </Link>
    ))
  )}
</div>
   <button className="nav-button right" onClick={() => scrollContainer1('right')}>{'>'}</button>
 </div>
</div>
<div className="container-m">
 <div className='container-tm'>
   <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M19 9.025L0 19V0L19 9.025Z" fill="#E86405"/>
   </svg>
   <h1 className='popmovies'>Pendientes de {nom_usuario}</h1>
 </div>
 <div className="movies-wrapper">
   <button className="nav-button left" onClick={() => scrollContainer2('left')}>{'<'}</button>
   <div className="movies-container" ref={containerRef2}>
  {pendientesResults.length === 0 ? (
    <p className='sinpeliculas'>No ha añadido pendientes</p>
  ) : (
    pendientesResults.map((movie) => (
      <Link to={`/perfil/${usuarioActual}/movie/${movie.id}`} key={movie.id}>
        <div className="movie">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
        </div>
      </Link>
    ))
  )}
</div>
   <button className="nav-button right" onClick={() => scrollContainer2('right')}>{'>'}</button>
 </div>
</div>

</main>
</>
  )
}

export default GrupoUsuario
