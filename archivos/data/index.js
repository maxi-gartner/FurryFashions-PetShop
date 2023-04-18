const carrusel2 = document.getElementById('carrusel2')
let datosPet
fetch('https://mindhub-xj03.onrender.com/api/petshop')
  .then((response) => response.json())
  .then((datos) => {
    datosPet = datos;
    eventos(datosPet)
  })
  .catch((err) => console.log(err));
                   
function eventos(pets) {
  let imagenes = pets.map(pet => pet.imagen)
  let template = ''
  imagenes.forEach(img => {  

    template += `<div class="slide">
                    <img src="${img}" alt="">
                  </div>`
  });
  carrusel2.innerHTML = template
}
                      