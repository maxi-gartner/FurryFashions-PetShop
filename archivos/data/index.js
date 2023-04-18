const carrusel = document.getElementById('carrusel')
const carrusel2 = document.getElementById('carrusel2')
let evento
fetch('https://mindhub-xj03.onrender.com/api/petshop')
  .then((response) => response.json())
  .then((datos) => {
    evento = datos;
    console.log(evento);
    eventosUP(evento)
    eventos(evento)
  })
  .catch((err) => console.log(err));

function eventosUP(evento) {
  let imagenes = evento.map(evento => evento.imagen)
  console.log(imagenes)
  carrusel.innerHTML = `<div class="carousel-item active">
                          <div class="row">
                            <div class="col-md-4">
                              <img class="d-block  carruelImg" src="${imagenes[0]}" alt="Primera imagen">
                            </div>
                            <div class="col-md-4">
                              <img class="d-block  carruelImg" src="${imagenes[1]}" alt="Segunda imagen">
                            </div>
                            <div class="col-md-4">
                              <img class="d-block  carruelImg" src="${imagenes[2]}" alt="Tercera imagen">
                            </div>
                          </div>
                        </div>
                        <div class="carousel-item">
                          <div class="row">
                            <div class="col-md-4">
                              <img class="d-block  carruelImg" src="${imagenes[3]}" alt="Cuarta imagen">
                            </div>
                            <div class="col-md-4">
                              <img class="d-block  carruelImg" src="${imagenes[4]}" alt="Quinta imagen">
                            </div>
                            <div class="col-md-4">
                              <img class="d-block  carruelImg" src="${imagenes[5]}" alt="Sexta imagen">
                            </div>
                          </div>
                        </div>
                        
                        <div class="carousel-item">
                          <div class="row">
                            <div class="col-md-4">
                              <img class="d-block  carruelImg" src="${imagenes[9]}" alt="Cuarta imagen">
                            </div>
                            <div class="col-md-4">
                              <img class="d-block  carruelImg" src="${imagenes[10]}" alt="Quinta imagen">
                            </div>
                            <div class="col-md-4">
                              <img class="d-block  carruelImg" src="${imagenes[11]}" alt="Sexta imagen">
                            </div>
                          </div>
                        </div>
                        <div class="carousel-item">
                          <div class="row">
                            <div class="col-md-4">
                              <img class="d-block  carruelImg" src="${imagenes[12]}" alt="Cuarta imagen">
                            </div>
                            <div class="col-md-4">
                              <img class="d-block  carruelImg" src="${imagenes[13]}" alt="Quinta imagen">
                            </div>
                            <div class="col-md-4">
                              <img class="d-block  carruelImg" src="${imagenes[14]}" alt="Sexta imagen">
                            </div>
                          </div>
                        </div>`
  console.log(carrusel)                       
}
                      
function eventos(evento) {
  let imagenes = evento.map(evento => evento.imagen)
  console.log(imagenes)
  let template = ''
  imagenes.forEach(img => {  
    console.log(img)
    template += `<div class="carousel-item active">
                  <div class="row">
                    <div class="col-md-4">
                      <img class="d-block  carruelImg" src="${img}" alt="Primera imagen">
                    </div>                           
                  </div>
                </div>`
  });
  console.log(template)
  carrusel2.innerHTML = template
  console.log(carrusel2)
}
                      