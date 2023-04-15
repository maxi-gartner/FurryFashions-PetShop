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
  const seccionFarmacia = document.getElementById(`sectionFarmacia`)
  seccionFarmacia.innerHTML = crearFarmacia
  function crearMasFarmacia(farmaciaCarta) {
    return `
      <div class="card carta-farmacia"" style="width: 18rem;">
        <img src="${farmaciaCarta.imagen}" class="cartaFarmacia card-img-top p-2" alt="img">
        <div class="card-body">
          <p class="pfarmacia1">${farmaciaCarta.disponibles === 0 ? "sin unidades" : "disponible"}</p>
          <h5 class="card-title">${farmaciaCarta.producto}</h5>
          <h6 class="card-text">Precio: $${farmaciaCarta.precio}</h6>
          <p class="pfarmacia2">unidades: ${farmaciaCarta.disponibles}</p>
        </div>
      </div>`;
  }
  const cartasFarmacia = document.querySelectorAll('.carta-farmacia');

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



})
.catch(error => console.log(error));



