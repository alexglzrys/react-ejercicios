import React, { useEffect, useState } from "react";

// Estado inicial del formulario
const initialForm = {
  id: null,
  name: "",
  constellation: "",
};

export const CrudForm = ({createData, updateData, dataToEdit}) => {
  const [form, setForm] = useState(initialForm);

  // El componente se reutiliza tanto para registros como actualizaciones, el diferenciador es la presencia de valor en el id del estado de formulario

  // El estado inicial del formulario cambia si se trata de una actualización, por tanto el hook useEfect nos puede servir para disparar el cambio de estado si el valor de dataToEdit cambia
  useEffect(() => {
    // Es importante condicionar, ya que este hook siempre se dispara durante el montaje
    if (dataToEdit) {
      setForm({...dataToEdit});
    }
  }, [dataToEdit])

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
    <div className="form">
      <h3>{form.id ? 'Editar' : 'Agregar'}</h3>
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
        <button type="submit">{form.id ? 'Actualizar' : 'Registrar'}</button>
        <button type="reset" onClick={handleReset}>
          Limpiar
        </button>
      </form>
    </div>
  );
};
