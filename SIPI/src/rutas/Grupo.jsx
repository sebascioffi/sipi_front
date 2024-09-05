import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import userpng from '../imagenes/user.png'; 
import movietracker from '../imagenes/movietrackerlogo2.png'; 
import home from '../imagenes/homeusuario.png'; 
import logout from '../imagenes/logout.png'; 
import user from '../imagenes/user.png'; 

const port = process.env.REACT_APP_ORIGIN;

const Grupo = () => {
    const { nombre_grupo } = useParams();
    const TMDB_API_KEY = '5ac996f54892396a30e1c2b8dbf5b6ba';
    const usuarioActual = localStorage.getItem('usuario');

    const fetch = require('node-fetch');

    const [usuarios, setUsuarios] = useState([]);
    const [recomendaciones, setRecomendaciones] = useState([]);

    const containerRef1 = useRef(null);

    const scrollContainer1 = (direction) => {
        if (direction === 'left') {
          containerRef1.current.scrollBy({ left: -600, behavior: 'smooth' });
        } else {
          containerRef1.current.scrollBy({ left: 600, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch(`${port}/grupos/usuario/${nombre_grupo}`);
                if (!response.ok) {
                    throw new Error('Error al obtener usuarios del grupo');
                }
                const data = await response.json();
                console.log(data);
                // Extraer los nombres de usuarios del objeto data recibido
                if (data.usuarios) {
                    setUsuarios(data.usuarios);
                }
            } catch (error) {
                console.error('Error al obtener usuarios del grupo:', error);
            }
        };

        fetchUsuarios();
    }, [nombre_grupo]);

    const obtenerRecomendaciones = async (movieId) => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&language=es-ES&page=1`);
          const data = await response.json();
          return data.results;
        } catch (error) {
          console.error('Error al obtener recomendaciones:', error);
          return [];
        }
      };

      const obtenerUltimaFavorita = async (usuario) => {
        try {
          const response = await fetch(`${port}/user/ultimaFavorita/${usuario}`);
          const data = await response.json();
          return data.ultimaFavorita;
        } catch (error) {
          console.error(`Error al obtener la última favorita del usuario ${usuario}:`, error);
          return null;
        }
      };

      useEffect(() => {
        const fetchRecomendaciones = async () => {
          let todasRecomendaciones = [];
          const recomendacionesSet = new Set();
          
          for (const usuario of usuarios) {
            const movieId = await obtenerUltimaFavorita(usuario);
    
            if (movieId) {
              const recomendacionesUsuario = await obtenerRecomendaciones(movieId);
              recomendacionesUsuario.forEach(pelicula => {
                if (!recomendacionesSet.has(pelicula.id)) {
                  recomendacionesSet.add(pelicula.id);
                  todasRecomendaciones.push(pelicula);
                }
              });
            }
          }
    
          setRecomendaciones(todasRecomendaciones);
        };
    
        if (usuarios.length > 0) {
          fetchRecomendaciones();
        }
      }, [usuarios]);

      const handleLogout = () => {
        localStorage.removeItem('usuario'); // Elimina el ítem del localStorage
        navigate('/');
      };

  return (
    <>
    <header className='header grupoheader'>
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
        <button
      onClick={handleLogout}
      style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none' }}
    >
      <img
        src={logout}
        alt="Cerrar Sesión"
        style={{ width: '32px', height: '32px', marginLeft: '50px', marginRight: '40px' }}
      />
    </button>
    </div>
    <div className='encabezado inicio'>
            <h2 className='encabezado-h2'>{nombre_grupo}</h2>
            <div className="adorno adorno-grupo"></div>
        </div>
</header>
<main>
<div className="container-m">
<div className='container-grupo'>
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 9.025L0 19V0L19 9.025Z" fill="#E86405"/>
  </svg>
  <h1 className='gruposh1'>Usuarios del grupo {nombre_grupo}</h1>
</div>
 <div className="movies-wrapper">
   <button className="nav-button left" onClick={() => scrollContainer1('left')}>{'<'}</button>
   <div className="movies-container" ref={containerRef1}>
  {usuarios.length === 0 ? (
    <p className='sinpeliculas'>No hay usuarios en este grupo</p>
  ) : (
    usuarios.map((usuario,index) => (
      <Link to={`/grupo/usuario/${usuario}`} key={index}>
        <div className="grupo">
          <img
            src={userpng}
            className="grupo-poster"
          />
          <p className="pusuario">{usuario}</p>
        </div>
      </Link>
    ))
  )}
</div>
   <button className="nav-button right" onClick={() => scrollContainer1('right')}>{'>'}</button>
 </div>
</div>

<div className="container-m">
<div className='container-grupo'>
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 9.025L0 19V0L19 9.025Z" fill="#E86405"/>
  </svg>
  <h1 className='gruposh1'>Recomendaciones según los gustos de los usuarios del grupo</h1>
</div>
 <div className="movies-wrapper">
   <button className="nav-button left" onClick={() => scrollContainer1('left')}>{'<'}</button>
   <div className="movies-container" ref={containerRef1}>
  {recomendaciones.length === 0 ? (
    <p className='sinpeliculas'>No hay recomendaciones</p>
  ) : (
    recomendaciones.map((movie) => (
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
</main>
</>
  )
}

export default Grupo
