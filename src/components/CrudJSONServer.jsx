import React, { useState } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";

// Estado inicial de la aplicación global
const initialDB = [];

export const CrudJSONServer = () => {
  const [db, setDb] = useState(initialDB);
  // Variable de estado para saber si se trata de un registro o una actualización
  const [dataToEdit, setDataToEdit] = useState(null);

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

        {/* La tabla elimina */}
        <CrudTable
          data={db}
          deleteData={deleteData}
          setDataToEdit={setDataToEdit}
        />
      </section>
    </>
  );
};
