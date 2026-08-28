import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Configuración de Firebase
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

// Referencias del DOM
const btnIrDashboard = document.getElementById("btn-ir-dashboard");
const btnVolver = document.getElementById("btn-volver");
const landingView = document.getElementById("landing-view");
const dashboardView = document.getElementById("dashboard-view");

const btnIngresar = document.getElementById("btn-ingresar");
const modalProducto = document.getElementById("modal-producto");
const btnCerrar = document.getElementById("btn-cerrar");
const formProducto = document.getElementById("form-producto");
const mensajeExito = document.getElementById("mensaje-exito");
const listaProductos = document.getElementById("lista-productos");
const modalTitulo = document.getElementById("modal-titulo");

// Navegación entre vistas
btnIrDashboard.addEventListener("click", () => {
    landingView.style.display = "none";
    dashboardView.style.display = "block";
});

btnVolver.addEventListener("click", () => {
    dashboardView.style.display = "none";
    landingView.style.display = "block";
});

// Abrir el modal para CREAR
btnIngresar.addEventListener("click", () => {
    formProducto.reset();
    document.getElementById("producto-id").value = "";
    modalTitulo.innerText = "Ingresar Nuevo Producto";
    modalProducto.style.display = "flex";
    mensajeExito.style.display = "none";
});

// Cerrar el modal (con la X)
btnCerrar.addEventListener("click", () => {
    modalProducto.style.display = "none";
});

// Cerrar al hacer click fuera del modal
window.addEventListener("click", (e) => {
    if (e.target === modalProducto) {
        modalProducto.style.display = "none";
    }
});

// LEER productos en tiempo real (Read)
onSnapshot(collection(db, "productos"), (snapshot) => {
    listaProductos.innerHTML = "";
    
    if (snapshot.empty) {
        listaProductos.innerHTML = '<tr><td colspan="4" class="text-center">No hay productos registrados.</td></tr>';
        return;
    }

    snapshot.forEach((docSnap) => {
        const producto = docSnap.data();
        const id = docSnap.id;
        
        listaProductos.innerHTML += `
            <tr>
                <td><strong>${producto.nombre}</strong></td>
                <td>${producto.descripcion}</td>
                <td>${producto.stock}</td>
                <td>
                    <button class="btn-edit" onclick="editarProducto('${id}', '${producto.nombre}', '${producto.stock}', '${producto.descripcion}')"><i class="fas fa-edit"></i></button>
                    <button class="btn-danger" onclick="eliminarProducto('${id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}, (error) => {
    console.error("Error obteniendo datos: ", error);
    listaProductos.innerHTML = `<tr><td colspan="4" class="text-center" style="color:red;">Error de conexión: Verifica que Firestore esté en "Modo de Prueba".</td></tr>`;
});

// CREAR o ACTUALIZAR (Create / Update)
formProducto.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("producto-id").value;
    const nombre = document.getElementById("nombre").value;
    const stock = document.getElementById("stock").value;
    const descripcion = document.getElementById("descripcion").value;

    const btnGuardar = document.getElementById("btn-guardar");
    btnGuardar.disabled = true;
    btnGuardar.innerText = "Guardando...";

    try {
        if (id === "") {
            // Crear nuevo
            await addDoc(collection(db, "productos"), {
                nombre: nombre,
                stock: Number(stock),
                descripcion: descripcion,
                fechaRegistro: new Date()
            });
        } else {
            // Actualizar existente
            await updateDoc(doc(db, "productos", id), {
                nombre: nombre,
                stock: Number(stock),
                descripcion: descripcion
            });
        }

        mensajeExito.style.display = "block";
        formProducto.reset();
        
        setTimeout(() => {
            modalProducto.style.display = "none";
            mensajeExito.style.display = "none";
            btnGuardar.disabled = false;
            btnGuardar.innerHTML = '<i class="fas fa-save"></i> Guardar Producto';
        }, 1500);

    } catch (error) {
        console.error("Error al guardar: ", error);
        alert("Hubo un error al guardar.");
        btnGuardar.disabled = false;
        btnGuardar.innerHTML = '<i class="fas fa-save"></i> Guardar Producto';
    }
});

// Funciones globales para los botones de la tabla
window.eliminarProducto = async (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        try {
            await deleteDoc(doc(db, "productos", id));
        } catch (error) {
            console.error("Error al eliminar: ", error);
            alert("Error al eliminar el producto.");
        }
    }
};

window.editarProducto = (id, nombre, stock, descripcion) => {
    document.getElementById("producto-id").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("stock").value = stock;
    document.getElementById("descripcion").value = descripcion;
    
    modalTitulo.innerText = "Editar Producto";
    modalProducto.style.display = "flex";
    mensajeExito.style.display = "none";
};
