import React from "react";

export const CrudTableRow = ({element, deleteData, setDataToEdit}) => {
  const {name, constellation, id} = element;
  return (
    <tr>
      <td>{name}</td>
      <td>{constellation}</td>
      <td>
        {/* Burbujear información hacia el padre mediante el uso de props de tipo función */}
        <button className="btn-edit" onClick={() => setDataToEdit(element)}>Editar</button>
        <button className="btn-delete" onClick={() => deleteData(id)}>Eliminar</button>
      </td>
    </tr>
  );
};
