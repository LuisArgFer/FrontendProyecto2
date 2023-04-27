import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const CategoryContext = createContext();

const CategoriesProvider = ({ children }) => {
  const [categorias, setCategorias] = useState({});
  const [alerta, setAlerta] = useState({});
  useEffect(() => {
    ObtenerCategorias();
  }, []);
  const ObtenerCategorias = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios("/categories", config);
      setCategorias(data);
      // navigate('/proyectos')
    } catch (error) {
      setCategorias({});
    }
  };
  const NuevaCategoria = async (categoria) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/categories`,
        categoria,
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
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const editarCategoria = async (categoria) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (categoria.id == undefined) {
        const { data } = await clienteAxios.post(
          `/categories`,
          { name: categoria.name },
          config
        );

        const categoriesActualizados = categorias.map((categorieState) =>
          categorieState._id === data._id ? data : categorieState
        );
        setCategorias(categoriesActualizados);
        return;
      }
      const { data } = await clienteAxios.put(
        `/categories/${categoria.id}`,
        categoria,
        config
      );

      // Sincronizar el state
      const categoriesActualizados = categorias.map((categorieState) =>
        categorieState._id === data._id ? data : categorieState
      );
      setCategorias(categoriesActualizados);

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

  const eliminarCategoria = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/categories/${id}`, config);

      // Sincronizar el state
      const categoriesActualizados = categorias.filter(
        (categoria) => categoria._id !== id
      );
      setCategorias(categoriesActualizados);

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

  const ObtenerCategoria = async (id) => {
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
      const { data } = await clienteAxios(`/categories/${id}`, config);
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
    <CategoryContext.Provider
      value={{
        categorias,
        NuevaCategoria,
        ObtenerCategoria,
        editarCategoria,
        eliminarCategoria,
        alerta,

      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoriesProvider };

export default CategoryContext;
