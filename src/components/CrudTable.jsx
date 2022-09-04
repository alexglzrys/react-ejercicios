import React from "react";
import { CrudTableRow } from "./CrudTableRow";

export const CrudTable = ({ data }) => {
  return (
    <div>
      <h3>Tabla de datos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Constelación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostrar mensaje de retroalimentación al usuario si no hay datos */}
          {data.length === 0 ? (
            <tr>
              <td colSpan="3">No hay datos</td>
            </tr>
          ) : (
            data.map((item) => <CrudTableRow key={item.id} element={item} />)
          )}
        </tbody>
      </table>
    </div>
  );
};
