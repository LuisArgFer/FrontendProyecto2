import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect, createContext } from "react";
import useCategory from "../hooks/useCategory";
import "./CSS/Perfil.css";
import ElementoCategoria from "../components/ElementoCategoria";
import io from 'socket.io-client'

let socket;
const Perfil = () => {
  const { cerrarSesionAuth, auth } = useAuth();
  const { categorias } = useCategory();
  const [admin, setAdmin] = useState(false);
  const [newRow, setNewRow] = useState({ id: '', name: ''});
  const [tableData, setTableData] = useState(categorias);
  


  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    localStorage.removeItem("token");
  };

  const handleAddRow = () => {
    setTableData([...tableData, newRow]);
    setNewRow({ id: '', name: ''});
  };

  useEffect(() => {
    const esAdmin = () => {
      if (auth.role_id == "641233bc0c629befbd6fe78b") {
        setAdmin(true);
      }
    };
    esAdmin();
  }, [auth]);


  return (
    <div className="container">
      <div className="card">
        <img
          src="https://lh3.googleusercontent.com/pZwZJ5HIL5iKbA91UGMUIPR0VJWa3K0vOGzDZmY6wU3EJBUdfsby3VEyxU162XxTyOyP3D154tjkr-4Jgcx8lygYUR8eB-jVmld4dsHi1c-mE_A8jKccseAG7bdEwVrcuuk6ciNtSw=s170-no"
          alt="Person"
          className="card__image"
        />
        <p className="card__name">{auth.nombre}</p>
        <div className="grid-container">
          <div className="grid-child-posts">{auth.email}</div>
        </div>

        <Link className="btn draw-border" onClick={handleCerrarSesion}>
          Salir
        </Link>
      </div>

      {admin ? (
        <>
          <div className="card">
            <div className="card-front">
              <table className="tabla">
                <thead>
                  <tr>
                    <th>
                      <Link onClick={handleAddRow}>
                        Nuevo
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((dato, index) => (
                    <ElementoCategoria key={index} obj={dato}></ElementoCategoria>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Perfil;
