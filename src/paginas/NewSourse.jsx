import React from "react";
import { Link } from "react-router-dom";

import FormularioNewSource from "../components/FormularioNewSource";
import useNoticias from "../hooks/useNoticias";
import "./CSS/NewSourse.css";

const NewSourse = () => {
  const { newsSouce, subirNewSource, eliminarNewSorce } = useNoticias();


  return (
    <div className="card-3d-wrap mx-auto">
      <div className="card-3d-wrapper">
        <div className="card-front">
        <table className="tabla">
      <thead>
        <tr>
          <th><Link to="new">Nuevo</Link></th>
        </tr>
      </thead>
      <tbody>
        {newsSouce.map((dato, index) => (
          <tr key={dato._id}>
            <td>{dato.name}</td>
            <td>
              <Link className="boton boton-primario" to={`/dashboard/newsourse/editar/${dato._id}`} >Editar</Link>
              <Link className="boton boton-secundario" onClick={(event) => eliminarNewSorce(dato._id)}>Eliminar</Link>
              <Link className="boton boton-terciario" onClick={(event) => subirNewSource(dato)}>Subir</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </div>
      </div>
    </div>
  );
};

export default NewSourse;
