// Se importan las siguientes funciones y objetos de Firebase.
import { signOut } from "firebase/auth";
import {
    addPost, auth, deletePost, editPost, paintPostsRealTime, aboutLikes, aboutDislikes,
} from "../firebase/configuration.js";
import {
    checkEdit, grayLike, iconDelete, iconEdit, redLike,
} from "../images/img.js";

// Se define una función llamada loginLogic que toma un elemento container como argumento.
const homeLogic = (container) => {
    // Se obtienen los elementos HTML necesarios:
    const commentField = container.querySelector("#commentField");
    const publishBtn = container.querySelector("#publishBtn");
    const publications = container.querySelector("#publications");
    const signOffBtn = container.querySelector("#signOffBtn");
    const userName = container.querySelector("#userName");

    // Usamos la información del localStorage
    const user = JSON.parse(window.localStorage.getItem("user"));
    userName.textContent = user.displayName;

    // Boton de salida
    signOffBtn.addEventListener("click", () => {
        signOut(auth);
        window.localStorage.removeItem("auth");
        window.localStorage.removeItem("user");
        window.location.href = "welcome";
    });

    // Boton de publicar
    publishBtn.addEventListener("click", () => {
        const comment = commentField.value;
        commentField.value = "";
        addPost(comment, auth.currentUser.displayName);
    });

    // Mostrar publiciones
    paintPostsRealTime(async (querySnapshot) => {
        publications.innerHTML = "";
        querySnapshot.forEach((doc) => {
            // Contenedor para cada publicación
            const postElement = document.createElement("ARTICLE");
            // Contenedor del nombre y botones de editar y eliminar
            const divContentFirst = document.createElement("DIV");
            divContentFirst.classList.add("divContentFirst");
            // Contenedor de like y contador de likes
            const divContentLast = document.createElement("DIV");
            divContentLast.classList.add("divContentLast");
            // Contenedor de botones de editar y eliminar
            const iconActions = document.createElement("DIV");
            iconActions.classList.add("iconActions");

            postElement.appendChild(divContentFirst);

            postElement.classList.add("publicationContainer");
            // Boton de like
            const likesBtn = document.createElement("IMG");
            const isLike = doc.data().likes.some((item) => item === auth.currentUser.uid);
            likesBtn.classList.add("likeBtn");
            likesBtn.src = isLike ? redLike : grayLike;
            likesBtn.addEventListener("click", async () => {
                if (isLike) {
                    await aboutDislikes(doc.id, auth.currentUser.uid);
                } else {
                    await aboutLikes(doc.id, auth.currentUser.uid);
                }
            });
            divContentLast.appendChild(likesBtn);
            // Contador de likes
            const likesParagraph = document.createElement("SPAN");
            likesParagraph.classList.add("likesParagraph");
            const countLikes = doc.data().likes.length;
            likesParagraph.textContent = countLikes;
            divContentLast.appendChild(likesParagraph);
            // Boton eliminar
            const deleteBtn = document.createElement("IMG");
            deleteBtn.classList.add("deleteBtn");
            deleteBtn.src = iconDelete;
            deleteBtn.addEventListener("click", () => {
                deletePost(doc.id);
            });
            // Boton editar
            const editBtn = document.createElement("IMG");
            let IsActualizar = false;
            editBtn.classList.add("editBtn");
            editBtn.src = iconEdit;
            // Nombre de usuario en las publicaciones realizadas
            const nameUserPublication = document.createElement("P");
            nameUserPublication.classList.add("nameUserPublication");
            nameUserPublication.textContent = doc.data().user;

            divContentFirst.appendChild(nameUserPublication);

            iconActions.appendChild(editBtn);
            iconActions.appendChild(deleteBtn);
            // Validacion para que solo el usuario que hizo la publicación pueda editar y eliminar
            if (auth.currentUser.displayName === doc.data().user) {
                divContentFirst.appendChild(iconActions);
            }
            // Contenedor editField y postText
            const divContentComment = document.createElement("DIV");
            divContentComment.classList.add("divContentComment");
            postElement.appendChild(divContentComment);
            // Campo de texto para actualizar comentario
            const editField = document.createElement("INPUT");
            editField.classList.add("editField");
            editField.setAttribute("type", "text");
            editField.value = doc.data().comment;
            // Comentario
            const postText = document.createElement("P");
            postText.classList.add("postText");
            postText.textContent = doc.data().comment;
            divContentComment.appendChild(postText);
            editBtn.addEventListener("click", async () => {
                if (IsActualizar) {
                    const newComment = editField.value;
                    await editPost(doc.id, { comment: newComment });
                    IsActualizar = false;
                    editBtn.src = iconEdit;
                    divContentComment.innerHTML = "";
                    divContentComment.appendChild(postText);
                } else {
                    IsActualizar = true;
                    editBtn.src = checkEdit;
                    divContentComment.innerHTML = "";
                    divContentComment.appendChild(editField);
                }
            });
            postElement.appendChild(divContentLast);
            publications.appendChild(postElement);
        });
    });
};
export { homeLogic };
