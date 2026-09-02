// No necesitamos importar Firebase aquí. Todo es local.

// Referencias del DOM
const btnIngresar = document.getElementById("btn-ingresar");
const modalProducto = document.getElementById("modal-producto");
const btnCerrar = document.getElementById("btn-cerrar");
const formProducto = document.getElementById("form-producto");
const mensajeExito = document.getElementById("mensaje-exito");
const listaProductos = document.getElementById("lista-productos");
const modalTitulo = document.getElementById("modal-titulo");

// Abrir el modal para CREAR
btnIngresar.addEventListener("click", () => {
    formProducto.reset();
    document.getElementById("producto-id").value = "";
    modalTitulo.innerText = "Ingresar Nuevo Producto";
    modalProducto.style.display = "flex";
    mensajeExito.style.display = "none";
});

// Cerrar el modal (con la X o click fuera)
btnCerrar.addEventListener("click", () => modalProducto.style.display = "none");
window.addEventListener("click", (e) => {
    if (e.target === modalProducto) modalProducto.style.display = "none";
});

// FUNCIÓN PARA LEER DATOS (Read)
function cargarProductos() {
    listaProductos.innerHTML = "";
    // Obtener los datos desde LocalStorage (se guardan como string JSON)
    const productosJSON = localStorage.getItem("productosDB");
    
    // Convertir el JSON a un arreglo de objetos (o arreglo vacío si no hay nada)
    const productos = productosJSON ? JSON.parse(productosJSON) : [];

    if (productos.length === 0) {
        listaProductos.innerHTML = '<tr><td colspan="4" class="text-center">No hay productos en LocalStorage.</td></tr>';
        return;
    }

    productos.forEach((producto) => {
        listaProductos.innerHTML += `
            <tr>
                <td><strong>${producto.nombre}</strong></td>
                <td>${producto.descripcion}</td>
                <td>${producto.stock}</td>
                <td>
                    <button class="btn-edit" onclick="editarProducto('${producto.id}', '${producto.nombre}', '${producto.stock}', '${producto.descripcion}')"><i class="fas fa-edit"></i></button>
                    <button class="btn-danger" onclick="eliminarProducto('${producto.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// CREAR o ACTUALIZAR (Create / Update)
formProducto.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("producto-id").value;
    const nombre = document.getElementById("nombre").value;
    const stock = document.getElementById("stock").value;
    const descripcion = document.getElementById("descripcion").value;

    const btnGuardar = document.getElementById("btn-guardar");
    btnGuardar.disabled = true;
    btnGuardar.innerText = "Guardando...";

    // Obtener array actual
    let productos = JSON.parse(localStorage.getItem("productosDB") || "[]");

    if (id === "") {
        // Crear nuevo con ID único (usando timestamp)
        const nuevoProducto = {
            id: Date.now().toString(),
            nombre: nombre,
            stock: Number(stock),
            descripcion: descripcion,
            fechaRegistro: new Date().toISOString()
        };
        productos.push(nuevoProducto);
    } else {
        // Actualizar existente
        const index = productos.findIndex(p => p.id === id);
        if (index !== -1) {
            productos[index].nombre = nombre;
            productos[index].stock = Number(stock);
            productos[index].descripcion = descripcion;
        }
    }

    // Guardar array modificado como JSON en LocalStorage
    localStorage.setItem("productosDB", JSON.stringify(productos));

    cargarProductos(); // Refrescar la tabla

    mensajeExito.style.display = "block";
    formProducto.reset();
    
    setTimeout(() => {
        modalProducto.style.display = "none";
        mensajeExito.style.display = "none";
        btnGuardar.disabled = false;
        btnGuardar.innerHTML = '<i class="fas fa-save"></i> Guardar Producto';
    }, 1000);
});

// FUNCIONES GLOBALES (Delete y Edit)
window.eliminarProducto = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto localmente?")) {
        let productos = JSON.parse(localStorage.getItem("productosDB") || "[]");
        // Filtrar todos los que no tengan esta ID
        productos = productos.filter(p => p.id !== id);
        
        // Guardar de nuevo
        localStorage.setItem("productosDB", JSON.stringify(productos));
        cargarProductos();
    }
};

window.editarProducto = (id, nombre, stock, descripcion) => {
    document.getElementById("producto-id").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("stock").value = stock;
    document.getElementById("descripcion").value = descripcion;
    
    modalTitulo.innerText = "Editar Producto Local";
    modalProducto.style.display = "flex";
    mensajeExito.style.display = "none";
};

// Carga inicial al cargar la página (por si acaso entra directo)
cargarProductos();
