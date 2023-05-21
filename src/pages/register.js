import { logo } from "../images/img";
import { registerLogic } from "../lib/registerLogic";

// Define una función "register" que toma un argumento "findRouteAndNavigate"
const register = (findRouteAndNavigate) => {
    // Crea un nuevo elemento <section> y guárdalo en la variable "container"
    const container = document.createElement("section");
    // Agrega la clase al elemento
    container.classList.add("contentLR");
    // Define una cadena de código HTML con marcadores de posición para datos dinámicos y guárdalo en la variable "viewRegister"
    const viewRegister = ` 
    <article class="three">
    <figure class="logoLR">
        <img src='${logo}' alt="logo SportX" class="logoR"/>
    </figure>
    <div>
        <div class="fields">
            <label class="labelLR">Nombre:</label>
            <input id="userNameRegister" class="inputLR" type="text" placeholder="Nombre" />
            <p id="messageErrorUserRegister" class="messageErrorUserRegister"></p>
        </div>
        <div class="fields">
            <label class="labelLR">Correo electrónico:</label>
            <input id="userMailRegister" class="inputLR" type="text" placeholder="ejemplo@gmail.com" />
            <p id="messageErrorMailRegister" class="messageErrorMailRegister"></p>
        </div>
        <div class="fields">
            <label class="labelLR">Contraseña:</label>
            <input id="userPasswordRegister" class="inputLR" type="password" placeholder="xxxxxx" />
            <p id="messageErrorPasswordRegister" class="messageErrorPasswordRegister"></p>
        </div>

        <div class="buttonsRegistration">
            <div class="registerBtn">
            <button  id="registerBtn" class="rBtn" type="submit">Registrarse</button>
            </div>
            <div class="returnHomeSession">
                <span class="spanText">¿Ya tienes cuenta?</span>
                <a id="loginBtn" class="aText">Iniciar Sesión</a>
            </div>
        </div>
    </div>
</article>
      `;
    // Rellena el elemento "container" con el código HTML almacenado en "viewRegister"
    container.innerHTML = viewRegister;
    // "registerLogic" se define en otro módulo y se encarga de manejar la lógica del formulario de registrarse.
    registerLogic(container);
    // Encuentra el elemento con el ID "loginBtn" dentro del elemento "container" y guárdalo en la variable "loginBtn"
    const loginBtn = container.querySelector("#loginBtn");
    // Agrega un event listener de clic al elemento "loginBtn", que ejecuta una función cuando se hace clic
    loginBtn.addEventListener("click", () => {
        // La función llama a la función "findRouteAndNavigate" con el argumento "/login"
        findRouteAndNavigate("/login");
    });
    // Devuelve el elemento "container"
    return container;
};

// Exporta la función "register" para que se pueda importar y utilizar en otros archivos
export { register };
