const url = 'https://mindhub-xj03.onrender.com/api/petshop';
fetch(url)
.then(response => response.json())
.then(data => {
     const jugueteriaPetShop = data.filter(objeto => objeto.categoria === "jugueteria");
  console.log(jugueteriaPetShop);
   const jugueteriaCarta = jugueteriaPetShop[0]
   console.log(jugueteriaCarta)
   let crearjugueteria = ``
   for (let i = 0; i < 8; i++) {
    crearjugueteria += crearMasjugueteria(jugueteriaPetShop[i]);
  }
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const seccionjugueteria = document.getElementById(`sectionjugueteria`)
  seccionjugueteria.innerHTML = crearjugueteria
  function crearMasjugueteria(jugueteriaCarta) {
  let unidadesTexto = "Unidades disponibles";
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  // crear copia
  const jugueteriaCartaCopy = { ...jugueteriaCarta };
  
  for (let item of carrito) {
    if (item.producto === jugueteriaCartaCopy.producto) {
      jugueteriaCartaCopy.disponibles -= 1;
    }
  }
  let unidadesTextoClass = ""
  if (jugueteriaCartaCopy.disponibles <= 0) {
    unidadesTexto = "Sin unidades";
    unidadesTextoClass = "bg-danger";
  } else if (jugueteriaCartaCopy.disponibles === 1) {
    unidadesTexto = "Última unidad disponible";
    unidadesTextoClass = "bg-danger";
  } else if (jugueteriaCartaCopy.disponibles <= 3) {
    unidadesTexto = `Últimas unidades`;
    unidadesTextoClass = "bg-danger";
  } else {
    unidadesTextoClass = "bg-success";
  }
  
    return `
      <div class="card carta-jugueteria" style=" width: 18rem;">
        <img src="${jugueteriaCarta.imagen}" class="cartajugueteria  card-img-top p-1" alt="img">
        <div class="card-body ">
          <p class="pjugueteria1 ${unidadesTextoClass} ">${unidadesTexto}</p>
          <h5 class="card-title">${jugueteriaCarta.producto}</h5>
          <h6 class="card-text">Precio: $${jugueteriaCarta.precio}</h6>
          <p class="pjugueteria2">Unidades: ${jugueteriaCartaCopy.disponibles}</p>
          <button class="buttonAnadir" data-producto="${jugueteriaCarta.producto}"> Añadir al carro</button>
        </div>
      </div>
    `;
  }
  const cartasjugueteria = document.querySelectorAll('.carta-jugueteria');
  cartasjugueteria.forEach(carta => {
    const botonAnadir = carta.querySelector('.buttonAnadir');
    botonAnadir.addEventListener('click', (event) => {
      event.stopPropagation();
      const producto = event.target.getAttribute('data-producto');
      const item = jugueteriaPetShop.find(objeto => objeto.producto === producto);
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
cartasjugueteria.forEach(carta => {
  carta.addEventListener('click', () => {
    const modaljugueteria = document.getElementById("modaljugueteria");
    const modalTitulo = document.getElementById("modal-titulo");
    const modalImagen = document.getElementById("modal-imagen");
    const modalDescripcion = document.getElementById("modal-descripcion");
    const modalPrecio = document.getElementById("modal-precio");
    const modalUnidades = document.getElementById("modal-unidades");
    const jugueteriaCarta = jugueteriaPetShop.find(objeto => objeto.producto === carta.querySelector(".card-title").textContent);

    modalTitulo.textContent = jugueteriaCarta.producto;
    modalImagen.src = jugueteriaCarta.imagen;
    modalDescripcion.textContent = jugueteriaCarta.descripcion;
    modalPrecio.textContent = `Precio: $${jugueteriaCarta.precio}`;
    modalUnidades.textContent = `Unidades: ${jugueteriaCarta.disponibles}`;

    modaljugueteria.style.display = "block";
  });
});
const cerrarModal = document.querySelector('.close');
const modaljugueteria = document.getElementById("modaljugueteria");

cerrarModal.addEventListener('click', () => {
  modaljugueteria.style.display = "none";
});

function actualizarUnidades(item) {
  const cartas = document.querySelectorAll('.carta-jugueteria');
  cartas.forEach(carta => {
    const titulo = carta.querySelector('.card-title').textContent;
    if (titulo === item.producto) {
      const unidades = carta.querySelector('.pjugueteria2');
      unidades.textContent = `unidades: ${item.disponibles}`;
      const unidadesTexto = carta.querySelector('.pjugueteria1');
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
  const  cartasjugueteriaFiltradas = jugueteriaPetShop.filter((jugueteriaPetShop) =>{
   return jugueteriaPetShop.producto.toLowerCase().includes(busquedaValor);
  });

  const seccionjugueteria = document.getElementById(`sectionjugueteria`);
  
  // Si no se encontraron resultados, se crea un elemento h5
  if (cartasjugueteriaFiltradas.length === 0) {
    seccionjugueteria.innerHTML = '<h5>No se encontraron resultados</h5>';
  } else {
    seccionjugueteria.innerHTML = '';
    for (let i = 0; i <  cartasjugueteriaFiltradas.length; i++) {
      seccionjugueteria.innerHTML += crearMasjugueteria( cartasjugueteriaFiltradas[i]);
    }
  }
  
  const cartasjugueteria = document.querySelectorAll('.carta-jugueteria');
  cartasjugueteria.forEach(carta => {
    const botonAnadir = carta.querySelector('.buttonAnadir');
    botonAnadir.addEventListener('click', (event) => {
      event.stopPropagation();
      const producto = event.target.getAttribute('data-producto');
      const item = jugueteriaPetShop.find(objeto => objeto.producto === producto);
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
    cartasjugueteria.forEach(carta => {
      carta.addEventListener('click', () => {
        const modaljugueteria = document.getElementById("modaljugueteria");
        const modalTitulo = document.getElementById("modal-titulo");
        const modalImagen = document.getElementById("modal-imagen");
        const modalDescripcion = document.getElementById("modal-descripcion");
        const modalPrecio = document.getElementById("modal-precio");
        const modalUnidades = document.getElementById("modal-unidades");
        const jugueteriaCarta = jugueteriaPetShop.find(objeto => objeto.producto === carta.querySelector(".card-title").textContent);
    
        modalTitulo.textContent = jugueteriaCarta.producto;
        modalImagen.src = jugueteriaCarta.imagen;
        modalDescripcion.textContent = jugueteriaCarta.descripcion;
        modalPrecio.textContent = `Precio: $${jugueteriaCarta.precio}`;
        modalUnidades.textContent = `Unidades: ${jugueteriaCarta.disponibles}`;
    
        modaljugueteria.style.display = "block";
      });
    });
    const cerrarModal = document.querySelector('.close');
    const modaljugueteria = document.getElementById("modaljugueteria");
    
    cerrarModal.addEventListener('click', () => {
      modaljugueteria.style.display = "none";
    });
    
})
// Función para filtrar los resultados
function filtrarResultados() {
  const busquedaValor = barraDeBusquedaValor.value.toLowerCase();
  const cartasjugueteria = document.querySelectorAll('.carta-jugueteria');
  
  cartasjugueteria.forEach(carta => {
    
    const unidades = parseInt(carta.querySelector('.pjugueteria2').textContent.split(' ')[1]);
    const nombreProducto = carta.querySelector('.card-title').textContent.toLowerCase();
    
    if (disponiblesCheckbox.checked && (unidades < 1 || !nombreProducto.includes(busquedaValor))) {
      carta.style.display = 'none';
    } else if (!disponiblesCheckbox.checked && !nombreProducto.includes(busquedaValor)) {
      carta.style.display = 'none';
    } else {
      carta.style.display = 'block';
    }
  });
}
barraDeBusquedaValor.addEventListener('input', () => {
  filtrarResultados();
});

// Event listener para el checkbox
disponiblesCheckbox.addEventListener('change', () => {
  filtrarResultados();
});
})
.catch(error => console.log(error))




.catch(error => console.log(error));