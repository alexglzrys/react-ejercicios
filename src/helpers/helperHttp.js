/**
 * Helper para realizar peticiones HTTP
 *
 * Pudo haber sido un hook personalizado, pero estos deben tener por lo menos
 * un hook de React para considerarse personalizados.
 *
 * Como contiene puro código JS, entonces entra dentro de la categoría de Helpers
 *
 * Un helper es como una función que debe resolver una tarea en específico
 */

export const helperHttp = () => {
  // función privada que retorna una promesa acerca de una petición Fetch
  const customFetch = (endpoint, options) => {
    const defaultHeaders = {
      accept: "application/json",
    };
    // AbortController es bueno implementarlo en peticiones fetch, ya que si no hay conexión, la petición no queda colgada infinitamente. La aborta
    const controller = new AbortController();
    options.signal = controller.signal;

    // Si no se especifica el verbo HTTP, se usa Get por defecto
    options.method = options.method || "GET";

    // Preparar cabeceras
    options.headers = options.headers
      ? { ...defaultHeaders, ...options.headers }
      : defaultHeaders;

    // Preparar cuerpo de la petición solo para POST y PUT. Ya que GET Y DELETE no incorporan el body en la petición
    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;
    
    console.log(options)
    // Abortar la petición pasado cierto tiempo si no hay respuesta
    setTimeout(() => controller.abort(), 3000);

    // Realizar el fetch y retornar una Promesa como resultado de la invocación del método customFetch
    return fetch(endpoint, options)
      .then((res) => 
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              // No todas las API vienen bien diseñadas, es por ello que debemos enviar feedback por defecto.
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch(err => Promise.reject({err: err, status: 500, statusText: err.message}));
  };

  // las funciones públicas de este helper - verbos HTTP
  const get = (endpoint, options = {}) => customFetch(endpoint, options);
  const post = (endpoint, options = {}) => {
    options.method = 'POST';
    return customFetch(endpoint, options);
  };
  const put = (endpoint, options = {}) => {
    options.method = 'PUT';
    return customFetch(endpoint, options);
  };
  const destroy = (endpoint, options = {}) => {
    options.method = 'DELETE';
    return customFetch(endpoint, options);
  };

  // Exponer las funciones publicas de este helper
  return {
    get,
    post,
    put,
    destroy,
  };
};
