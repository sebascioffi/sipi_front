import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "../estilos/global.css"
import { useNavigate } from 'react-router-dom';
import movietracker from "../imagenes/movietrackerlogo2.png"

const port = process.env.REACT_APP_ORIGIN;

const Login = () => {

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

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: '',
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
  
  const { usuario, contraseña } = formData;

  if (!usuario || !contraseña) {
    setErrorMessage('Debes completar todos los datos obligatorios');
    return;
  }

  try {
      const response = await fetch(`${port}/user/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nom_usuario: usuario, contraseña: contraseña })
      });

        if (response.status === 401){
          setErrorMessage('Datos incorrectos');
          return;
        }

      const responseData = await response.json();
      console.log('Inicio de sesión exitoso:', responseData);
      localStorage.setItem('usuario', usuario);
      navigate(`/${usuario}`);

  } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
  }
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
            <Link to={"/registro"} className="btn btn-inicia-sesion">Regístrate</Link>
        </div>
        <div className='encabezado inicio'>
            <h2 className='encabezado-h2'>Inicio de Sesión</h2>
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
      <button className="enviarbutton login" onClick={handleSubmit}>Enviar</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
    </>
  )
}

export default Login
