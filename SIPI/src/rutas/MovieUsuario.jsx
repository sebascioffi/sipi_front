import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import "../estilos/global.css"
import { Link } from "react-router-dom"
import movietracker from "../imagenes/movietrackerlogo2.png"
import user from '../imagenes/user.png'; 
import logout from '../imagenes/logout.png'; 

const port = process.env.REACT_APP_ORIGIN;

const MovieUsuario = () => {

    const { nom_usuario, id } = useParams();
    const [movie, setMovie]=useState([]);
    const [enFavoritas, setEnFavoritas] = useState(false);
    const [enPendientes, setEnPendientes] = useState(false);

      // useEffect para comprobar si la película está en favoritas del usuario
  useEffect(() => {
    const obtenerFavoritasUsuario = async () => {
        const url = `${port}/user/favoritas/${nom_usuario}`;
      
        return fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error al obtener las películas favoritas del usuario');
            }
          })
          .then(data => {
            setEnFavoritas(data.favoritas.includes(parseInt(id, 10)));
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };

    obtenerFavoritasUsuario();
  }, [nom_usuario, id]);

  // useEffect para comprobar si la película está en pendientes del usuario
  useEffect(() => {
    const obtenerPendientesUsuario = async () => {
        const url = `${port}/user/pendientes/${nom_usuario}`;
      
        return fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error al obtener las películas pendientes del usuario');
            }
          })
          .then(data => {
            setEnPendientes(data.pendientes.includes(parseInt(id, 10)));
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };

    obtenerPendientesUsuario();
  }, [nom_usuario, id]);

    const handleFavorita = () => {
        const url = `${port}/user/favorita`;
    
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nom_usuario: nom_usuario, pelicula_id: id }),
        };
    
        fetch(url, requestOptions)
          .then(response => {
            if (response.ok) {
              setEnFavoritas(!enFavoritas); // Cambia el estado de enFavoritas
            } else {
              throw new Error('Error al realizar la operación');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error. Por favor, intenta nuevamente.');
          });
      };
    
      const handlePendiente = () => {
        const url = `${port}/user/pendiente`;
    
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nom_usuario: nom_usuario, pelicula_id: id }),
        };
    
        fetch(url, requestOptions)
          .then(response => {
            if (response.ok) {
              setEnPendientes(!enPendientes); // Cambia el estado de enPendientes
            } else {
              throw new Error('Error al realizar la operación');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error. Por favor, intenta nuevamente.');
          });
        };
        const handleEliminarFavorita = () => {
            const url = `${port}/user/favorita/${id}`;
          
            const requestOptions = {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
            };
          
            fetch(url, requestOptions)
              .then(response => {
                if (response.ok) {
                  setEnFavoritas(!enFavoritas); // Cambia el estado de enFavoritas
                } else {
                  throw new Error('Error al realizar la operación');
                }
              })
              .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error. Por favor, intenta nuevamente.');
              });
          };
          const handleEliminarPendiente = () => {
            const url = `${port}/user/pendiente/${id}`;
          
            const requestOptions = {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
            };
          
            fetch(url, requestOptions)
              .then(response => {
                if (response.ok) {
                  setEnPendientes(!enPendientes); // Cambia el estado de enFavoritas
                } else {
                  throw new Error('Error al realizar la operación');
                }
              })
              .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error. Por favor, intenta nuevamente.');
              });
          };

    useEffect(() => {
        const fetchMovie = async () => {
            const urlEnglish = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
            const urlSpanish = `https://api.themoviedb.org/3/movie/${id}?language=es-ES`;
            const urlCredits = `https://api.themoviedb.org/3/movie/${id}/credits`;
            const urlWatchProviders = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;
          
            const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWM5OTZmNTQ4OTIzOTZhMzBlMWMyYjhkYmY1YjZiYSIsInN1YiI6IjYyODA2N2NkY2VlNDgxMDA2NjYyMGJlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e2pzE4WfInKObTQxR2DG5-GEZUJmwCyW6NCErHkdo2g'
              }
            };
          
            try {
              const [responseEnglish, responseSpanish, responseCredits, responseWatchProviders] = await Promise.all([
                fetch(urlEnglish, options),
                fetch(urlSpanish, options),
                fetch(urlCredits, options),
                fetch(urlWatchProviders, options)
              ]);
          
              const dataEnglish = await responseEnglish.json();
              const dataSpanish = await responseSpanish.json();
              const dataCredits = await responseCredits.json();
              const dataWatchProviders = await responseWatchProviders.json();
          
              const director = dataCredits.crew.find(person => person.job === 'Director');
              const mainActors = dataCredits.cast.slice(0, 5); // Obtener los primeros 5 actores principales
          
              const combinedData = {
                ...dataSpanish,
                title: dataEnglish.title,
                director: director ? director.name : 'Desconocido',
                mainActors: mainActors.map(actor => ({
                  name: actor.name,
                  character: actor.character,
                  profile_path: actor.profile_path
                })),
                watchProviders: dataWatchProviders.results.AR ? dataWatchProviders.results.AR.flatrate : []
              };
          
              setMovie(combinedData);
            } catch (error) {
              console.error('error:', error);
            }
          };
    
      fetchMovie();
    }, [id]);

    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('usuario'); // Elimina el ítem del localStorage
      navigate('/');
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
                <Link to={`/perfil/${nom_usuario}`} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{color: "#ffffff"}}>{nom_usuario}</span>
            <img src={user} alt="User Icon" style={{ width: '39px', height: '39px' }} />
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
    <main className='movie-details'>
  {movie && (
    <div className='movie-info'>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='movie-posterpag' />
      <div className='movie-data'>
        <div className='title-and-buttons'>
          <h1>{movie.title}</h1>
          <div className='buttons'>
            <button className={enFavoritas ? 'btn-favorite-removed' : 'btn-favorite'} onClick={enFavoritas ? handleEliminarFavorita : handleFavorita}>
              {enFavoritas ? 'Quitar de favoritas' : 'Añadir a favoritas'}
            </button>
            <button className={enPendientes ? 'btn-pending-removed' : 'btn-pending'} onClick={enPendientes ? handleEliminarPendiente : handlePendiente}>
              {enPendientes ? 'Quitar de pendientes' : 'Añadir a pendientes'}
            </button>
          </div>
        </div>
        <p className="sinopsispel"><strong className="nar">Sinopsis:</strong> {movie.overview}</p>
        <p><strong className="nar">Director:</strong> {movie.director}</p>
        <p><strong className="nar">Géneros:</strong> {movie.genres && movie.genres.length > 0 ? movie.genres.map(genre => genre.name).join(', ') : 'No disponible'}</p>
        <p><strong className="nar">Fecha de Estreno:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
        <p><strong className="nar">País de Origen:</strong> {movie.production_countries && movie.production_countries.length > 0 ? movie.production_countries[0].name : 'No disponible'}</p>
        {movie.watchProviders && movie.watchProviders.length > 0 && (
          <>
            <h2 className="disponibleen">Disponible en:</h2>
            <div className='providers'>
              {movie.watchProviders.map(provider => (
                <div key={provider.provider_id} className='provider'>
                  <img src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`} alt={provider.provider_name} />
                  <p>{provider.provider_name}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {movie.mainActors && movie.mainActors.length > 0 && (
          <>
            <h2 className="disponibleen">Actores Principales:</h2>
            <div className='main-actors'>
              {movie.mainActors.map(actor => (
                <div key={actor.name} className='actor'>
                  {actor.profile_path && (
                    <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
                  )}
                  <p><strong>{actor.name}</strong> - {actor.character}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )}
</main>


    </>
  )
}

export default MovieUsuario