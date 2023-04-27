import React from "react";
import { useState, useEffect, createContext } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
const ElementoCategoria = (props) => {
  const [nombre, setNombre] = useState("");
  const { editarCategoria, eliminarCategoria } = useCategory();
  useEffect(() => {
    if (props.obj._id) {
      setNombre(props.obj.name);
    }
  }, [props]);

  const handleEditar = async (e) => {
    e.preventDefault();

    if ([nombre].includes("")) {
      mostrarAlerta({
        msg: "Nombre es obligatorio",
        error: true,
      });

      return;
    }

    // Pasar los datos hacia el provider
    await editarCategoria({ id : props.obj._id, name : nombre});

  };
  const handleEliminar= () =>{
    eliminarCategoria(props.obj._id);
  }
  return (
    <tr>
      <td htmlFor=""><input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} /></td>
      <td>
        <Link className="boton boton-primario" onClick={handleEditar}>Guardar</Link>
        <Link className="boton boton-secundario" onClick={handleEliminar}>Eliminar</Link>
      </td>
    </tr>
  );
};

export default ElementoCategoria;
