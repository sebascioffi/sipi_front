import { useState } from "react";
import { Link } from "react-router-dom"
import "../estilos/global.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
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

  try {
      const response = await fetch('http://localhost:8080/user/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nom_usuario: usuario, contraseña: contraseña })
      });

        if (response.status === 401){
          throw new Error('Faltan datos necesarios');
        }

      const responseData = await response.json();
      console.log('Inicio de sesión exitoso:', responseData);
      navigate(`/${usuario}`);

  } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
  }
};


  return (
    <>
    <header className='header inicio'>
        <div className='menu'>
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
        <label>Nombre de Usuario:</label>
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
    </div>
    </>
  )
}

export default Login
