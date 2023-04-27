import React from "react";
import { useState, useEffect, createContext } from "react";
import useNoticias from "../hooks/useNoticias";
import Noticia from "../components/Noticia";
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useCategory from "../hooks/useCategory";
import "./CSS/Noticias.css"

const Noticias = () => {
  const { noticias, obtenerNews, setNoticias} = useNoticias();
  const [filterWord, setfilterWord] = useState("");
  const { categorias } = useCategory();
  const location = useLocation();
  const { auth } = useAuth();
  const params = useParams();
  
  useEffect( () => {
    obtenerNews();
    categorias.map((categoria)=>ObtenerCategoria(categoria));
    
  }, [location])

  function ObtenerCategoria(categoria){
    if(categoria.name == params.id){
      obtenerNews(categoria._id);
    }
  }

  const filtrarnews = async () => {
    console.log("si entra");
    const query = `
    query NewsByWord($word: String, $userId: String) {
      newsByWord(word: $word, user_id: $userId) {
        title
        short_description
        date
        permantlink
      }
    }
    `;
    const variables = { word: filterWord, userId: auth._id };
    axios.post('http://localhost:3500/', { query, variables }).then(function (response) {
      console.log(response.data.data);
      setNoticias(response.data.data.newsByWord);
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <>
      
      <section className="page-content">
        <section>
          <label> Search News: <input name="myInput" onChange={(e) => setfilterWord(e.target.value)} /></label>
          <button onClick={() => filtrarnews()} value="buscar">Buscar</button>
        </section>
        <section className="grid">
          {noticias ? noticias.map((noticias) => <Noticia key={noticias._id} Noticia= {noticias} />) : null}
        </section>
        <footer className="page-footer"></footer>
      </section>
    </>
  );
};

export default Noticias;
