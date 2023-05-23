// Se importan las siguientes funciones y objetos de Firebase.
import { GoogleAuthProvider, getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { auth, signIn } from "../firebase/configuration";

// Se define una función llamada loginLogic que toma un elemento container como argumento.
const loginLogic = (container) => {
    // Se obtienen los elementos HTML necesarios:
    const mailUserLogin = container.querySelector("#mailUserLogin");
    const passwordUserLogin = container.querySelector("#passwordUserLogin");
    const loginBtn = container.querySelector("#loginBtn");
    const loginGmailBtn = container.querySelector("#loginGmailBtn");

    // Se define una función llamada showError que toma un mensaje y un elemento como argumentos.
    const showError = (message, element) => {
        // Si hay un mensaje, se muestra en el elemento correspondiente.
        const errorElement = container.querySelector(`#${element}`);
        // Si no hay mensaje, se vacía el elemento.
        errorElement.innerHTML = message;
    };

    // Se define una función llamada validateFields que valida los campos del formulario de inicio de sesión.
    const validateFields = () => {
        // Se define una expresión regular para validar correos electrónicos.
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Si no se ingresó ningún correo electrónico, se muestra un mensaje de error y se devuelve un objeto con la propiedad errors establecida en true.
        if (!mailUserLogin.value) {
            showError("Ingresa un correo", "messageErrorMailLogin");
            return { errors: true };
        }
        showError("", "messageErrorMailLogin");

        // Si el correo electrónico no cumple con el formato de la expresión regular, se muestra un mensaje de error y se devuelve un objeto con la propiedad errors establecida en true.
        if (!emailRegex.test(mailUserLogin.value)) {
            showError("Ingresa un correo electrónico válido.", "messageErrorMailLogin");
            return { errors: true };
        }
        showError("", "messageErrorMailLogin");

        // Si no se ingresó ninguna contraseña, se muestra un mensaje de error y se devuelve un objeto con la propiedad errors establecida en true.
        if (!passwordUserLogin.value) {
            showError("Ingresa una contraseña", "messageErrorPasswordLogin");
            return { errors: true };
        }
        showError("", "messageErrorPasswordLogin");

        // Si no hay errores en los campos, se eliminan los mensajes de error y se devuelve un objeto con la propiedad errors establecida en false.
        return { errors: false };
    };

    // Se agrega un listener al botón de inicio de sesión que llama a validateFields y, si no hay errores, inicia sesión con los datos ingresados.
    loginBtn.addEventListener("click", async () => {
        try {
            const { errors } = validateFields();
            // eslint-disable-next-line no-console
            console.log({ errors });
            if (errors) return;

            const user = await signIn(mailUserLogin.value, passwordUserLogin.value);
            // eslint-disable-next-line no-console
            console.log({ user });

            if (user.email) {
                const { displayName, email, uid } = user;
                window.localStorage.setItem("auth", true);
                window.localStorage.setItem("user", JSON.stringify({ displayName, email, uid }));
                window.location.href = "/";
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            showError("El correo o la contraseña es incorrecta", "messageErrorPasswordLogin");
        }
    });

    // Se agrega un listener al botón de iniciar con google que llama a GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo, luego verifica si es nuevo usuario depende de eso dirige a registro y sino a la página principal.
    loginGmailBtn.addEventListener("click", async () => {
        const provider = new GoogleAuthProvider();
        const resolve = await signInWithPopup(auth, provider);
        const { displayName, email, uid } = resolve.user;
        const credentials = getAdditionalUserInfo(resolve);
        if (credentials.isNewUser) {
            window.location.href = "/register";
        } else {
            window.localStorage.setItem("auth", true);
            window.localStorage.setItem("user", JSON.stringify({ displayName, email, uid }));
            window.location.href = "/";
        }
    });
};

export { loginLogic };
