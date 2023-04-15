console.log("hola")

const url = 'https://mindhub-xj03.onrender.com/api/petshop';
fetch(url)
.then(response => response.json())
.then(data => {
     const farmaciaPetShop = data.filter(objeto => objeto.categoria === "farmacia");
  console.log(farmaciaPetShop);
   const farmaciaCarta = farmaciaPetShop[0]
   console.log(farmaciaCarta)
   let crearFarmacia = ``
   for (let i = 0; i < 7; i++) {
    crearFarmacia += crearMasFarmacia(farmaciaPetShop[i]);
  }
const carrito = []

console.log(carrito)
  const seccionFarmacia = document.getElementById(`sectionFarmacia`)
  seccionFarmacia.innerHTML = crearFarmacia
  function crearMasFarmacia(farmaciaCarta) {
    let unidadesTexto = "Unidades disponibles";
    
    return `
      <div class="card carta-farmacia"" style="width: 18rem;">
        <img src="${farmaciaCarta.imagen}" class="cartaFarmacia card-img-top p-2" alt="img">
        <div class="card-body">
          <p class="pfarmacia1">${unidadesTexto}</p>
          <h5 class="card-title">${farmaciaCarta.producto}</h5>
          <h6 class="card-text">Precio: $${farmaciaCarta.precio}</h6>
          <p class="pfarmacia2">unidades: ${farmaciaCarta.disponibles}</p>
          <button class="buttonAnadir" data-producto="${farmaciaCarta.producto}"> Añadir al carro</button>
          
        </div>
      </div>`;
  }
  const cartasFarmacia = document.querySelectorAll('.carta-farmacia');
  cartasFarmacia.forEach(carta => {
    const botonAnadir = carta.querySelector('.buttonAnadir');
    botonAnadir.addEventListener('click', (event) => {
      event.stopPropagation();
      const producto = event.target.getAttribute('data-producto');
      const item = farmaciaPetShop.find(objeto => objeto.producto === producto);
      if (item.disponibles > 0) {
        carrito.push(item);
        item.disponibles--;
        actualizarUnidades(item);
      }
    })
    })
cartasFarmacia.forEach(carta => {
  carta.addEventListener('click', () => {
    const modalFarmacia = document.getElementById("modalFarmacia");
    const modalTitulo = document.getElementById("modal-titulo");
    const modalImagen = document.getElementById("modal-imagen");
    const modalDescripcion = document.getElementById("modal-descripcion");
    const modalPrecio = document.getElementById("modal-precio");
    const modalUnidades = document.getElementById("modal-unidades");
    const farmaciaCarta = farmaciaPetShop.find(objeto => objeto.producto === carta.querySelector(".card-title").textContent);

    modalTitulo.textContent = farmaciaCarta.producto;
    modalImagen.src = farmaciaCarta.imagen;
    modalDescripcion.textContent = farmaciaCarta.descripcion;
    modalPrecio.textContent = `Precio: $${farmaciaCarta.precio}`;
    modalUnidades.textContent = `Unidades: ${farmaciaCarta.disponibles}`;

    modalFarmacia.style.display = "block";
  });
});
const cerrarModal = document.querySelector('.close');
const modalFarmacia = document.getElementById("modalFarmacia");

cerrarModal.addEventListener('click', () => {
  modalFarmacia.style.display = "none";
});

function actualizarUnidades(item) {
  const cartas = document.querySelectorAll('.carta-farmacia');
  cartas.forEach(carta => {
    const titulo = carta.querySelector('.card-title').textContent;
    if (titulo === item.producto) {
      const unidades = carta.querySelector('.pfarmacia2');
      unidades.textContent = `unidades: ${item.disponibles}`;
      const unidadesTexto = carta.querySelector('.pfarmacia1');
      if (item.disponibles === 0) {
        unidadesTexto.textContent = 'sin unidades';
        const boton = carta.querySelector('.buttonAnadir');
        boton.disabled = true;
      } else if (item.disponibles === 1) {
        unidadesTexto.textContent = 'última unidad disponible';
      } else if(farmaciaCarta.disponibles <= 3 && farmaciaCarta.disponibles > 1) {
        unidadesTexto.textContent = `últimas ${item.disponibles} unidades`;
      }
    }
  });
}

})
.catch(error => console.log(error));

