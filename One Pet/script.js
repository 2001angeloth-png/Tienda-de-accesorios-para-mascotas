// 🐾 Productos simulados
const productos = [
  { nombre: "Collar ajustable", precio: 25000, imagen: "https://cdn.pixabay.com/photo/2016/02/19/10/00/dog-collar-1209748_1280.jpg" },
  { nombre: "Cama para perro", precio: 80000, imagen: "https://cdn.pixabay.com/photo/2017/03/27/13/36/dog-2178870_1280.jpg" },
  { nombre: "Juguete masticable", precio: 18000, imagen: "https://cdn.pixabay.com/photo/2018/01/15/07/51/dog-3083474_1280.jpg" },
  { nombre: "Rascador para gatos", precio: 60000, imagen: "https://cdn.pixabay.com/photo/2017/01/14/11/46/cat-1971623_1280.jpg" }
];

// 🛍️ Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const grid = document.querySelector(".grid-productos");
const listaCarrito = document.getElementById("listaCarrito");
const total = document.getElementById("total");
const contador = document.getElementById("contador");
const panelCarrito = document.getElementById("carrito");
const form = document.getElementById("formularioCompra");

// 🎯 Mostrar productos
productos.forEach((p, i) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${p.imagen}" alt="${p.nombre}">
    <h3>${p.nombre}</h3>
    <p>Precio: $${p.precio.toLocaleString()}</p>
    <button class="agregar" data-index="${i}">Agregar al carrito</button>
  `;
  grid.appendChild(card);
});

// 🧠 Actualizar carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let totalCompra = 0;

  carrito.forEach((item, index) => {
    totalCompra += item.precio;
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - $${item.precio.toLocaleString()} 
      <button onclick="eliminarDelCarrito(${index})">❌</button>`;
    listaCarrito.appendChild(li);
  });

  total.textContent = `Total: $${totalCompra.toLocaleString()}`;
  contador.textContent = carrito.length;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ➕ Agregar producto
document.querySelectorAll(".agregar").forEach(btn => {
  btn.addEventListener("click", e => {
    const index = e.target.dataset.index;
    carrito.push(productos[index]);
    actualizarCarrito();
  });
});

// ❌ Eliminar producto
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// 🧹 Vaciar carrito
document.getElementById("vaciarCarrito").addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

// 🛒 Mostrar / ocultar carrito
document.getElementById("btnCarrito").addEventListener("click", () => {
  panelCarrito.classList.toggle("abierto");
});
document.getElementById("cerrarCarrito").addEventListener("click", () => {
  panelCarrito.classList.remove("abierto");
});

// 🧾 Mostrar formulario de compra
document.getElementById("finalizarCompra").addEventListener("click", () => {
  form.classList.toggle("oculto");
});

// 📩 Enviar pedido
form.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const direccion = document.getElementById("direccion").value;

  if (!nombre || !email || !direccion) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  alert(`Gracias por tu compra, ${nombre}! 🐾
Tu pedido será enviado a ${direccion}.
Recibirás confirmación en ${email}.`);

  carrito = [];
  actualizarCarrito();
  form.reset();
  form.classList.add("oculto");
  panelCarrito.classList.remove("abierto");
});

// 🔽 Desplazarse a productos
document.getElementById("verProductos").addEventListener("click", () => {
  document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
});

// ✅ Mostrar carrito al cargar (si hay datos guardados)
actualizarCarrito();

