import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import useCategory from "../hooks/useCategory";
import io from "socket.io-client";

const NoticiasContext = createContext();
const NoticiasProvider = ({ children }) => {
  const [noticias, setNoticias] = useState([]);
  const [newsSouce, setNewsSouce] = useState([]);
  const [newSouce, setNewSouce] = useState([]);
  const [filterWord, setfilterWord] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerNewsSource = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/newsource", config);
        setNewsSouce(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerNewsSource();
  }, [auth]);



  useEffect(() => {
    obtenerNews();
  }, [auth]);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const obtenerNews = async (id) => {
    const token = localStorage.getItem("token");
    if (!token || !auth?._id) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (id!=undefined) {
      try {
        //Get
        //declarar query graphql
        //declarar variable con el id de persona y id categoria
        //const { data } = await clienteAxios(`/news`{query,variable},);//get new by user id
        const query = `
          query Query($userId: String, $categoryId: String) {
            newsByCategory(user_id: $userId, category_id: $categoryId) {
              title
              short_description
              date
              permantlink
            }
          }
          `;
        const variables = { userId: auth._id, categoryId: id };
        axios.post('http://localhost:3500/', { query, variables }).then(function (response) {
          setNoticias(response.data.data.newsByCategory);
        });
      } catch (error) {
        console.log(error);
      }

      return;

    }

    if(id==undefined){
      try {
        const query = `
          query Query($userId: String) {
            newsByUser(user_id: $userId) {
              title
              short_description
              date
              permantlink
            }
          }
          `;
        const variables = { userId: auth._id };
        axios.post('http://localhost:3500/', { query, variables }).then(function (response) {
          setNoticias(response.data.data.newsByUser);
        });
  
      } catch (error) {
        console.log(error);
      }

    }

    
  };

  const filtrarnews = async () => {
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


  const submitNewSource = async (newSouce) => {
    if (newSouce.id) {
      await editarNewSource(newSouce);
    } else {
      await nuevoNewSource(newSouce);
    }
  };

  const nuevoNewSource = async (newSouce) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(`/newsource`, newSouce, config);
      console.log(data);
      // Sincronizar el state
      //const newSourcesActualizados = newSouce.map(newSourcesState => newSourcesState._id === data._id ? data : newSourcesState)
      //setProyectos(newSourcesActualizados)

      setAlerta({
        msg: "News Source creado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const subirNewSource = async (newSouce) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(config);
      const { data } = await clienteAxios.post(
        `/newsource/${newSouce._id}/process`,
        newSouce,
        config
      );
      console.log(data);
      // Sincronizar el state
      //const newSourcesActualizados = newSouce.map(newSourcesState => newSourcesState._id === data._id ? data : newSourcesState)
      //setProyectos(newSourcesActualizados)

      setAlerta({
        msg: "News Source creado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const editarNewSource = async (newSouces) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/newsource/${newSouces.id}`,
        newSouces,
        config
      );

      // Sincronizar el state
      const newSourcesActualizados = newsSouce.map((newSourcesState) =>
        newSourcesState._id === data._id ? data : newSourcesState
      );
      setNewsSouce(newSourcesActualizados);

      setAlerta({
        msg: "News Source Actualizado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarNewSorce = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/newsource/${id}`, config);

      // Sincronizar el state
      const newSourceActualizados = newsSouce.filter(
        (newSouce) => newSouce._id !== id
      );
      setNewSouce(newSourceActualizados);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const obtenerNewSource = async (id) => {
    //setCargando(true)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(`/newsource/${id}`, config);
      setNewSouce(data);
      setAlerta({});
    } catch (error) {
      navigate("/dashboard");
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } finally {
    }
  };
  return (
    <NoticiasContext.Provider
      value={{
        setNoticias,
        setfilterWord,
        filtrarnews,
        noticias,
        mostrarAlerta,
        alerta,
        submitNewSource,
        newsSouce,
        newSouce,
        obtenerNews,
        subirNewSource,
        obtenerNewSource,
        eliminarNewSorce,
      }}
    >
      {children}
    </NoticiasContext.Provider>
  );
};
export { NoticiasProvider };

export default NoticiasContext;
