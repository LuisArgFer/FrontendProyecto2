import { useEffect, useState } from 'react'
import { useParams, Link, Navigate} from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'
import useAuth from "../hooks/useAuth";

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const { setAuth, auth } = useAuth();
  const params = useParams();
  const { id } = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
          const url = `/usuarios/confirmar/${id}`
          const { data } = await clienteAxios(url)
          localStorage.setItem('token', data.token);
          setAuth(data);
          setCuentaConfirmada(true);
          //navigate("/dashboard");
          
      } catch (error) {
          setAlerta({
            msg: "Ocurrio Un error",
            error: true
          })
      }
    }
    confirmarCuenta();
  }, [])

  const { msg } = alerta

  return (
    <>
        <h1 className="">Confirma tu cuenta y Comienza a agregar tus {''}
            <span className="">Noticias</span>
        </h1>

        <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {msg && <Alerta alerta={alerta} />}

          {cuentaConfirmada && (
            <Navigate to="/dashboard" />
          )}
        </div>
    </>
  )
}

export default ConfirmarCuenta