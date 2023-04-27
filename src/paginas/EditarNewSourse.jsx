import React from "react";
import useNoticias from "../hooks/useNoticias";
import { useState, useEffect, createContext } from "react";
import { useParams } from 'react-router-dom'
import FormularioNewSource from "../components/FormularioNewSource";
const EditarNewSourse = () => {
  const {obtenerNewSource } = useNoticias();

  const params = useParams();
  useEffect( () => {
    obtenerNewSource(params.id)
  }, [])
  return (
    <div className="card-3d-wrap mx-auto">
        <FormularioNewSource />
    </div>
  );
};

export default EditarNewSourse;
