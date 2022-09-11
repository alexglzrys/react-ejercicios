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
  const createData = (data) => {
    // Generar un timestamp como id del nuevo registro
    data.id = Date.now();
    // Actualizar el estado con la nueva data
    setDb([...db, data]);
  };
  const updateData = (data) => {
    // Conservar todos los registros a excepción del que se ha editado, mismo que debe ser reemplazado con el objeto que contiene la nueva data
    const newData = db.map((element) =>
      element.id === data.id ? data : element
    );
    setDb([...newData]);
  };
  const deleteData = (id) => {
    // Por buenas prácticas es importante especificar si las funciones nativas son del objeto wondow | document.
    const response = window.confirm(
      `¿Estas seguro de querer eliminar el registro ${id}`
    );
    if (response) {
      const newData = db.filter((element) => element.id !== id);
      setDb([...newData]);
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

        {/* Renderizar indicadores con base al estado actual del componente */}
        {loading && <Loader />}
        {error && <Message message={error} color="#f8d7da" />}

        {/* Mostrar la tabla solo cuando se tengan datos desde la API */}
        {db && (
          <CrudTable
            data={db}
            deleteData={deleteData}
            setDataToEdit={setDataToEdit}
          />
        )}
      </section>
    </>
  );
};
