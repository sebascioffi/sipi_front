import React, { useEffect, useRef, useState } from 'react'
import "../estilos/global.css"
import { Link, useParams } from 'react-router-dom';
import home from '../imagenes/homeusuario.png'; 
import logout from '../imagenes/logout.png'; 
import movietracker from "../imagenes/movietrackerlogo2.png"
import grupoimg from "../imagenes/grupo.png"
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const port = process.env.REACT_APP_ORIGIN;

const Perfil = () => {

    const { nom_usuario } = useParams();

    const MySwal = withReactContent(Swal);

    const [favoritasResults, setFavoritasResults] = useState([]);
    const [pendientesResults, setPendientesResults] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [agregado, setAgregado] = useState(false);
    const API_KEY = '5ac996f54892396a30e1c2b8dbf5b6ba';

    useEffect(() => {
      const fetchFavoritas = async () => {
        try {
          const response = await fetch(`${port}/user/favoritas/${nom_usuario}`);
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
          const response = await fetch(`${port}/user/pendientes/${nom_usuario}`);
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

    useEffect(() => {
      const obtenerGrupos = async () => {
        try {
          const response = await fetch(`${port}/grupos/${nom_usuario}`);
          const data = await response.json();
          if (response.ok) {
            setGrupos(data.grupos); // Suponiendo que la respuesta JSON tiene un campo "grupos" que es un arreglo de nombres de grupo
          } else {
            console.error('Error al obtener los grupos:', data.message); // Manejo de errores si la solicitud falla
          }
        } catch (error) {
          console.error('Error en la solicitud:', error); // Manejo de errores a nivel de red o solicitud
        }
      };
  
      obtenerGrupos();
    }, [nom_usuario, agregado]);

    const handleCrearGrupo = async () => {
      const { value: nombreGrupo } = await MySwal.fire({
        title: 'Crear Grupo',
        input: 'text',
        inputLabel: 'Nombre del grupo',
        inputPlaceholder: 'Ingrese el nombre del grupo',
        showCancelButton: true,
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value) {
            return 'Necesita ingresar un nombre para el grupo!';
          }
        }
      });
  
      if (nombreGrupo) {
        try {
          const response = await fetch(`${port}/grupos/${nom_usuario}/${nombreGrupo}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }          
          });
  
          const data = await response.json();
  
          if (data.message === 'Grupo creado con éxito') {
            Swal.fire('Éxito', 'El grupo ha sido creado correctamente.', 'success');
            setAgregado(!agregado);
          } else if (data.message === 'El nombre del grupo ya existe') {
            Swal.fire('Error', 'El nombre del grupo ya existe.', 'error');
          } else {
            Swal.fire('Error', 'Hubo un problema al crear el grupo.', 'error');
          }
        } catch (error) {
          console.error('Error:', error);
          Swal.fire('Error', 'Hubo un problema al crear el grupo.', 'error');
        }
      }
    };

    const buscarGrupo = async () => {
      const { value: nombreGrupo } = await Swal.fire({
          title: 'Unirse a Grupo',
          input: 'text',
          inputLabel: 'Ingrese el nombre del grupo.',
          inputPlaceholder: 'Ingrese el nombre del grupo',
          showCancelButton: true,
          confirmButtonText: 'Unirse',
          cancelButtonText: 'Cancelar',
          inputValidator: (value) => {
              if (!value) {
                  return 'Necesita ingresar un nombre para buscar el grupo!';
              }
          }
      });
  
      if (nombreGrupo) {
          try {
            const response = await fetch(`${port}/grupos/unirse/${nom_usuario}/${nombreGrupo}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }          
            });
    
            const data = await response.json();
              if (data.message === 'Te has unido al grupo exitosamente') {
                  Swal.fire('Éxito', `Te has unido al grupo ${nombreGrupo}`, 'success');
                  setAgregado(!agregado);
              } else if (data.message === 'Grupo no existe') {
                  Swal.fire('Error', `El grupo ${nombreGrupo} no existe.`, 'error');
              } else if (data.message === 'Ya te encuentras en el grupo') {
                  Swal.fire('Error', `Ya te encuentras en el grupo ${nombreGrupo}`, 'error');
              } else{
                Swal.fire('Error', 'Hubo un problema al unirse al grupo.', 'error');
              }
          } catch (error) {
              console.error('Error:', error);
              Swal.fire('Error', 'Hubo un problema al unirse al grupo.', 'error');
          }
      }
  };

    const fetch = require('node-fetch');
    const containerRef1 = useRef(null);
    const containerRef2 = useRef(null);
    const containerRef3 = useRef(null);

    const handleLogout = () => {
      localStorage.removeItem('usuario'); // Elimina el ítem del localStorage
      navigate('/');
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

  return (
    <>
    <header className='header usuario'>
        <div className='menu'>
        <Link to={`/${nom_usuario}`} className='movietrackerbtnusuario'>
            <img
              src={movietracker}
              width={"230px"}
              className='movietracker'
            />
            </Link>
            <Link to={`/${nom_usuario}`} style={{ display: 'flex', alignItems: 'center' }}>
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
    </header>
    <main>

    <div className="container-m">
 <div className='container-tm'>
   <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M19 9.025L0 19V0L19 9.025Z" fill="#E86405"/>
   </svg>
   <h1 className='popmovies'>Mis Favoritas</h1>
 </div>
 <div className="movies-wrapper">
   <button className="nav-button left" onClick={() => scrollContainer1('left')}>{'<'}</button>
   <div className="movies-container" ref={containerRef1}>
  {favoritasResults.length === 0 ? (
    <p className='sinpeliculas'>No has añadido favoritas</p>
  ) : (
    favoritasResults.map((movie) => (
      <Link to={`/perfil/${nom_usuario}/movie/${movie.id}`} key={movie.id}>
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
   <h1 className='popmovies'>Pendientes</h1>
 </div>
 <div className="movies-wrapper">
   <button className="nav-button left" onClick={() => scrollContainer2('left')}>{'<'}</button>
   <div className="movies-container" ref={containerRef2}>
  {pendientesResults.length === 0 ? (
    <p className='sinpeliculas'>No has añadido pendientes</p>
  ) : (
    pendientesResults.map((movie) => (
      <Link to={`/perfil/${nom_usuario}/movie/${movie.id}`} key={movie.id}>
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
<div className="container-m">
<div className='container-grupo'>
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 9.025L0 19V0L19 9.025Z" fill="#E86405"/>
  </svg>
  <h1 className='gruposh1'>Mis Grupos</h1>
  <button className='btn-group crear' onClick={handleCrearGrupo}>Crear Grupo</button>
  <button className='btn-group' onClick={buscarGrupo}>Unirse a un grupo</button>
</div>
 <div className="movies-wrapper">
   <button className="nav-button left" onClick={() => scrollContainer3('left')}>{'<'}</button>
   <div className="movies-container" ref={containerRef3}>
  {grupos.length === 0 ? (
    <p className='sinpeliculas'>No te has unido a ningún grupo</p>
  ) : (
    grupos.map((grupo,index) => (
      <Link to={`/grupo/${grupo}`} key={index}>
        <div className="grupo">
          <img
            src={grupoimg}
            className="grupo-poster"
          />
          <p>{grupo}</p>
        </div>
      </Link>
    ))
  )}
</div>
   <button className="nav-button right" onClick={() => scrollContainer3('right')}>{'>'}</button>
 </div>
</div>
    </main>
    </>
  )
}

export default Perfil
