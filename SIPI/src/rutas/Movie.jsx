import { useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import "../estilos/global.css"
import { Link } from "react-router-dom"
import movietracker from "../imagenes/movietrackerlogo2.png"
import 'sweetalert2/src/sweetalert2.scss';
import Swal from "sweetalert2"

const Movie = () => {

    const { id } = useParams();
    const [movie, setMovie]=useState([])

    const handleButtonClick = () => {
      Swal.fire({
        icon: 'info',
        title: 'Debes iniciar sesión',
        text: 'Para esta funcionalidad debes iniciar sesión',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#E86405',
        background: '#f8f8f8',
        color: '#333',
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
    
    
      
  return (
    <>
    <header className='header usuario'>
        <div className='menu'>
        <Link to={`/`} className='movietrackerbtnusuario'>
            <img
              src={movietracker}
              width={"230px"}
              className='movietracker'
            />
            </Link>
            <Link to={"/registro"} className="btn btn-registrate">Regístrate</Link>
            <Link to={"/login"} className="btn btn-inicia-sesion">Inicia Sesión</Link>
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
  <button className='btn-favorite' onClick={handleButtonClick}>Añadir a favoritas</button>
  <button className='btn-pending' onClick={handleButtonClick}>Añadir a pendientes</button>
</div>
        </div>
        <p className="sinopsispel"><strong className="sinopsis">Sinopsis:</strong> {movie.overview}</p>
        <p><strong className="sinopsis">Director:</strong> {movie.director}</p>
        <p><strong className="sinopsis">Géneros:</strong> {movie.genres && movie.genres.length > 0 ? movie.genres.map(genre => genre.name).join(', ') : 'No disponible'}</p>
        <p><strong className="sinopsis">Fecha de Estreno:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
        <p><strong className="sinopsis">País de Origen:</strong> {movie.production_countries && movie.production_countries.length > 0 ? movie.production_countries[0].name : 'No disponible'}</p>
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

export default Movie