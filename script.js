// Arreglo para almacenar los productos del carrito
let carrito = [];

// Selección de elementos
const carritoIcono = document.getElementById('carrito-icono');
const modalCarrito = document.getElementById('modalCarrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('totalCarrito');
const contadorCarrito = document.getElementById('contador-carrito');

// Función para abrir la modal
function abrirCarrito() {
  modalCarrito.style.display = 'flex';
  mostrarCarrito();
}

// Función para cerrar la modal
function cerrarCarrito() {
  modalCarrito.style.display = 'none';
}

// Mostrar productos en el carrito
function mostrarCarrito() {
  listaCarrito.innerHTML = ''; // Limpiar la lista
  let total = 0;

  carrito.forEach((producto) => {
    const item = document.createElement('li');
    item.innerHTML = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
    listaCarrito.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  totalCarrito.innerText = total.toFixed(2);
  actualizarContadorCarrito();
}

// Función para actualizar el contador del ícono del carrito
function actualizarContadorCarrito() {
  const totalProductos = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  contadorCarrito.innerText = totalProductos;
}

// Función para agregar productos al carrito
function agregarProductoAlCarrito(nombre, precio, cantidad) {
  const productoExistente = carrito.find(item => item.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad });
  }

  mostrarCarrito();
}

// Función para enviar pedido por WhatsApp
function enviarPedidoPorWhatsApp() {
  if (carrito.length === 0) return;

  let mensaje = '¡Hola! Quiero hacer un pedido de los siguientes productos:\n\n';
  carrito.forEach(producto => {
    mensaje += `${producto.nombre} - $${producto.precio} x ${producto.cantidad}\n`;
  });

  const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  mensaje += `\nTotal: $${total.toFixed(2)}`;

  const telefono = '5215536659768'; // Cambia por tu número
  const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.open(urlWhatsApp, '_blank');
}

// Agregar eventos a los botones "Agregar al carrito"
document.querySelectorAll('.agregar-carrito').forEach(boton => {
  boton.addEventListener('click', (e) => {
    const nombre = e.target.getAttribute('data-nombre');
    const precio = parseFloat(e.target.getAttribute('data-precio'));
    const cantidad = parseInt(e.target.getAttribute('data-cantidad'));
    agregarProductoAlCarrito(nombre, precio, cantidad);
  });
});

// Evento para abrir el carrito al hacer clic en el ícono
carritoIcono.addEventListener('click', abrirCarrito);

// Evento para cerrar la modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === modalCarrito) {
    cerrarCarrito();
  }
});


