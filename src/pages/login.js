import { google, logo } from "../images/img";
import { loginLogic } from "../lib/loginLogic";

// Declara una constante llamada "login" que es igual a una función flecha con un parámetro llamado "findRouteAndNavigate"
const login = (findRouteAndNavigate) => {
    // Crea un elemento HTML <section> y lo guarda en una constante llamada "container"
    const container = document.createElement("section");
    // Añade la clase al elemento
    container.classList.add("contentLR");
    // Declara una constante llamada "viewLogin" que es igual a una cadena de texto con el contenido HTML del formulario de inicio de sesión
    const viewLogin = `
    <div class="two">
        <figure class="logoLR">
            <img src='${logo}' alt="logo SportX" class="logoL"/>
        </figure>
        <article>
            <div class="fields">
                <label class="labelLR"> Correo Electrónico </label>
                <input id="mailUserLogin" class="inputLR" type="text" placeholder="ejemplo@gmail.com" />
                <p id="messageErrorMailLogin" class="messageErrorMailLogin"></p>
            </div>
            <div class="fields">
                <label class="labelLR">Contraseña </label>
                <input id="passwordUserLogin" class="inputLR" type="password" placeholder="xxxxxx" />
                <p id="messageErrorPasswordLogin" class="messageErrorPasswordLogin"></p>
            </div>
        </article>
        <div class="buttonsStartSession">
            <div class="loginBtn">
            <button  id="loginBtn" class="lBtn" type="submit">Iniciar Sesión</button>
            </div>
            <div class="loginGmailBtn">
                <button id="loginGmailBtn" class="lGmailBtn">
                    <img src='${google}' value="iniciarGoogle" alt="google" class="imgGoogle" />
                    Acceder con Google
                </button>
            </div>
            <div class="returnRegistration">
                <span class="spanText">¿No tienes cuenta?</span>
                <a id="registerBtn" class="aText">Regístrate</a>
            </div>
        </div>
    </div>
`;
    // Inserta el contenido HTML de "viewLogin" dentro del elemento <section> creado antes
    container.innerHTML = viewLogin;
    // "loginLogic" se define en otro módulo y se encarga de manejar la lógica del formulario de inicio de sesión.
    loginLogic(container);
    // Busca el elemento con el ID "registerBtn" dentro del elemento <section> creado antes y lo guarda en una constante llamada "registerBtn"
    const registerBtn = container.querySelector("#registerBtn");
    // // Añade un evento de click al botón de registro para redirigir al usuario a la página de registro
    registerBtn.addEventListener("click", () => {
        // Ejecuta la función "findRouteAndNavigate" con el parámetro "/register" para redirigir al usuario a la página de registro
        findRouteAndNavigate("/register");
    });
    // Retorna el elemento <section> con el formulario de inicio de sesión y el botón de registro
    return container;
};

// Exporta la función "login" para que pueda ser utilizada en otros módulos
export { login };
