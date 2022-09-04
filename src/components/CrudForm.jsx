import React, { useState } from "react";

// Estado inicial del formulario
const initialForm = {
  id: null,
  name: "",
  constellation: "",
};

export const CrudForm = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {};
  const handleSubmit = (e) => {};
  const handleReset = (e) => {};

  return (
    <div>
      <h3>Agregar</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="constellation"
          placeholder="Constelación"
          value={form.constellation}
          onChange={handleChange}
        />
        <button type="submit">Registrar</button>
        <button type="reset" onClick={handleReset}>
          Limpiar
        </button>
      </form>
    </div>
  );
};
