import { Link } from "react-router-dom"

const Registro = () => {
  return (
    <>
    <header className='header inicio'>
        <div className='menu'>
            <Link to={"/"} className="btn btn-registrate">Inicio</Link>
            <Link to={"/login"} className="btn btn-inicia-sesion">Iniciar Sesión</Link>
        </div>
        <div className='encabezado inicio'>
            <h2 className='encabezado-h2'>Registro</h2>
            <div className="adorno"></div>
        </div>
    </header>
    </>
  )
}

export default Registro
