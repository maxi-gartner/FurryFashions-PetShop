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
      <div class="card" style="width: 18rem;">
        <img src="${farmaciaCarta.imagen}" class="cartaFarmacia card-img-top p-2" alt="img">
        <div class="card-body">
          <p class="pfarmacia1">${farmaciaCarta.disponibles === 0 ? "sin unidades" : "disponible"}</p>
          <h5 class="card-title">${farmaciaCarta.producto}</h5>
          <h6 class="card-text">Precio: $${farmaciaCarta.precio}</h6>
          <p class="pfarmacia2">unidades: ${farmaciaCarta.disponibles}</p>
        </div>
      </div>`;
  }
  



})
.catch(error => console.log(error));



