import React from "react";
import "../paginas/CSS/Noticia.css"
const Noticia = (props) => {
  const { title, short_description, date, permantlink } = props.Noticia;
  return (
    <article>
      <div className="div-noticia">
        <h2 className="h2">{title}</h2>
        <p className="p">{short_description}</p>
        <p>{date}</p>
        <a className="a" href={permantlink}>Leer mas...</a>
      </div>
    </article>
  );
};

export default Noticia;
