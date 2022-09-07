import React, { useState } from 'react'
import { CrudForm } from './CrudForm'
import { CrudTable } from './CrudTable'

// Estado inicial de la aplicación global
const initialDB = [
  {
    id: 1,
    name: 'Seiya de Pegasus',
    constellation: 'Marte'
  },
  {
    id: 2,
    name: 'Shun de Andromeda',
    constellation: 'Andromeda'
  },
  {
    id: 3,
    name: 'Ikki de Phoenix',
    constellation: 'Tierra'
  },
  {
    id: 4,
    name: 'Shiryū de Dragon',
    constellation: 'Júpiter'
  },
  {
    id: 5,
    name: 'Hyōga de Cygnus',
    constellation: 'Luna'
  }
]

export const CrudApp = () => {
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
    const newData = db.map(element =>  element.id === data.id ? data : element);
    setDb([...newData]);
  };
  const deleteData = (id) => {};

  return (
    <>
        <h3>CRUD con React</h3>
        {/* Pasar las funciones al componente hijo, mismas que se encargan de gestionar el estado global de la aplicación */}
        
        {/* El formulario registra y actualiza */}
        <CrudForm createData={createData} updateData={updateData} dataToEdit={dataToEdit} />

        {/* La tabla elimina */}
        <CrudTable data={db} deleteData={deleteData} setDataToEdit={setDataToEdit} />
    </>
  )
}
