import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useNoticias from "../hooks/useNoticias";
import useCategory from "../hooks/useCategory";
import Alerta from "./Alerta";

const FormularioNewSource = () => {
  const [id, setId] = useState(null);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [category_id, setCategory_id] = useState("");

  const params = useParams();
  const { mostrarAlerta, alerta, submitNewSource, newSouce } = useNoticias();
  const { categorias } = useCategory();
  useEffect(() => {
    if (params.id) {
      setId(newSouce._id);
      setUrl(newSouce.url);
      setName(newSouce.name);
      setCategory_id(newSouce.category_id);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([url, name, category_id].includes("")) {
      mostrarAlerta({
        msg: "Todos los Campos son Obligatorios",
        error: true,
      });

      return;
    }

    // Pasar los datos hacia el provider
    await submitNewSource({ id, url, name, category_id });

    setId(null);
    setName("");
    setUrl("");
    setCategory_id("");
  };

  const { msg } = alerta;

  return (
    <div className="card-3d-wrap mx-auto">
      <div className="card-3d-wrapper">
        <div className="card-front">
          <div className="mx-auto center-wrap">
            <div className="section text-center">
              <form className="section text-center" onSubmit={handleSubmit}>
                <h5 className="mb-4 pb-3">New Source</h5>
                {msg && <Alerta alerta={alerta} />}

                <div className="form-group">
                  <input
                    id="url"
                    type="text"
                    className="form-style"
                    placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <i className="input-icon uil uil-user"></i>
                </div>

                <div className="form-group">
                  <input
                    id="name"
                    className="form-style"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <i className="input-icon uil uil-user"></i>
                </div>

                <div className="form-group">
                  <select
                    name="pets"
                    id="pet-select"
                    className="form-style"
                    onChange={(e) => setCategory_id(e.target.value)}
                  >
                    <option value="">--Seleccione Categoria--</option>
                    {categorias.map((categorias) => (
                      <option key={categorias._id} value={categorias._id}>
                        {categorias.name}
                      </option>
                    ))}
                  </select>
                  <i className="input-icon uil uil-user"></i>
                </div>

                <input
                  type="submit"
                  value={id ? "Actualizar News Source" : "Crear News Source"}
                  className="btn mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioNewSource;
