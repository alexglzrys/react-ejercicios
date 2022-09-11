import React, { useEffect, useState } from "react";
import { helperHttp } from "../helpers/helperHttp";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import { Loader } from "./Loader";
import { Message } from "./Message";

export const CrudJSONServer = () => {
  const [db, setDb] = useState(null);
  // Variable de estado para saber si se trata de un registro o una actualización
  const [dataToEdit, setDataToEdit] = useState(null);
  // Variables de estado para controlar el loader y mensaje de error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API = helperHttp();
  const URL = "http://localhost:5000/data";

  useEffect(() => {
    // Realizar petición Fetch para solicitud de datos
    const getFetch = async () => {
      setLoading(true);
      try {
        const response = await API.get(URL);
        if (response.err) {
          setDb(null);
          setError(`Error: ${response.status} - ${response.statusText}`);
        } else {
          // Actualizar estado
          setDb(response);
        }
      } catch (err) {
        if (err.err.message) setError(`Error: ${err.err.message}`);
        else setError(`Error: ${err.err.status} - ${err.err.statusText}`);
        console.log("error en la petición:", err);
        setDb(null);
      }
      setLoading(false);
    };

    getFetch();
  }, []);

  // Funciones para gestionar la data
  const createData = async (data) => {
    // Generar un timestamp como id del nuevo registro [json-server tambien tiene la capacidad de generar un id autoincrementable]
    data.id = Date.now();
    // Llamada a la API
    try {
      const options = {
        body: data,
        headers: { "content-type": "application/json" },
      };
      const response = await API.post(URL, options);
      if (response.err) {
        setError(`Error: ${response.status} - ${response.statusText}`);
      } else {
        // Actualizar el estado con la nueva data
        setDb([...db, response]);
      }
    } catch (e) {
      setError(
        `Error: ${e.err.status || 500} - ${e.err.statusText || e.message}`
      );
    }
  };

  const updateData = async (data) => {
    const newURL = `${URL}/${data.id}`;
    const options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    try {
      const response = await API.put(newURL, options);
      if (response.err) {
        setError(`Error: ${response.status} - ${response.statusText}`);
      } else {
        // Es valido hacer una nueva petición Ajax al server para consultar la data. Pero para ahorrarnos esa petición, solo podemos actualizar la UI con la data basandonos en el nuevo estado

        // Conservar todos los registros a excepción del que se ha editado, mismo que debe ser reemplazado con el objeto que contiene la nueva data
        const newData = db.map((element) =>
          element.id === data.id ? data : element
        );
        setDb([...newData]);
      }
    } catch (e) {
      setError(
        `Error: ${e.err.status || 500} - ${e.err.statusText || e.message}`
      );
    }
  };

  const deleteData = async (id) => {
    // Por buenas prácticas es importante especificar si las funciones nativas son del objeto wondow | document.
    const response = window.confirm(
      `¿Estas seguro de querer eliminar el registro ${id}`
    );
    if (response) {
      try {
        const newURL = `${URL}/${id}`;
        const response = await API.destroy(newURL);
        if (response.err) {
          setError(`Error: ${response.status} - ${response.statusText}`);
        } else {
          // Se pudo haber hecho una nueva petición para pintar la nueva data en la UI.
          const newData = db.filter((element) => element.id !== id);
          setDb([...newData]);
        }
      } catch (e) {
        setError(
          `Error: ${e.err.status || 500} - ${e.err.statusText || e.message}`
        );
      }
    }
  };

  return (
    <>
      <h3>CRUD JSON Server con React</h3>
      {/* Pasar las funciones al componente hijo, mismas que se encargan de gestionar el estado global de la aplicación */}
      <section>
        {/* El formulario registra y actualiza */}
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
        />

        <div>
          {/* Renderizar indicadores con base al estado actual del componente */}
          {loading && <Loader />}
          {error && <Message message={error} color="#f8d7da" />}

          {/* Se debería mostrar la tabla solo cuando se tengan datos desde la API, pero todo depende de como queremos proyectar la info en la UI */}
          <CrudTable
            data={db}
            deleteData={deleteData}
            setDataToEdit={setDataToEdit}
          />
        </div>
      </section>
    </>
  );
};
