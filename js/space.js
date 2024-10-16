// Espera a que la página cargue completita
document.addEventListener("DOMContentLoaded", () => {
    // Agarra el botón con el id "btnBuscar" y lo guarda en una variable
    var botonBuscar = document.getElementById("btnBuscar");

    // Cuando se le haga clic al botón, ejecuta esta función
    botonBuscar.addEventListener("click", () => {
        // Toma el valor que el usuario escribió en el input con id "inputBuscar"
        var busquedaUsuario = document.getElementById("inputBuscar").value;
        // Guarda esa búsqueda en el almacenamiento local del navegador con la clave "id"
        localStorage.setItem("id", busquedaUsuario);
        // Recupera la búsqueda guardada y la pasa a minúsculas
        var obtenerBusqueda = localStorage.getItem("id").toLowerCase();

        // Hace una solicitud a la API de la NASA, buscando lo que el usuario pidió
        fetch(`https://images-api.nasa.gov/search?q=${obtenerBusqueda}`)
            .then(response => {
                // Si algo sale mal con la respuesta, muestra un error
                if (!response.ok) {
                    throw new Error("Problema con respuesta del fetch");
                }
                // Convierte la respuesta a JSON para que se pueda leer como objeto
                return response.json();
            })
            .then(datos => {
                // Recorre cada elemento que llegó en la respuesta (las imágenes de la NASA)
                datos.collection.items.forEach((elemento) => {
                    // Saca la imagen, el título, la descripción y la fecha de cada resultado
                    let [imagen, titulo, descripcion, fecha] = [
                        elemento.links[0].href, 
                        elemento.data[0].title, 
                        elemento.data[0].description, 
                        elemento.data[0].date_created 
                    ];

                    // Agarra el contenedor donde vamos a meter las tarjetas con los resultados
                    let contenedor = document.getElementById("contenedor");

                    // Añade al contenedor una tarjeta nueva con la info de cada imagen
                    contenedor.innerHTML += `
                        <div class="card">
                            <img src="${imagen}" class="card-img-top" alt="imagen">
                            <div class="card-body">
                                <h5 class="card-title">${titulo}</h5>
                                <div class="conenedor-descripcion">
                                    <p class="card-text">${descripcion}</p>
                                </div>
                                <p><small>${fecha}</small></p>
                            </div>
                        </div>`;
                });
            })
            .catch(error => {
                // Si algo falla en todo el proceso, sale el error en la consola
                console.error("Error:", error);
            });
    });
});
