const main = document.getElementById('mainIndex')
let evento
fetch('https://mindhub-xj03.onrender.com/api/petshop')
  .then((response) => response.json())
  .then((datos) => {
    evento = datos;
    console.log(evento);
    main.appendChild(eventosUP(evento))
  })
  .catch((err) => console.log(err));

  function eventosUP(evento) {
    const section = document.createElement("section");
    section.className = "d-flex justify-content-center flex-wrap secbor py-4";
    section.innerHTML = "";
    for (let eventoRecorrido of evento) {
      section.innerHTML += `<div class="card m-2" style="width: 18rem;" data-category="${eventoRecorrido.category}">
                                  <img src="${eventoRecorrido.imagen}" class="card-img-top img" alt="...">
                                  <div class="card-body">
                                      <h5 class="card-title">${eventoRecorrido.producto}</h5>
                                      <p class="card-text">${eventoRecorrido.categoria}</p>
                                      <div class="priceBtn">
                                          <p>Price: ${eventoRecorrido.precio}</p>
                                          <a href="./detail.html?id=${eventoRecorrido._id}" class="btn btn-primary">More information</a>
                                      </div>
                                  </div>
                              </div>`;
    }
    return section;
  }