import { errorOutline } from "../images/img";

// Declara una constante llamada "error" que es igual a una función flecha sin parámetros
const error = () => {
    // Crea un elemento HTML <section> y lo guarda en una constante llamada "container"
    const container = document.createElement("section");
    // Añade la clase al elemento
    container.classList.add("contentLR");
    // Declara una constante llamada "viewError" que es igual a una cadena de texto con el contenido HTML de un encabezado <h4>
    const viewError = `
    <article class="five">
    <div class="contentError">
        <h4 class="errorText">Lo sentimos, existe un error. Vuelva a intentarlo.</h4>
        <figure class="figError">
        <img src= '${errorOutline}' alt="error" class="imgError" />
        </figure> 
    </div>
    </article>
    `;
    // Inserta el contenido HTML de "viewError" dentro del elemento <section> creado antes
    container.innerHTML = viewError;

    // Retorna el elemento <section> con el contenido HTML y la clase "error"
    return container;
};

// Exporta la función "error" para que pueda ser utilizada en otros módulos
export { error };
