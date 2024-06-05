import { Link } from "react-router-dom"

const Login = () => {
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
    </>
  )
}

export default Login
