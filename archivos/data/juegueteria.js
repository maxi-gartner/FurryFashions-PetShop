const resultsContainer = document.querySelector('#results');
const searchInput = document.querySelector('#search-input');
const modalContainer = document.querySelector('#modal-container');

fetch('https://mindhub-xj03.onrender.com/api/petshop')
  .then(response => response.json())
  .then(datos => {
    const petshopdatos = datos;
    let petshopfiltro = petshopdatos.filter(productos => productos.categoria === "jugueteria");

    const displayResults = (results) => {
        if (results.length === 0) {
          resultsContainer.innerHTML = '<h3>No se encontraron resultados</h3>';
          return;
        }
      
        const resultsHTML = results.map(producto => `
          <div class="card carta-jugueteria${producto.disponibles === 0 ? ' no-stock' : ''}" style="width: 18rem;">
            <img src="${producto.imagen}" class="cartajugueteria card-img-top p-2" alt="img">
            <div class="card-body">
              ${producto.disponibles === 0 ? '<p class="no-stock-text">No hay unidades disponibles</p>' : ''}
              ${producto.disponibles <= 5 && producto.disponibles !== 0 ? '<p class="last-units-text">Últimas unidades!</p>' : ''}
              <h5 class="card-title">${producto.producto}</h5>
              ${producto.disponibles !== 0 ? `<h6 class="card-text">Precio: $${producto.precio}</h6>
              <p class="pjugueteria2 stock-${producto.id}">Unidades: ${producto.disponibles}</p>
              <button class="buttonAnadir" data-producto="${producto.producto}" data-id="${producto.id}">Añadir al carro</button>` : ''}
            </div>
          </div>
        `);
      
        resultsContainer.innerHTML = resultsHTML.join('');
      };
      
    
    
      


    displayResults(petshopfiltro);
    
    

    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value ? searchInput.value.toLowerCase() : '';
        const filteredResults = petshopfiltro.filter(producto => producto.producto.toLowerCase().includes(searchTerm));
        displayResults(filteredResults);
      });
      
    
  })

  

  
  .catch(error => console.error(error));

