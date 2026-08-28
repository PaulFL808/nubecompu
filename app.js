import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Configuración de Firebase obtenida de la imagen
const firebaseConfig = {
  apiKey: "AIzaSyCH1862Ub5scywt6sI7jfe2mm6VDSc_Cno",
  authDomain: "stnube-6fcd1.firebaseapp.com",
  projectId: "stnube-6fcd1",
  storageBucket: "stnube-6fcd1.firebasestorage.app",
  messagingSenderId: "801941221369",
  appId: "1:801941221369:web:a79474094868c6bc0d1728"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencias a los elementos del DOM
const btnIngresar = document.getElementById("btn-ingresar");
const modalProducto = document.getElementById("modal-producto");
const btnCerrar = document.getElementById("btn-cerrar");
const formProducto = document.getElementById("form-producto");
const mensajeExito = document.getElementById("mensaje-exito");

// Abrir el modal
btnIngresar.addEventListener("click", () => {
    modalProducto.style.display = "flex";
    mensajeExito.style.display = "none";
});

// Cerrar el modal
btnCerrar.addEventListener("click", () => {
    modalProducto.style.display = "none";
});

// Cerrar al hacer click fuera del contenido
window.addEventListener("click", (e) => {
    if (e.target === modalProducto) {
        modalProducto.style.display = "none";
    }
});

// Enviar el formulario y guardar en Firestore
formProducto.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evitar que recargue la página

    const nombre = document.getElementById("nombre").value;
    const stock = document.getElementById("stock").value;
    const descripcion = document.getElementById("descripcion").value;

    try {
        // addDoc genera un ID automático
        const docRef = await addDoc(collection(db, "productos"), {
            nombre: nombre,
            stock: Number(stock),
            descripcion: descripcion,
            fechaRegistro: new Date()
        });

        // Mostrar éxito y limpiar formulario
        mensajeExito.style.display = "block";
        formProducto.reset();

        // Cerrar modal automáticamente después de 2 segundos
        setTimeout(() => {
            modalProducto.style.display = "none";
        }, 2000);

    } catch (error) {
        console.error("Error al guardar el documento: ", error);
        alert("Hubo un error al guardar el producto. Asegúrate de habilitar Firestore Database en Modo Prueba.");
    }
});
