import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "../estilos/global.css"
import { useNavigate } from 'react-router-dom';
import movietracker from "../imagenes/movietrackerlogo2.png"

const port = process.env.REACT_APP_ORIGIN;

const Registro = () => {
  const navigate = useNavigate();
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [labelText, setLabelText] = useState('Nombre de Usuario');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setLabelText('Usuario');
      } else {
        setLabelText('Nombre de Usuario');
      }
    };

    // Ejecuta la función al cargar la página
    handleResize();

    // Añade un listener para detectar cambios en el tamaño de la pantalla
    window.addEventListener('resize', handleResize);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const platforms = [
    { name: 'Disney+', value:1},
    { name: 'Paramount+',value:3},
    { name: 'Netflix',value:4},
    { name: 'Prime Video',value:5},
    { name: 'HBO Max',value:6},
    { name: 'Apple TV',value:7},
  ];

  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: '',
    preguntaSeg: 'amigoInfancia',
    respuestaSeg: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
};

const handleSubmit = async (event) => {
  event.preventDefault();
  
  const { usuario, contraseña, preguntaSeg, respuestaSeg } = formData;

  if (!usuario || !contraseña || !respuestaSeg || selectedPlatforms.length === 0) {
    setErrorMessage('Debes completar todos los datos obligatorios');
    return;
  }

  const userData = {
      nom_usuario: usuario,
      contraseña: contraseña,
      preguntaSeg: preguntaSeg,
      respuestaSeg: respuestaSeg,
      plataformas_usuario: selectedPlatforms 
  };

  try {
      const response = await fetch(`${port}/user`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
      });

      if (response.status === 500){
          setErrorMessage('Nombre de usuario ya existente');
          return;
      }

      const responseData = await response.json();
      console.log(responseData);
      navigate('/login');
      
  } catch (error) {
      console.error('Error al crear usuario:', error.message);
  }
};


  const togglePlatform = (platform) => {
    setSelectedPlatforms((prevSelectedPlatforms) => {
      if (prevSelectedPlatforms.includes(platform)) {
        return prevSelectedPlatforms.filter((p) => p !== platform);
      } else {
        return [...prevSelectedPlatforms, platform];
      }
    });
  };
  return (
    <>
    <header className='header inicio'>
        <div className='menu'>
        <Link to={"/"} className='movietrackerbtn'>
            <img
              src={movietracker}
              width={"230px"}
              className='movietracker'
            />
            </Link>
            <Link to={"/"} className="btn btn-registrate">Inicio</Link>
            <Link to={"/login"} className="btn btn-inicia-sesion">Iniciar Sesión</Link>
        </div>
        <div className='encabezado inicio'>
            <h2 className='encabezado-h2'>Registro</h2>
            <div className="adorno"></div>
        </div>
    </header>
    <div className="form-container">
      <div>
        <label>{labelText}</label>
        <input type="text"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleInputChange} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleInputChange} />
      </div>
      <div>
  <label>Pregunta de seguridad</label>
  <select
  name="preguntaSeg"
  value={formData.preguntaSeg}
  onChange={handleInputChange}
>
  <option value="amigoInfancia">Nombre de mi mejor amigo/a de la infancia</option>
  <option value="primeraMascota">Nombre de mi primera mascota</option>
  <option value="solteraMadre">Nombre de soltera de mi madre</option>
</select>

  <input
    type="text"
    name="respuestaSeg"
    value={formData.respuestaSeg}
    onChange={handleInputChange}
  />
</div>
      <div className="divplat">
        <label>Plataformas de preferencia:</label>
        <div className="platforms-container">
          {platforms.map((platform) => (
            <div
              key={platform.value}
              className={`platform ${selectedPlatforms.includes(platform.value) ? 'selected' : ''}`}
              onClick={() => togglePlatform(platform.value)}
            >
              <p alt={platform.name}>{platform.name}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="enviarbutton" onClick={handleSubmit}>Enviar</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
    </>
  )
}

export default Registro
