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
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



console.log(carrito)
  const seccionFarmacia = document.getElementById(`sectionFarmacia`)
  seccionFarmacia.innerHTML = crearFarmacia
  function crearMasFarmacia(farmaciaCarta) {
  let unidadesTexto = "Unidades disponibles";
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  // crear copia
  const farmaciaCartaCopy = { ...farmaciaCarta };
  
  for (let item of carrito) {
    if (item.producto === farmaciaCartaCopy.producto) {
      farmaciaCartaCopy.disponibles -= 1;
    }
  }
  let unidadesTextoClass = ""
  if (farmaciaCartaCopy.disponibles <= 0) {
    unidadesTexto = "Sin unidades";
    unidadesTextoClass = "bg-danger";
  } else if (farmaciaCartaCopy.disponibles === 1) {
    unidadesTexto = "Última unidad disponible";
    unidadesTextoClass = "bg-danger";
  } else if (farmaciaCartaCopy.disponibles <= 3) {
    unidadesTexto = `Últimas unidades`;
    unidadesTextoClass = "bg-danger";
  } else {
    unidadesTextoClass = "bg-success";
  }
  
    return `
      <div class="card carta-farmacia"" style="width: 18rem;">
        <img src="${farmaciaCarta.imagen}" class="cartaFarmacia card-img-top p-2" alt="img">
        <div class="card-body">
          <p class="pfarmacia1 ${unidadesTextoClass} ">${unidadesTexto}</p>
          <h5 class="card-title">${farmaciaCarta.producto}</h5>
          <h6 class="card-text">Precio: $${farmaciaCarta.precio}</h6>
          <p class="pfarmacia2">Unidades: ${farmaciaCartaCopy.disponibles}</p>
          <button class="buttonAnadir" data-producto="${farmaciaCarta.producto}"> Añadir al carro</button>
        </div>
      </div>
    `;
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
        item.__v++;

        actualizarUnidades(item);
        //paso el array a string
       /*  const json = JSON.stringify(carrito) */
       
       localStorage.setItem("carrito", JSON.stringify(carrito));
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'tu compra se añadio al carro',
        showConfirmButton: false,
        timer: 1500
      })
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
        unidadesTexto.classList.remove('bg-success');
        unidadesTexto.classList.add('bg-danger');
        const boton = carta.querySelector('.buttonAnadir');
        boton.disabled = true;
      } else if (item.disponibles === 1) {
        unidadesTexto.textContent = 'última unidad disponible';
        unidadesTexto.classList.remove('bg-success');
        unidadesTexto.classList.add('bg-danger');
      } else if (item.disponibles <= 3) {
        unidadesTexto.textContent = `últimas unidades`;
        unidadesTexto.classList.remove('bg-success');
        unidadesTexto.classList.add('bg-danger');
      } 
      else {
        
        unidadesTexto.classList.remove('bg-danger');
        unidadesTexto.classList.add('bg-success');
      }
    }
  });
}
const barraDeBusquedaValor = document.getElementById('search-input');

barraDeBusquedaValor.addEventListener('input', () => {
  const  busquedaValor = barraDeBusquedaValor.value.toLowerCase();
  const  cartasFarmaciaFiltradas = farmaciaPetShop.filter((farmaciaPetShop) =>{
   return farmaciaPetShop.producto.toLowerCase().includes(busquedaValor);
  });

  const seccionFarmacia = document.getElementById(`sectionFarmacia`);
  
  // Si no se encontraron resultados, se crea un elemento h5
  if (cartasFarmaciaFiltradas.length === 0) {
    seccionFarmacia.innerHTML = '<h5>No se encontraron resultados</h5>';
  } else {
    seccionFarmacia.innerHTML = '';
    for (let i = 0; i <  cartasFarmaciaFiltradas.length; i++) {
      seccionFarmacia.innerHTML += crearMasFarmacia( cartasFarmaciaFiltradas[i]);
    }
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
        //paso el array a string
       /*  const json = JSON.stringify(carrito) */
       
       localStorage.setItem("carrito", JSON.stringify(carrito));
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
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
    
})

})
.catch(error => console.log(error));

