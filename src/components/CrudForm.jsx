import React, { useState } from "react";

// Estado inicial del formulario
const initialForm = {
  id: null,
  name: "",
  constellation: "",
};

export const CrudForm = ({createData, updateData}) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    // El ingresar datos en los campos, automáticamente deben cambiar el estado del formulario sin mutarlo
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Si alguno de los campos está vacío, no podemos continuar
    if (!form.name || !form.constellation) {
        alert('Campos vacios');
        return true;
    }

    // Verificar si se trata de un registro o una actualización
    // La tarea de este componente es emitir información a través de las funciones pasadas como props, 
    // La lógica de registro o actualización le corresponde al componente padre
    if (form.id === null) {
        createData(form);
    } else {
        updateData(form);
    }

    // Resetear formulario
    handleReset();
  };

  const handleReset = () => {
    // Establecer el formulario a su estado inicial
    setForm(initialForm);
  };

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
