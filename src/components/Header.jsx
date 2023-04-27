import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCategory from "../hooks/useCategory";
import io from 'socket.io-client'
import "../paginas/CSS/Noticias.css";

let socket;
const Header = () => {
  const { cerrarSesionAuth, auth } = useAuth();
  const { categorias } = useCategory();

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto')
  }, [])

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    localStorage.removeItem("token");
  };

  return (
    <>
      <header className="page-header">
        <nav>
          <p>Noticias</p>

          <ul className="admin-menu">
            <li className="menu-heading">
              <h3>{auth.nombre}</h3>
            </li>
            <li>
              <Link to="/dashboard">
                <svg>
                  <use xlinkHref="#pages"></use>
                </svg>
                <span>News</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/newsourse">
                <svg>
                  <use xlinkHref="#users"></use>
                </svg>
                <span>New Sourse</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/perfil">
                <svg>
                  <use xlinkHref="#trends"></use>
                </svg>
                <span>Perfil</span>
              </Link>
            </li>
          </ul>
          <ul className="admin-menu">
            <li className="menu-heading">
              <h3>Categorias</h3>
            </li>
            <li>
              {categorias &&
                Array.isArray(categorias) &&
                categorias.map((categoria) => (
                  <Link
                    to={`/dashboard/categorias/${categoria.name}`}
                    key={categoria._id}
                  >
                    <svg>
                      <use xlinkHref="#users"></use>
                    </svg>
                    <span>{categoria.name}</span>
                  </Link>
                ))}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
